# UI Elements as HTML/REACT codes using TAILWIND CSS 
<a href="http://18.213.4.193">**LINK 🔗**</a>

UI_Proj is a Free UI Elements provider for you to start your next big project. Enabling users to simply and seamlessly Explore, Contribuiting and Copy the UI Components you want. With features like sentence similarity search and code's visual viewer amplify your project's potential and unlock boundless possibilities! 

## ✈️ Usage
- Select the category of element you want ex: `NAVBAR`, `FOOTER`, etc.
- Select an Existing UI Element for your project.
- Copy the Code for the Element

**OR**

- GO to the Search Bar and type a prompt for what you need.
- The AI based recommender system will return the best similar elements it finds   

## 🧑‍💻 Technologies Used
1. `REACT` is a frontend library to build user interfaces as individual components in javascript. The Frontend of this site is made using React and its supporting libraries like `React-router-dom`
2. `EXPRESS` is a fast and flexible web framework for building APIs with routing, view systems, and many more features. The Backend of this site uses Express as its main API and View provider being fast, lightweight and ease of  development. 
3.  `MONGO-DB` is a document oriented database (NoSQL DB) using JSON  like documents with schemas. The Main Database of this project is MONGO-DB being fast, efficient and suitable for both small and big projects.
4. `FLASK` is a micro-web framework for creating API and Views like Express. Flask Provides a fast and easy development setup to work on projects. This project uses Flask as a secondary backend service for Recommendation and Saving UI elements as embeddings for efficient search.
5. `POSTGRESQL` is the most advanced and robust opensource relational database mangement system with ACID properties and efficiency like any other SQL DB. This Project uses PostgeSQL for storing Embeddings of the UI ELEMENTS as bytes.
6. [`FAISS (Facebook AI Similarity Search) 🔗`](https://ai.meta.com/tools/faiss) is a library to quickly search for embeddings that are similar to each other. This project uses FAISS for recommending UI elements similar to the given prompt.
7. [`General Text Embeddings Models 🔗`](https://huggingface.co/thenlper/gte-small) are sentence similarity models trained on large-scale corpus of relevance text pairs for use cases like information retrieval, semantic textual similarity, text reranking, etc. This project uses GTE-small model to create embeddings of 384 dimensions for a fairly accurate similarity search using the FAISS library.

> [!NOTE]
> Docker is used for creating production ready builds with Docker-Compose for ease in Integration of containers.

## 😃 FUTURE WORK
- Create a Good Editor with a view of the UI element for creating new elements.
- Create an User based system with login and profile for editing existing elements and giving personalized recommendations.
- improve scalability and efficiency of the project (recommendation system specifically) (Add Redis for caching)

## 😓 Major Issues Faced
- Finding efficient and compatible Embeddings model and embeddings size for accurate and fast responses. Mapping the FAISS indices with POSTGRESQL indices for all CRUD operations. 
- Creating Docker Images for all Servers and making them work in sync (for communicating between containers they should be in same network and use thier container names instad of localhost urls).
- Finding older versions of libraries which are compatible with each other for creating small images. ( Pytorch latest versions are bigger then 2GBs )

## 📪 Contact
If you have any suggestions, or wish to contact us for any reason, feel free to email us at shrey19702@gmail.com
