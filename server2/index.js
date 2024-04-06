// IMPORTED LIBRARIES
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

//IMPORTED FILES
const get_file = require('./files.js');
const Element = require('./schemas/elements.js');
const Views = require('./schemas/views.js');


const app = express();

app.use(bodyParser.json());
app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);
app.use(cors());

// MONGOOSE CONNECTION TO MONGODB
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_SERVER}:27017`)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// ROUTES:-   1. JS  |  2. React

app.get('/file/js/:id', async (req, res) => {
    const id = req.params.id;
    try {
        if (mongoose.connection.readyState !== 1) {
            throw "NOT CONNECTED TO DB"
        }
        const db_response = await Element.findOne({ _id: id }).select('code');
        const data = db_response.code;
        let file = '';

        if (data) {
            file = get_file.get_js_file(data);
        }
        else {
            file = get_file.get_not_found();
        }

        // increment views of this element
        const ele_view = await Views.findOne({element: id});
        ele_view.views += 1;
        await ele_view.save();

        res.send(file);
    }
    catch (err) {
        console.log('error in fetching element using id :', err);
        let file = get_file.get_500_error(err);
        res.send(file);
    }
});

app.get('/file/react/:id', async (req, res) => {
    const id = req.params.id;
    try {
        if (mongoose.connection.readyState !== 1) {
            throw "NOT CONNECTED TO DB"
        }
        const db_response = await Element.findOne({ _id: id }).select('code');
        const data = db_response.code;
        let file = '';
        
        if (data) {
            file = get_file.get_react_file(data);
        }
        else {
            file = get_file.get_not_found();
        }

        // increment views of this element
        const ele_view = await Views.findOne({element: id});
        ele_view.views += 1;
        await ele_view.save();

        res.send(file);
    }
    catch (err) {
        console.log('error in fetching element using id :', err);
        let file = get_file.get_500_error(err);
        res.send(file);
    }
});

// Check if connected to db for APIs
const db_check = function (res) {

    if (mongoose.connection.readyState !== 1) {
        console.log('Not connected to db ')
        res.status(500).json({
            success: false,
            message: "500: Database Not Connected "
        })
        return false;
    }
    else
        return true;
}

//save to embeddings db
const save_embeddings = async (element) => {

    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mongo_id: element._id,
                name: element.name,
                tags: [element.category, element.type, ...element.tags]
            })
        }
        const py_res = await fetch(`${process.env.PY_SERVER_URI}/api-p/create-embeddings`, options);
        const json_res = await py_res.json();
        console.log(json_res.message);

        if (json_res.success) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.error('Error in saving to embeddings DB: ', err);
    }
}

//return all elements
app.get('/api-n/get-all-elements', async (req, res) => {

    let db_conn = db_check(res)
    if (!db_conn)
        return;

    try {
        const elements = await Element.find({});
        res.status(200).json({
            success: true,
            data: elements,
            // link: `http://localhost:5000/${element.type.toLowerCase()}/${element._id.toString()}`
        })
    }
    catch (err) {
        console.log('error in fetching elements :', err)
        res.status(500).json({
            success: false,
            message: "500: internal server error :- " + err
        })
    }
})

//Elements categorised by thier categories
app.get('/api-n/get-elements-by-category', async (req, res) => {
    let db_conn = db_check(res)
    if (!db_conn)
        return;

    try {
        const elementsByCategory = await Element.aggregate([
            // Group documents by category
            { $group: { _id: '$category', elements: { $push: '$$ROOT' } } }
        ]);

        res.status(200).json({
            success: true,
            data: elementsByCategory,
        })
    }
    catch (err) {
        console.log('error in fetching elements :', err)
        res.status(500).json({
            success: false,
            message: "500: internal server error :- " + err
        })
    }
})

//Name of all Categories
app.get('/api-n/get-all-categories', async (req, res) => {
    let db_conn = db_check(res)
    if (!db_conn)
        return;

    try {
        const categories = await Element.distinct('category');
        res.status(200).json({
            success: true,
            data: categories,
        })
    }
    catch (err) {
        console.log('error in fetching categories :', err)
        res.status(500).json({
            success: false,
            message: "500: internal server error :- " + err
        })
    }
})

// APIs:-  
//0. get document <react / html >
//1. get element <code  not document>
//2. create element
//3. update element
//4. delete element
// fetch as text data from mongoDB using idsx`

//GET ELEMENT BY ID
app.get('/api-n/get-element/:id', async (req, res) => {
    const id = req.params.id;

    let db_conn = db_check(res)
    if (!db_conn)
        return;

    try {
        const element = await Element.findById(id);
        if (!element) {
            res.status(404).json({
                success: false,
                message: ' 404: component not found'
            });
        }

        res.status(200).json({
            success: true,
            data: element,
            link: `/file/${element.type.toLowerCase()}/${element._id.toString()}`
        })
    }
    catch (err) {
        console.log('error in fetching element using id :', err)
        res.status(500).json({
            success: false,
            message: "500: internal server error :- " + err
        })
    }
    // res.status(200).json({
    //     message: 'success',
    //     res: "Hello from /api/get-data"
    // })
});

//SAVE A NEW ELEMENT
app.post('/api-n/create-element', async (req, res) => {

    let db_conn = db_check(res)
    if (!db_conn)
        return;

    try {
        const data = req.body;

        const newElement = new Element({
            name: data.name, //name of the element
            type: data.type, //js html or react component
            tags: data.tags, //tags of the element for recomender
            code: data.code, //the code for element in text format 
            category: data.category
        })
        const savedElement = await newElement.save();

        const newView = new Views({
            element: savedElement._id
        })
        const savedView = await newView.save();

        //create embeddings
        const emb_saved = save_embeddings(savedElement)
        if (!emb_saved)
            throw "Error in saving to Embeddings DB"

        res.status(201).json({
            success: true,
            message: 'element posted',
            id: savedElement._id
        })
    }
    catch (err) {
        console.log('error in posting :', err)
        res.status(500).json({
            success: false,
            message: '500: internal server error :- ' + err
        })
    }
});

//UPDATE A ELEMENT
app.post('/api-n/update-element/:id', async (req, res) => {

    let db_conn = db_check(res)
    if (!db_conn)
        return;

    try {
        const data = req.body;

        const id = req.params.id;
        let ele = await Element.findById(id);

        ele.name = data.name; //name of the element
        ele.type = data.type; //js html or react component
        ele.tags = data.tags; //tags of the element for recomender
        ele.code = data.code; //the code for element in text format 
        ele.category = data.category;

        const savedElement = await ele.save();

        //update embeddings
        const emb_saved = save_embeddings(savedElement)
        if (!emb_saved)
            throw "Error in saving to Embeddings DB"

        res.status(201).json({
            success: true,
            message: 'element updated',
            id: savedElement._id
        })
    }
    catch (err) {
        console.log('error in updating :', err)
        res.status(500).json({
            success: false,
            message: '500: internal server error :- ' + err
        })
    }
});

//DELETE A ELEMENT
app.delete('/api-n/delete/:id', async (req, res) => {

    let db_conn = db_check(res)
    if (!db_conn)
        return;

    try {
        const id = req.params.id;
        const res = await Element.findByIdAndDelete(id);
        res.status(201).json({
            success: true,
            message: 'element deleted',
            id: res._id
        })
    }
    catch (err) {
        console.log('error in deleteing :', err)
        res.status(500).json({
            success: false,
            message: '500: internal server error :- ' + err
        })
    }
})

//GET TRENDING
app.get('/api-n/trending/:k', async (req, res) => {
    let db_conn = db_check(res)
    if (!db_conn)
        return;

    try {
        //number of elements to show
        const k = req.params.k;

        const TrendingElements = await Views.find()
            .populate('element')
            .sort({ views: -1 }) // Sort by views in descending order
            .limit(k); // Limit to top k elements

        res.status(200).json({
            success: true,
            data: TrendingElements
        });
    } 
    catch (err) {
        console.err('error in getting trending elements :', err)
        res.status(500).json({
            success: false,
            message: '500: internal server error :- ' + err
        })
    }
})


// SEARCH API
// app.get('search/:prompt', async (req,res)=>{
//     let db_conn = db_check(res);
//     if(!db_conn)
//         return;

//     try{
//         // 1. prompt server 3
//         // 2. get data for the returned ids
//         // 3. send
//         const py_res = await fetch(`http://localhost:5051/search/${prompt}`)
//         const json_res = await py_res.json();

//         console.log(json_res);
//     }
//     catch(err){
//         console.log('error in searching :', err)
//         res.status(500).json({
//             success: false,
//             message: '500: internal server error :- ' + err
//         })
//     }
// })


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});    
