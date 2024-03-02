const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const get_react_file = require('./react-file.js')
const Element = require('./schema.js')

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
    // console.log('######->>>>>>>>>',id)
    try {
        const db_response = await Element.findOne({ _id: id }).select('code');
        const data = db_response.code;
        let file = '';

        if (data) {
            file = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
            
                <title>TYPE 1 FILE</title>
            </head>
            <body class="m-0 p-0">
                ${data}
            </body>
            </html>`;
        }
        else {
            file = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
            
                <title>TYPE 1 FILE</title>
            </head>
            <body class="m-0 p-0">
                <div class=" bg-red-200 w-full h-96 text-5xl my-auto "> ELEMENT NOT FOUND </div>
            </body>
            </html>`;
        }
        res.send(file);
    }
    catch (err) {
        console.log('error in fetching element using id :', err);
        let file = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
        
            <title>TYPE 1 FILE</title>
        </head>
        <body class="m-0 p-0">
            <div class=" bg-red-200 w-full h-96 text-5xl my-auto text-wrap "> 
                500: INTERNAL SERVER ERROR 
                <br/>
                ERROR: ${err} 
            </div>
        </body>
        </html>`;
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
            file = get_react_file(data);
        }
        else {
            file = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
            
                <title>TYPE 1 FILE</title>
            </head>
            <body class="m-0 p-0">
                <div class=" bg-red-200 w-full h-96 text-5xl my-auto "> ELEMENT NOT FOUND </div>
            </body>
            </html>`;
        }
        res.send(file);
    }
    catch (err) {
        console.log('error in fetching element using id :', err);
        let file = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
        
            <title>TYPE 1 FILE</title>
        </head>
        <body class="m-0 p-0">
            <div class=" bg-red-200 w-full h-96 text-5xl my-auto text-wrap "> 
                500: INTERNAL SERVER ERROR 
                <br/>
                ERROR: ${err} 
            </div>
        </body>
        </html>`;
        res.send(file);
    }
});


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
