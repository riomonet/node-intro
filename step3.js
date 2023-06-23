const fs = require('fs')
const axios = require('axios')

let path = process.argv[2]

if (!path) {
    console.log("required arg: File Path")
    process.exit(1)
}

const regex = /^http/
let res = path.toLowerCase().match(regex)

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
	console.log(data)
    })
}

function webCat (url) {

    axios.get(url)
	.then(res => console.log(res))
	.catch(error => console.log(error.toJSON().message))
}

