# UI Elements as HTML/REACT codes using TAILWIND CSS

<a href="http://http://18.213.4.193">LINK</a>

UI_Proj is a Free UI Elements provider for you to start your next big project, enabling users to simply copy the UI Components code, contribuiting to the site by adding thier own UI components and searching for the needed elements using the search functionality. 

## ✈️ Usage
- Select the category of element you want ex: `NAVBAR`, `FOOTER`, etc.
- Select an Existing UI Element for your project.
- Copy the Code for the Element

**OR**

- GO to the Search Bar and type a prompt for what you need.
- The AI based recommender system will return the best similar elements it finds   

## 🧑‍💻 Technologies Used
    - `REACT` is a frontend library to build user interfaces as individual components in javascript. The Frontend of this site is made using React and its supporting libraries like `React-router-dom`
    - `EXPRESS` is a fast and flexible web framework for building APIs with routing, view systems, and many more features. The Backend of this site uses Express as its main API and View provider being fast, lightweight and ease of  development. 
    -  `MONGO-DB` is a document oriented database (NoSQL DB) using JSON  like documents with schemas. The Main Database of this project is MONGO-DB being fast, efficient and suitable for both small and big projects.
    - `FLASK` is a micro-web framework for creating API and Views like Express. Flask Provides a fast and easy development setup to work on projects. This project uses Flask as a secondary backend service for Recommendation and Saving UI elements as embeddings for efficient search.
    - `POSTGRESQL` is the most advanced and robust opensource relational database mangement system with ACID properties and efficiency like any other SQL DB. This Project uses PostgeSQL for storing Embeddings of the UI ELEMENTS as bytes.
    - `FAISS (Facebook AI Similarity Search)` [Link](https://ai.meta.com/tools/faiss) is a library to quickly search for embeddings that are similar to each other. This project uses FAISS for recommending UI elements similar to the given prompt.
    - `General Text Embeddings Models` [Link](https://huggingface.co/thenlper/gte-small) are sentence similarity models trained on large-scale corpus of relevance text pairs for use cases like information retrieval, semantic textual similarity, text reranking, etc. This project uses GTE-small model to create embeddings of 384 dimensions for a fairly accurate similarity search using the FAISS library.     

## 😃 FUTURE WORK
    - Create an Good Editor with a view of the UI element for creating new elements.
    - Create a User based system with login and profile for editing existing elements and giving personalized recommendations.
    - improve scalability and efficiency of the project (recommendation system specifically) (Add Redis for caching)

## 😓 Major Issues Faced
    - Finding efficient and compatible Embedding model and embedding size for accurate and fast responses. Mapping the FAISS embeddings with POSTGRESQL indices for all CRUD operations. 
    - Creating Docker Images for all Servers and making them work in sync (for communicating between containers they should be in same network and use thier container names instad of localhost urls).
    - Finding older versions of libraries which are compatible with each other for creating small images. ( Pytorch latest versions are bigger then 2GBs )

## 📪 Contact
If you have any suggestions, or wish to contact us for any reason, feel free to email us at shrey19702@gmail.com