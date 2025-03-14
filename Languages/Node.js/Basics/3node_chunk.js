const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method

    if (url == "/") {
        res.setHeader('content-type', 'text/html')
        res.write('<html>')
        res.write('<head><title>join chunk data</title></head>')
        res.write('<body><form method="POST" action="/addUser"><input type="text" name="userData"><input type="submit" value="Send"></form></body>')
        res.write('</html>')
        return res.end()
    }

    if(url=="/addUser" && method=="POST"){

        chunkData = []
        req.on('data',(chunk)=>{
            chunkData.push(chunk)
        })
        req.on('end',()=>{
            const parsedData = Buffer.concat(chunkData).toString()
            console.log(parsedData);

            const message = parsedData.split('=')
            fs.writeFileSync('temp.txt', message[1])
        })

        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
    }
})
server.listen(3500)














// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req, res)=>{
    
//     const url = req.url
//     const method = req.method

//     if(url == "/addUser" && method=="POST"){
       
//         const dataFromReq = []
//         req.on('data', (chunk)=>{
//             dataFromReq.push(chunk)
//         })

//         req.on('end', ()=>{
//             const parsedData = Buffer.concat(dataFromReq).toString()
//             console.log(parsedData);            
//         })
//         res.statusCode = 302
//         res.setHeader('Location', '/')
//         return res.end()
//     }
    
//     res.setHeader('content-type', 'text/html')
//     res.write('<html>')
//     res.write('<head><title>join chunk data</title></head>')
//     res.write('<body><form method="POST" action="/addUser"><input type="text" name="userData"><input type="submit" value="Send"></form></body>')
//     res.write('</html>')
//     res.end()
// })
// server.listen(3500)