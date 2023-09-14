const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

// Set the number of threads to 4.  
process.env.UV_THREADPOOL_SIZE = 4;

// When the timer expires after 0 seconds, a message is printed.  First timeout function, will execute second.  
setTimeout(() => console.log('Timer 1 finished.'), 0);

// Immediately prints out a message.  setImmediate function, will execute third.  
setImmediate(() => console.log("Immediate 1 finished."));

// Reads the test.file.txt text file.  Since it will take time to read the file, this I/O function will execute fourth.  
// Print out "I/O finished".  
// Because the method is pbkdf2Sync, which is a synchronous function, even though I have 4 threads, the tasks are no longer offloaded to the thread pool.  
// The pbkdf2Sync methods will execute 1 by 1, with each takes around 1-2 seconds.  
// nextTick() is executed next, it's part of the microtask queue.  
// Enter the event loop, immediately execute the setImmedaite() function, because after executing I/O function, setImmediate function is next in the queue.  
// Since there's still a timeout function, the event loop continues and executes the first setTimeout() function.    
// Since there's still a timeout function, the event loop continues and executes the second setTimeout() function after 3 seconds.   
fs.readFile('test-file.txt', () => {
    console.log("I/O finished.");
    setTimeout(() => console.log('Timer 2 finished.'), 0);
    setTimeout(() => console.log('Timer 3 finished.'), 3000);
    setImmediate(() => console.log("Immediate 2 finished."));
    process.nextTick(() => console.log('Process.nextTick'));
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password encrypted");
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password encrypted");
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password encrypted");
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password encrypted");
});

// This is the top-level code, will execute first.  
console.log("Hello from the top-level code.");