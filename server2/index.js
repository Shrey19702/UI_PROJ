const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const get_file = require('./files.js');
const Element = require('./schema.js');

const app = express();

app.use(bodyParser.json());
app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);
app.use(cors());

// MONGOOSE CONNECTION TO MONGODB
mongoose.connect('mongodb://root:password@localhost:27017')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// ROUTES:-   1. JS  |  2. React

app.get('/js/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const db_response = await Element.findOne({ _id: id }).select('code');
        const data = db_response.code;
        let file = '';

        if (data) {
            file = get_file.get_js_file(data);
        }
        else {
            file = get_file.get_not_found();
        }
        res.send(file);
    }
    catch (err) {
        console.log('error in fetching element using id :', err);
        let file = get_file.get_500_error(err);
        res.send(file);
    }
});

app.get('/react/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const db_response = await Element.findOne({ _id: id }).select('code');
        const data = db_response.code;
        let file = '';

        if (data) {
            file = get_file.get_react_file(data);
        }
        else {
            file = get_file.get_not_found();
        }
        res.send(file);
    }
    catch (err) {
        console.log('error in fetching element using id :', err);
        let file = get_file.get_500_error(err);
        res.send(file);
    }
});

app.get('/get-all-elements', async (req, res) => {
    try{
        const elements = await Element.find({});
        res.status(200).json({
            success: true,
            data: elements,
            // link: `http://localhost:5000/${element.type.toLowerCase()}/${element._id.toString()}`
        })
    }
    catch(err){
        console.log('error in fetching elements :', err)
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
app.get('/api/get-element/:id', async (req, res) => {
    const id = req.params.id;
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
            link: `http://localhost:5000/${element.type.toLowerCase()}/${element._id.toString()}`
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
app.post('/api/create-element', async (req, res) => {
    try {
        const data = req.body;

        const newElement = new Element({
            name: data.name, //name of the element
            type: data.type, //js html or react component
            tags: data.tags, //tags of the element for recomender
            code: data.code, //the code for element in text format 
        })
        const savedElement = await newElement.save();

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
app.post('/api/update-element/:id', async (req, res) => {
    try {
        const data = req.body;

        const id = req.params.id;
        let ele = await Element.findById(id);

        ele.name = data.name; //name of the element
        ele.type = data.type; //js html or react component
        ele.tags = data.tags; //tags of the element for recomender
        ele.code = data.code; //the code for element in text format 

        const savedElement = await ele.save();

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
app.delete('/api/delete/:id', async (req, res) => {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
