/*
* index file this is the first entry to the application
*
*/

// Dependencies
import http from 'http'
import {greet} from './test';

console.log(greet)
//server to respond to requests
const server= http.createServer((req,res)=>{
res.end(greet())
})

//start the server and listen on port 5000
server.listen(5000,()=>console.log("Server started and listening on Port 5000"))