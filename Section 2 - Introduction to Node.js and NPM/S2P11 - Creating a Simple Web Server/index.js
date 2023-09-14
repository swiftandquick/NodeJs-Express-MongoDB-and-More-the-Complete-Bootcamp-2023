// Require the built-in fs module, which reads and writes files.  
const fs = require('fs');

// Require the built-in http module, which gives us networking capabilities.  
const http = require('http');

// Require the url package, which is used for routing.  
const url = require('url');

// Require slugify module.  
const slugify = require('slugify');

// Require the function from replaceTemplate.js.  
const replaceTemplate = require('./modules/replaceTemplate');

// Read the html files in the templates folder.  
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

// Read the data.json file in the dev-data folder, turn the string from data.json to an object.  
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// Create a slug for each product based on product name, for example, "Fresh Avocado" will become "fresh-avocado".  
const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));
console.log(slugs);

// Create a server.  
const server = http.createServer((req, res) => {
    // Take the query and pathName from the URL.  
    // If URL is http://127.0.0.1:8000/product?id=0, then the returned object’s query property is { id: ‘0’ }, and pathname property is ‘/product’.  
    const { query, pathname } = url.parse(req.url, true);
    // If pathName is '/' or '/overview':  
    // Use a map method to map over dataObj, invoke replaceTemplate for each element, return an array of 5 strings containing html contents.  
    // Use join() to join the 5 strings into one string.  Replace {%PRODUCT_CARDS%} with cardsHtml.  Finally, render the output.  
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }
    // If pathName is '/product':
    // Find the product by the query's id value, so if URL is http://127.0.0.1:8000/product?id=0, query.id is 0.  
    // Invoke replaceTemplate for product, returning a string containing html contents, render the output.  
    else if(pathname === '/product') {
        const product = dataObj[query.id];
        res.writeHead(200, {'Content-type': 'text/html'});
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }
    // If pathName is '/api', render the text 'API'.  
    // If pathName is '/api', render the data object.  
    else if (pathname === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    }
    // If pathName is not all of the above, give a 404 error, render the text "Page not found!"
    else {
        res.writeHead(404, {
            'Content-type': 'text/html', 
            'my-own-header': 'hello-world'
        });
        res.end("<h1>Page not found!</h1>");  
    }
});

// Listen to requests on the port, '127.0.0.1' is the localhost.  
server.listen(8000, '127.0.0.1', () => {
    console.log("Listening to requests on port 8000.");
});