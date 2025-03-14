const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res)=>{
    const url = req.url
    const method = req.method

    if(url == '/'){
        res.setHeader('content-type','text/html')
        res.write('<html>')
        res.write('<head><title>Home page</title></head>')
        res.write('<body><form method="POST" action="/user"><input type="text" name="message"><input type="submit" value="send"></form></body>')
        res.write('</html>')
        return res.end()
    }
    if(url == "/user" && method == "POST"){
        const formData = []
        req.on('data', (chunk)=>{
            formData.push(chunk)
        })
        req.on('end', ()=>{
            const userData = Buffer.concat(formData).toString()
            console.log(userData);

            const message = userData.split('=')
            fs.writeFile('temp.txt', message[1], ()=>{
            })
        })
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
    }
})
server.listen(3500)

















// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req, res) => {
//     const url = req.url
//     const method = req.method

//     if (url == "/") {
//         res.setHeader('content-type', 'text/html')
//         res.write('<html>')
//         res.write('<head><title>join chunk data</title></head>')
//         res.write('<body><form method="POST" action="/addUser"><input type="text" name="userData"><input type="submit" value="Send"></form></body>')
//         res.write('</html>')
//         return res.end()
//     }

//     if(url=="/addUser" && method=="POST"){

//         chunkData = []
//         req.on('data',(chunk)=>{
//             chunkData.push(chunk)
//         })
//         req.on('end',()=>{
//             const parsedData = Buffer.concat(chunkData).toString()
//             console.log(parsedData);

//             const message = parsedData.split('=')
//             fs.writeFileSync('temp.txt', message[1])
//         })

//         res.statusCode = 302
//         res.setHeader('Location', '/')
//         return res.end()
//     }
// })
// server.listen(3500)

