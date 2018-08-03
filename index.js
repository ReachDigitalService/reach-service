/*
* index file this is the first entry to the application
*
*/

// Dependencies
import http from 'http'
import { greet } from './test'
import url from 'url'


//server to respond to requests
const server = http.createServer((req, res) => {

    //now parsing the url to find which res is being requested
    
    //get the url and parse it  req.url will be full url, sec true to call the query string 
    const parsedUrl= url.parse(req.url,true)

    //get the path localhost:5000/quotation pathname is quotation -- untrimmed path
    const path=parsedUrl.pathname;
    //trims the forward slash at the last.
    var trimmedpath=path.replace(/^\/+|\/+$/g,'')

    //get the HTTP method
    const method=req.method.toLowerCase()

    //send the response
    res.end(greet())

    //log the request
    console.log('Requested Path',trimmedpath,' Requested Method ',method);
})

//start the server and listen on port 5000
server.listen(5000, () => console.log("Server started and listening on Port 5000"))