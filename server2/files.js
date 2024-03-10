//REACT FILE
exports.get_react_file = function (element_code) {

    const file = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>TYPE 2 FILE</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
            <div id="root"></div>
        
            <!-- React library with hooks support -->
            <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
            <!-- React DOM library -->
            <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
        
            <!-- Babel Standalone (for JSX support) -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
        
            <!-- Your React components/scripts -->
            <script type="text/babel">
                const MyComponent = () => {
        
                    return (
                        <div>
                        ${element_code}
                        </div>
                    );
                };
        
                // Render the component into the DOM
                ReactDOM.render(<MyComponent />, document.getElementById('root'));
            </script>
        </body>
    </html>
    `
    return file;
}

//JS FILE
exports.get_js_file = function (element_code) {
    const file = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
                <title>TYPE 1 FILE</title>
            </head>
            <body class="m-0 p-0">
                ${element_code}
            </body>
        </html>
    `;
    return file
}

//FILE NOT FOUND
exports.get_not_found = function( ){
    const file = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
            <title>ERROR</title>
        </head>
        <body class="m-0 p-0">
            <div class=" bg-red-200 w-full h-96 text-5xl my-auto "> ELEMENT NOT FOUND </div>
        </body>
    </html>`;
}

//500 SERVER ERROR
exports.get_500_error = function( error ){
    const file = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
            <title>ERROR 500</title>
        </head>
        <body class="m-0 p-0">
            <div class=" bg-red-200 w-full h-96 text-5xl my-auto text-wrap "> 
                500: INTERNAL SERVER ERROR 
                <br/>
                ERROR: ${error} 
            </div>
        </body>
    </html>`;
}