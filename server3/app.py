from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from flask_sqlalchemy import SQLAlchemy
from models import db, Embedding
import  numpy as np
import faiss

app = Flask(__name__)
app.config.from_pyfile('config.py')

db.init_app(app) 
app.app_context().push()
print("Connected to database [postgres] ")
# with app.app_context():
#     db.create_all()

model = SentenceTransformer('thenlper/gte-large')
# embeddings = model.encode()

last_idx = int(0)
idx_pk_map = dict()

#load all embeddings
def load_embeddings():
    print("--->Retriving Embeddings")
    return (Embedding.query.with_entities(Embedding.embedding, Embedding.id).all())

def build_faiss_index():
    global last_idx
    embeddings = load_embeddings()
    # print(embeddings)
    index = faiss.IndexFlatL2(1024)  # Assuming Euclidean distance
    
    if(len(embeddings)==0):
        print("--->No embeddings exist in DB")
    else:
        print("--->Building Similarity Search")
        for embedding in embeddings:
            embedding_array = np.array(np.frombuffer(embedding[0], dtype=np.float32))
            embedding_array = embedding_array.reshape(-1, 1024)
            idx_pk_map[last_idx] = embedding[1] #idx -> pk
            last_idx += 1
            index.add(embedding_array)
    return index

# create the serach system 
index = build_faiss_index()

# ----> ROUTES

@app.route('/recommend', methods=['POST'])
def recommend():
    query_prompt = request.json['prompt']

    k=10
    if(request.json['k']):
        k = request.json['k']
    query_embedding = model.encode([query_prompt])

    # Search for nearest neighbors
    distances, indices = index.search(np.array(query_embedding), k)

    # Retrieve embeddings for recommended items using the mapping
    recommended_embeddings = [Embedding.query.filter(Embedding.id == idx_pk_map[idx]).with_entities(Embedding.name).first() for idx in indices[0]]

    recommendations = [] 
    for emb, dist in zip(recommended_embeddings, distances[0]):
        # print(emb)
        recommendations.append({'name': emb[0], 'distance': str(dist)})
    
    # print(recommendations)
    return jsonify(recommendations)


@app.route('/create-embeddings', methods=['POST'])
def create_embedding():
    data = request.json

    if 'mongo_id' not in data or 'tags' not in data or 'name' not in data:
        return jsonify({'status':' error', 'message': ' Error: 400 Missing text or embedding in request body'}), 400

    tags = data['tags']
    prompt = ''
    for tag in tags:
        prompt += tag+" "
    
    embedding = model.encode([prompt])
    name = data['name']
    mongo_id = data['mongo_id']

    new_embedding = Embedding(name=name, mongo_id=mongo_id, embedding=embedding.tobytes())
    db.session.add(new_embedding)
    db.session.commit()

    index.add(embedding)

    return jsonify({'status': 'Success', 'message': 'Embedding created successfully'}), 201


@app.route('/')
def root():
    return f" connected to DB on URI {app.config['SQLALCHEMY_DATABASE_URI']} "

if __name__ == '__main__':
    app.run()
