const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const gzip = zlib.createGzip();

var files = new Array();
var distPath;
var filterArray = new Array();
var index;

function getFolder() {
    distPath = process.argv[2];
    if (fs.existsSync(distPath)) {
        files = fs.readdirSync(distPath);
        filterFiles();
        index  = 0;
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
        let fileSrc = distPath + '/' + filterArray[i]
        console.log('compressing file: ' + fileSrc);

        const inp = fs.createReadStream(fileSrc);
        const out = fs.createWriteStream(fileSrc + '.gz');

        inp.pipe(gzip).pipe(out);
    }

}

module.exports.main = getFolder;