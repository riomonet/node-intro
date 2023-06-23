const fs = require('fs')

let args = process.argv
let path = args[2]


if (path)
    cat (path)
else
    console.log("required arg: File Path")
	
function cat (path) {
    fs.readFile (path, 'utf8', (err,data) => {
	if (err) {
	    console.log(err)
	    process.kill(1)
	}
	console.log(data)
    })
}
