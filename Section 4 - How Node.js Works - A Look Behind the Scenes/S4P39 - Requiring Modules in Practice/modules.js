// arguments is an array in JavaScript.  
/*
console.log(arguments);
console.log(require("module").wrapper);
*/

// Require the Calculator class from test-module-1.js.  
const C = require('./test-module-1');

// Create a new object using C class as template.  
const calc1 = new C();

// Use a method (add) in the Calculator class to add two numbers together.  
console.log(calc1.add(2, 5));

// Require all functions from test-module-2 using destructuring.  
const { add, multiply, divide } = require('./test-module-2');

// Invoke different functions imported from test-modules-2.  
console.log(add(2, 5));
console.log(multiply(2, 5));
console.log(divide(4, 2));

// Require the function and call it immediately.  
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();