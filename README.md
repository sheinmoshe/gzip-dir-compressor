# gzip-dir-compressor

#Description:

	Receives a directory, compress each file in directory with gzip.
	All compressed files are placed in the received directory .
	
# Installation

	$ npm i gzip-dir-compressor
	
#Usage example: 

	CLI: node bin\composer ../app/dist
	packege.json: "build:prod": "npm run build -- --prod && gzip-dir-compressor/bin/compressor ../app/dist",


