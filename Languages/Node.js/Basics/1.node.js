// const http = require('http')
// function callBackForSer(req,res){
//     console.log(req.url);
// }
// const server2 = http.createServer(callBackForSer)
// server2.listen(3000)

// // sending basic response
// const server = http.createServer((req, res)=>{

//     url = req.url
//     if(url=='/'){
//         res.setHeader('content-type', 'text/html')
//         res.write('<html>')
//         res.write('<head><title>Enter Form Details</title></head>')
//         res.write('<body> <form method="POST" action="/message"> <input type="text" name="message"><input type="submit" value="send"> </form> </body>')
//         res.write('</html>')
//         return res.end()
//     }

//     res.setHeader('content-type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>JVL Code</title></head>');
//     res.write('<body><h1>Hello from Node.js server!</h1></body>')
//     res.write('</html>')
//     res.end()
// })
// server.listen(3500)




const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res)=>{
    const url = req.url
    const method = req.method

    if(url == '/'){
        res.setHeader('content-type','text/html')
        res.write('<html>')
        res.write('<head> <title>Home Page Form</title></head>')
        res.write('<body> <form action="/userpage" method="post"> <input type="text" name="userPageData"> <input type="submit" value="Send"> </form></body>')
        res.write('</html>')
        return res.end()
    }

    if(url == 'userpage', method == 'POST'){
        fs.writeFileSync('temp.txt', 'Dummy Data')
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
    }

    res.setHeader('content-type', 'text/html')
    res.write('<html>')
    res.write('<head><title>Message Page</title></head>')
    res.write('<body> <h1>Hello message From Node.JS</h1> </body>')
    res.write('</html>')
})

server.listen(3500)