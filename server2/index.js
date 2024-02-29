const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const Element = require('./schema.js')

const app = express();

app.use(bodyParser.json());
app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);

// MONGOOSE CONNECTION TO MONGODB
mongoose.connect('mongodb://localhost:27017')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });



// ROUTES:-   1. JS  |  2. React

app.get('/js', (req, res) => {
    const content =
        `
        <div class=" bg-red-200 sm:bg-green-200 md:bg-blue-200 lg:bg-yellow-200 h-screen text-center text-5xl p-6">
            HELLO WORLD
        </div>
    `
    const file = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
    
        <title>TYPE 1 FILE</title>
    </head>
    <body class="m-0 p-0">
    ${content}
    </body>
    </html>`
    res.send(file);
});

app.get('/react', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'react-file.html')
    );
});



// APIs:-  1. /api/js:id   |   2. /api/react:id
// fetch as text data from mongoDB using idsx`

//GET ELEMENT BY ID
app.get('/api/get-element/id/:id', async (req, res) => {
    const id = req.params;
    try{
        const element = await Element.findById(id);
        if(!element){
            res.status(404).json({
                success: false,
                message: ' 404: component not found'
            });
        }

        res.status(200).json({
            success: true,
            data: element
        })
    }
    catch(err){
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

//SAVE A NEW COMPONENT
app.post('/api/post-element', async (req, res) => {
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
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
