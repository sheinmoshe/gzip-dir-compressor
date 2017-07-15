const fs = require('fs');
const path = require('path');
const compressing = require('compressing');

var files = new Array();
var distPath;
var filterArray = new Array();
var promiseArray = new Array();

function getFolder(){
	distPath = process.argv[2];
    if (fs.existsSync(distPath)) {
        files = fs.readdirSync(distPath);
        filterFiles();
        compressFile();
    }
}

function filterFiles(){
    for (var i = 0; i < files.length; i++) {
      // Avoiding to attempt compress directories
       if (path.extname(files[i])){
           filterArray.push(files[i]);
       }
    }
}

function compressFile (){
    for (var i=0; i<filterArray.length; i++) {
      console.log('compressing file: ' + distPath + '/' + filterArray[i]);

      promiseArray.push(compressing.gzip.compressFile(distPath + '/' + filterArray[i], distPath + '/' +  filterArray[i] + '.gz'));
    }

    Promise.all([promiseArray]).then( () => {
      console.log('Compressing files is finished');
    });
}

module.exports.main = getFolder;
