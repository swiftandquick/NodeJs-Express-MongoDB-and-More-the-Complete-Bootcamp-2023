// Require the built-in fs module, which reads and writes files.  
const fs = require('fs');

// Require the built-in http module, which gives us networking capabilities.  
const http = require('http');

const hello = "Hello world!";
console.log(hello);

// Blocking, synchronous way.  

// Synchronous version of file reading.  Reads the input.txt file inside the txt folder.  
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

// Synchronous version of file writing.  Writes text into the out.txt file, which is inside the txt folder.  
const textOut = `This is what we know about the avocado ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');


// Non-block, asynchronous way.  

// As soon as readFile() is run, it will start reading start.txt in the background without blocking the rest of the code execution.  
// data1 contains "read-this" string, so the inner readFile() function prints out contents inside read.this.txt as data2.  
// data3 is content inside append.txt, print that out.  
// Write data2 and data3 into the final.txt file.  
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log("error");
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log("Your file has been written.");
            });
        });
    });
});

// "Will read file!" will be printed out before the data from start.txt is printed out.   
console.log('Will read file!');