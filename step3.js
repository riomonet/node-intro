const fs = require('fs')
const axios = require('axios')

let outfile = null;
let path = null;

if (process.argv[2] == '--out') {
    outfile = process.argv[3]
    path = process.argv[4]
} else
    path = process.argv[2]


if (!path) {
    console.log("required arg: File Path")
    process.exit(1)
}


const urlRegex = /^http/
let res = path.toLowerCase().match(urlRegex)

if (res) 
    webCat (path)
else 
    cat (path)

	
function cat (path) {
    fs.readFile (path, 'utf8', (err,data) => {
	if (err) {
	    console.log(err)
	    process.kill(1)
	}
	if(outfile)
	    write(outfile,data,'w')
	else
	    console.log(data)
    })
}

function webCat (url) {

    axios.get(url)
	.then(res => {
	    if (outfile)
		write(outfile, res.data,'w')
	    else
		console.log(res.data)
	})
	.catch(error => console.log(error.message))
}

function write (file, data, flag) {
    
    fs.writeFile(file, data, {encoding: 'utf8', flag: flag}, (err) => {
	if (err) {
	    console.log(err)
	    process.kill(1)
	}
	console.log('SUCCESS')
    })
}
