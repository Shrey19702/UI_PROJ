import time 
#check time
start_time = time.time()

#TO DO
# update build_faiss_idx : now it map exist in redis
# update create embeddings : for found not found removing from faiss index and other stuff 

# REQ LIBRARIES
#server related
from flask import Flask, request, jsonify
from flask_cors import CORS
#db related
from flask_sqlalchemy import SQLAlchemy
import redis
#logic related
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# IMPORT MODEL  
from models import db, Embedding

# MAKE SERVER
print("-------> Server Started ")
app = Flask(__name__)
# GET ENV VARS  
app.config.from_pyfile('config.py')
# ALLOW CORS FOR ALL
CORS(app)

# CONNECT | CREATE the DB
db.init_app(app) 
app.app_context().push()
db.create_all()
print("Connected to database [postgres] ")

redis_client = redis.StrictRedis(host=app.config['REDIS_CONN'], port=6379, db=0)
print("connected to database [redis] ")

###->> CODE FOR USING TRANSFORMES INSTEAD OF SENTENCE-TRANSFORMERS
# def average_pool(last_hidden_states: Tensor, attention_mask: Tensor) -> Tensor:
#     last_hidden = last_hidden_states.masked_fill(~attention_mask[..., None].bool(), 0.0)
#     return last_hidden.sum(dim=1) / attention_mask.sum(dim=1)[..., None]

# tokenizer = AutoTokenizer.from_pretrained("thenlper/gte-small")
# model = AutoModel.from_pretrained("thenlper/gte-small")
# embeddings = model.encode()

# CREATE MODEL
model = SentenceTransformer('thenlper/gte-small')

# FAISS KNN MODEL  ref --> https://unfoldai.com/effortless-large-scale-image-retrieval-with-faiss-a-hands-on-tutorial/
d = 384 # diemnsions of each vector
# m = 8 # number of subquantizers
# nlist = 1 #number of clusters
# quantizer = faiss.IndexFlatL2(d)
# index = faiss.IndexIVFPQ(quantizer, d, nlist, m, 8) # 8 bits per quantisizers
index = faiss.IndexFlatL2(d)

# CURRENT IDX AND MAPPING OF FAISS IDX TO POSTGRES IDS 
redis_client.set('last_idx', 0)

# last_idx = int(0)
# idx_pk_map = dict()


def build_faiss_index():
    # global last_idx
    global index
    # GET ALL EMBEDDINGS AND CREATE THE FAISS GRAPH, INDEX MAP WHEN THE SERVER STARTS
    print('#----> Retriving Embeddings')
    embeddings = (Embedding.query.with_entities(Embedding.embedding, Embedding.id).all())
    
    if(len(embeddings)==0):
        print("--->No embeddings exist in DB")
    else:
        print("--->Building Similarity Search")
        for embedding in embeddings:
            embedding_array = np.array(np.frombuffer(embedding[0], dtype=np.float32)).reshape(-1, d)
            # embedding_array = embedding_array.reshape(-1, 384)
            # MAP THE SQL-ID (embedding[1]) TO FAISS ID (current last_idx) 
            last_idx = redis_client.get('last_idx')

            if(redis_client.exists(last_idx) == False):
                redis_client.set(last_idx, embedding[1] )

            redis_client.incr('last_idx')
            # idx_pk_map[last_idx] = embedding[1] #idx -> pk
            # last_idx += 1
            # index.train(embedding_array)
            index.add(embedding_array)

# CREATE THE SEARCH SYSTEM
build_faiss_index()

#check start time
end_time = time.time()
print("### Time Taken :", np.round(end_time - start_time, 4))

# ----> ROUTES
# SEARCH / RECOMMEND
@app.route('/api-p/recommend', methods=['POST', 'OPTIONS'])
def recommend():
    # global idx_pk_map
    global index

    # FOR CORS 
    if (request.method == 'OPTIONS'):
        return '', 200
    
    # SEARCH PROMPT
    query_prompt = request.json['prompt']
    k=6
    if(request.json['k']):
        k = request.json['k']

    query_embedding = model.encode([query_prompt])

    # Search for nearest neighbors (distance indices)
    _, indices = index.search(np.array(query_embedding), k)

    # Retrieve embeddings for recommended items using the mapping
    recommended_embeddings = []
    length = int(redis_client.get('last_idx'))
    # if less elements than K show all 
    if(length < k):
        all_keys = redis_client.keys('*')
        for key in all_keys:
            if(key!='last_idx'):
                recommended_embeddings.append(Embedding.query.filter(Embedding.id == int(redis_client.get(key))).with_entities(Embedding.mongo_id, Embedding.name).first())
    else:
        for idx in indices[0]:
            recommended_embeddings.append(Embedding.query.filter(Embedding.id == int(redis_client.get(idx))).with_entities(Embedding.mongo_id, Embedding.name).first())
        
    # send as json
    recommendations = [] 
    for emb in recommended_embeddings :
        recommendations.append({'mongo_id': emb[0], 'name': emb[1]})
    
    return jsonify({'success': True ,'data': recommendations}), 201

# CREATE NEW EMBEDDINGS
@app.route('/api-p/create-embeddings', methods=['POST'])
def create_embedding():
    # global last_idx

    # CONFIRM BODY DATA AND CREATE THE EMBEDDINGS 
    data = request.json
    # CONFIRM DATA
    if 'mongo_id' not in data or 'tags' not in data or 'name' not in data:
        return jsonify({'status':' error', 'message': ' Error: 400 Missing text or embedding in request body'}), 400
    
    name = data['name']
    mongo_id = data['mongo_id']
    tags = data['tags']

    # CREATE THE PROMPT SENTENCE TO EMBED
    prompt = ''
    for tag in tags:
        prompt += tag+" "

    # GET EMBEGGINS FROM MODEL
    embedding = model.encode([prompt])
    # NORMALIZE FOR EFFICIENCY
    emb_normalized = embedding / np.linalg.norm(embedding, axis=1)[:, np.newaxis]

    #### CODE FOR USING TRANSFORMERS INSTEAD OF SENTENCE-TRANSFORMERS 
    # Tokenize the input texts
    # batch_dict = tokenizer(prompt, max_length=512, padding=True, truncation=True, return_tensors='pt')
    # outputs = model(**batch_dict)
    # embedding = average_pool(outputs.last_hidden_state, batch_dict['attention_mask'])
    # embedding = F.normalize(embedding, p=2, dim=1)

    # ---> !!!! check if one with this mongo_id already exist
    found = Embedding.query.filter(Embedding.mongo_id == mongo_id).first()
    emb_id= None
    if(found):
        # -------- UPDATE EMBEDDING ---------

        # update db using new embedding and remove old index from faiss 
        # print("same exist --> update")
        # remove old index from redis and faiss index and add the new to them (the tags might have changed considering this to be an update)
        found_embedding_array = np.array(np.frombuffer(found.embedding, dtype=np.float32)).reshape(-1, d)
            
        index.add(found_embedding_array)
        _, faiss_idx = index.search(found_embedding_array ,2)
        # print("-------->",faiss_idx[0] )
        index.remove_ids( faiss_idx[0] )
        redis_client.delete( int(faiss_idx[0][0]) )

        # print('deleted old from faiss index and redis map')

        found.name = name
        found.embedding = emb_normalized.tobytes()
        db.session.commit()
        # print("updated in postgres sucessful")

        emb_id = found.id
        # index_id = redis_client.get(emb_id)

    else:
        # --------- NEW EMBEDDING -----------

        # SAVE EMBEDDINGS AS LONG BYTES
        new_embedding = Embedding(name=name, mongo_id=mongo_id, embedding=emb_normalized.tobytes())
        db.session.add(new_embedding)
        db.session.commit()
        emb_id = new_embedding.id

    # index.train(emb_normalized)
    index.add(emb_normalized)

    last_idx = redis_client.get('last_idx')
    redis_client.set(last_idx, emb_id)
    redis_client.incr('last_idx', 1)
    # idx_pk_map[last_idx] = new_embedding.id #idx -> pk
    # last_idx += 1

    return jsonify({'success': True, 'message': 'Embedding created successfully'}), 201


@app.route('/')
def root():
    # CONFIRMATOR FOR THE server WORKS
    print("root was accessed")
    return f" connected to DB on URI {app.config['SQLALCHEMY_DATABASE_URI']} "

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
