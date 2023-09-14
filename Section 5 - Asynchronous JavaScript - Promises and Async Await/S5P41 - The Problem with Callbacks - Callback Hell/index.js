// Require the fs module to read and write file.  
const fs = require('fs');

// Require packages.  
const superagent = require('superagent');

// Arrow function:  Building a Promise for reading file.  
// If there's an error such as can't find file, call the reject function, otherwise resolve and pass in data as argument.  
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject("I could not find that file.");
            resolve(data);
        })
    });
}

// Arrow function:  Building a Promise for writing file.  
// If there's an error, call the reject function, otherwise call the resolve function.  
const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write file.');
            resolve('successs');
        })
    })
}

// Use async / await.  
// async keyword defines an asynchronous function where I can use the await keyword.  
// When invoking readFilePro, if the file is valid, returns a resolved Promise object.  
// It will take time to read a file, so I need to use the await keyword.  
// Retrieve 3 different links, use Promise.all() to take an array of 3 Promises and return a single Promise object.  
// Save the array of 3 image links into the images array using the map() method.  
// Join the imgs elements into a single string via join() method, with a new line as separator.  
// It will take time to retrieve an image link, so I also need to await the superagent.get() method.  
// await the writeFilePro function because it takes time to write a file, don't save it into a variable as I am only using writeFilePro to write a file.   
const getDogPic = async() => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed:  ${data}`);
        const res1Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs);
        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log("Random dog image is saved to file!");
    }
    catch(err) {
        console.log(err);
        throw(err);
    }
    return "2:  Ready."
}

// Asychronous functions returns a promise, if I want the returned value "2:  Ready", I have to use the then() method. 
// If there's an error, log the error message instead.   
(async () => {
    try {
        console.log("1.  Will get dog pics!");
        const x = await getDogPic();
        console.log(x);
        console.log('3:  Done getting dog pics!');   
    }
    catch(err) {
        console.log('ERROR!');
    }
})();

// Invoke the readFilePro and writeFilePro functions.  
// data is whatever contained inside dog.txt, which is "retriever".  
// Use superagent to get a retriever-type dog image's link.  
// Write the link into the dog-img.txt file.  
// Using promises, the .then() method will invoke if promise is fulfilled, if the promise is rejected, catch() will be invoked.  
/*
readFilePro(`${__dirname}/dog.txt`).then(data => {
    console.log(`Breed:  ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
})
.then(res => {  
    console.log(res.body);
    return writeFilePro('dog-img.txt', res.body.message);
})
.then(() => {
    console.log("Random dog image is saved to file!");
})
.catch(err => {
        console.log(err.message);
});
*/