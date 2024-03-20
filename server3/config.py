import os

# Define the base directory of the Flask application
basedir = os.path.abspath(os.path.dirname(__file__))

# Define the SQLAlchemy database URI
SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:password@localhost:5432/vector-embeddings'

# Optional: Disable SQLAlchemy modification tracking
SQLALCHEMY_TRACK_MODIFICATIONS = False

VIEW_URL = 'http://localhost:3000'