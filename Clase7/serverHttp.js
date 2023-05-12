const http = require('http')

const server = http.createServer((req,res)=>{
    res.end('Hola mundo desde backend')
})

server.listen(8080, ()=>{
    console.log('listening on http://localhost:8080')
})