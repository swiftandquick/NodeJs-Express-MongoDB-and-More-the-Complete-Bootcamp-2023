// First argument is the tempCard, which is the string representing the html file.  
// Second argument is product, which is one of the objects in dataObj.  
// Replace the placeholders such {%PRODUCTNAME%} with the object's properties such as productName. 
// If the object's organic property is false, replace the placeholder {%NOT_ORGANIC%} with not-organic string to create a not-organic class.
module.exports = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if(!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
}