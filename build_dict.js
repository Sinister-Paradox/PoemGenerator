const csv = require('csv-parser');  
const fs = require('fs');

markovData = {};

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    //Process Here
    
    
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });