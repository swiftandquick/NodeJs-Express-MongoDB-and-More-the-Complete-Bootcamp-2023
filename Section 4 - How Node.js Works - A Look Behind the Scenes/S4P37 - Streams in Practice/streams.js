// Require fs module to read and write.  
const fs = require('fs');

// Require http module and use it to create a server. 
const server = require('http').createServer();

server.on('request', (req, res) => {
    // Solution 1.  Node will need to load the entire file into memory, after that's ready, it can then send the data.  
    // This is a problem if the file is big or there are many requests.  
    /*
    fs.readFile("test-file.txt", (err, data) => {
        if(err) console.log(err);
        res.end(data);
    });
    */
    // Solution 2.  Create a readable stream.  Every time there's a new piece of data that we can consume, a readable stream emits the data event.  
    // We can listen to the event emitter.  A writable stream is used to display the data.  This way, we stream the file to the clients.  
    // If the file is not found, log the error.  
    /*
    const readable = fs.createReadStream('test-file.txt');
    readable.on('data', chunk => {
        res.write(chunk);
    });
    readable.on('end', () => {
        res.end();
    });
    readable.on('error', err => {
        console.log(err);
        res.status(500);
        res.end('File not found.');
    });
    */
    // Solution 3.  Use a pipe method on a readable source and the argument is the writable destination.   
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
});

// Listen on port 8000.
server.listen(8000, "127.0.0.1", () => {
    console.log("Listening...");
});
  