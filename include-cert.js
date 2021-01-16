/**
 * This script edits the '.gitignore' file to include 'firebase.cert.json'
 * when deploying to Heroku.
*/
const fs = require('fs');
const path = require('path');

// Read .gitignore
fs.readFile(path.resolve(__dirname, '.gitignore'), { encoding: 'utf-8' }, (error, data) => {

  if ( error ) return console.error(error);

  fs.writeFile(path.resolve(__dirname, '.gitignore'), data.replace('firebase.cert.json', ''), { encoding: 'utf-8' }, error => {

    if ( error ) return console.error(error);

  });

});
