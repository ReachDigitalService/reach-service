/*
* index file this is the first entry to the application
*
*/

// Dependencies
import http from 'http'
import { greet } from './test'
import url from 'url'
import stringDecoder from 'string_decoder'
import {handlers} from './src/handler/index'
import {router} from './src/router/index'


//server to respond to requests
const server = http.createServer((req, res) => {

    //now parsing the url to find which res is being requested

    //get the url and parse it  req.url will be full url, sec true to call the query string 
    const parsedUrl = url.parse(req.url, true)

    //get the path localhost:5000/quotation pathname is quotation -- untrimmed path
    const path = parsedUrl.pathname;
    //trims the forward slash at the last.
    const trimmedpath = path.replace(/^\/+|\/+$/g, '')

    //get the query string object
    const queryStringObject = parsedUrl.query

    //get the HTTP method
    const method = req.method.toLowerCase()

    //get the headers
    const headers = req.headers

    //get the payload
    const decoder = new stringDecoder.StringDecoder('utf-8')
    let buffer = ''
    req.on('data', (data) => buffer += decoder.write(data))
    req.on('end', () => {
        buffer += decoder.end()


        //should call the appropriate handler if anything is not matching should send to not found handler
        const choosenHandler = typeof (router[trimmedpath])!=='undefined' ? router[trimmedpath] : handlers.notFound

        var data = {
            'trimmedPath': trimmedpath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        //Route the request to chosen handler
        choosenHandler(data, (sc, pl) => {
            sc = typeof (sc) == 'number' ? sc : 200
            pl = typeof (pl) == 'object' ? pl : {}
            const payloadString = JSON.stringify(pl)
            res.writeHead(sc)
            // should send the response only after all the payloads are recieved
            //send the response
            res.end(payloadString)
            //log the request
            console.log('statusCode', sc, 'payload ', payloadString);
        })




    })


})

//start the server and listen on port 5000
server.listen(5000, () => console.log("Server started and listening on Port 5000"))

