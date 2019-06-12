const http = require('http');
const url = require('url');
const fs = require('fs');


fs.readFile('brooke.txt', (err, data) => { 
    if (err) throw err; 
  
    //console.log(data.toString()); 
})

http.createServer(function(req, res){
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data){
        if(err){
            res.writeHead(404, {'Content-Type':'text/plain'});
            return res.end("404 not found")
        }
        else{
            res.writeHead(200, {'Content-Type':'text/html'});
        }
        res.write(data)
        return res.end();
    });
}).listen(8080);

markovData = {};
startWords = {}