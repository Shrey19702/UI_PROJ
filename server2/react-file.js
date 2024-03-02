
module.exports = function get_react_file ( element_code ){
    
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