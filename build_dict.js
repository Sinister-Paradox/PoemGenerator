const fs = require('fs');

console.log("HELLO")

markovData = {};
startWords = {}

fs.readFile('brooke.txt', (err, data) => { 
    if (err) throw err; 
  
    console.log(data.toString()); 
})