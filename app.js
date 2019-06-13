const http = require('http');
const url = require('url');
const fs = require('fs');
const readline = require('readline')

var data = {}

var lineReader = readline.createInterface({
  input: fs.createReadStream('brooke.txt')
});


lineReader.on('line', function (line) {
    if(line.startsWith("RHYME") || line.startsWith("TITLE")){
    }
    else{
        line = line.trim()
        words = line.split(" ")
        
        var prev = words[0]
        
        console.log(line)
        
        for(var i = 1;i<words.length;i++){
            var word = words[i]
            console.log(data[prev])
            if(data[prev] == undefined){
                data[prev] = {follow: [], count: []}
            }
            else
                data[word]
            prev = words[word]
            
        }
    }
    
});
console.log(data)
console.log("Dict loaded")

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