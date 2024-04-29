import os

# Define the base directory of the Flask application
basedir = os.path.abspath(os.path.dirname(__file__))

# Define the SQLAlchemy database URI
POSTGRES_USER = os.environ.get('POSTGRES_USER', 'postgres')
POSTGRES_PASS = os.environ.get('POSTGRES_PASSWORD', 'password')
POSTGRES_CONN = os.environ.get('POSTGRES_CONN', 'localhost')

REDIS_CONN = os.environ.get('REDIS_CONN', 'localhost')

SQLALCHEMY_DATABASE_URI = f'postgresql://{POSTGRES_USER}:{POSTGRES_PASS}@{POSTGRES_CONN}:5432/vector-embeddings'

# Optional: Disable SQLAlchemy modification tracking
SQLALCHEMY_TRACK_MODIFICATIONS = False

VIEW_URL = 'http://localhost:3000'