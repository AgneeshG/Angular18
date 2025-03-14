const http = require('http')
const fs = require('fs')
const { buffer } = require('stream/consumers')

const server = http.createServer((req,res)=>{
    const url = req.url
    const method = req.method

    if(url == '/'){
        res.write('<html>')
        res.write('<heaad><title>Sample page</title></heaad>')
        res.write('<body>')
        res.write('<form method="POST" action="/user"><input type="text" name="message"><br><input type="submit" value="Send"></form>')
        res.write('</body>') 
        res.write('</html>')
        return res.end()
    }

    if(url=='/user' && method=='POST'){
        const recData= []
        req.on('data', (chunk)=>{
            recData.push(chunk)
        })
        req.on('end',()=>{

            const userData = Buffer.concat(recData).toString()
            const message = userData.split('=')
            fs.writeFile('temp2.txt', `sample data from temp.js file - ${message[1]}`, ()=>{
            })
        })
        res.statusCode = 302
        res.setHeader('Location','/')
        return res.end()
    }
    res.write('<h2>404 PAGE NOT FOUND</h2>')
})
server.listen(3500)