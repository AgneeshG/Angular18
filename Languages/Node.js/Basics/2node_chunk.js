const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method
    if (url == '/') {
        res.setHeader('content-type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Enter Form Details</title></head>')
        res.write('<body><form enctype="multipart/form-data" action="/datastream" method="POST"><input type="text" name="userData"> <br> <input type="file" name="file"> <br> <input type="submit" value="Add"></form></body>')
        res.write('</html>')
        return res.end()
    }

    if(url == "/datastream" && method == "POST"){
        req.on('data', (chunk)=>{
            console.log("Chunk :");
            console.log(chunk);
        })
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
    }

    if (url == "/addUser" && method == "POST") {
        fs.writeFileSync('temp.txt', 'Sample Data from  Node.JS!')
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
    }

    if (url == "/userList") {
        res.setHeader('content-type', 'text/html')
        res.write('<html>')
        res.write('<body><h2>User list page</h2></body>')
        res.write('</html>')
        return res.end()
    }
    res.setHeader('content-type', 'text/html')
    res.write('<html>')
    res.write('<head><title>Hello Page</title></head>')
    res.write('<boyd><h1>Hello From Node.JS!</h1></body>')
    res.write('</html>')
    res.end()
})

server.listen(3500)