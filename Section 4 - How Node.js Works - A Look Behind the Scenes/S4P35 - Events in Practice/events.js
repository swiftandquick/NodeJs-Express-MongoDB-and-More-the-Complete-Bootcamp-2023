// Require an event emitter.  
const EventEmitter = require('events');

// Import http module.  
const http = require('http');

// Sales is a subclass of EventEmitter.  
class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

// Create an event emitter object using the Sales as a template.  
const myEmitter = new Sales();

// First listener for newSale event.  
myEmitter.on('newSale', () => {
    console.log('There was a new sale!');
});

// Second listener for newSale event.  
myEmitter.on('newSale', () => {
    console.log('Customer name:  Jonas.');
});

// The parameter stock has the value of 9.  
myEmitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock.`);
});

// Emit an event called 'newSale'.  9 is an argument.
myEmitter.emit('newSale', 9);

// Create a server.  
const server = http.createServer();

// First listener on the request event.  
server.on("request", (req, res) => {
    console.log("Request received!");
    console.log(req.url);
    res.end("Request received");
  });

// Second listener on the request event.  
server.on('request', (req, res) => {
    console.log('Another request.');
});

// Listener on the close event, occurs when the server is closed.  
server.on('close', () => {
    console.log('Server closed.');
});

// Listen to the server on port 8000.  
server.listen(8000, "127.0.0.1", () => {
    console.log("Waiting for requests...");
});
  