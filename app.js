const http = require('http');
const url = require('url');
const fs = require('fs');
const readline = require('readline')

var data = new Map()

var lineReader = readline.createInterface({
  input: fs.createReadStream('brooke.txt')
});

lineReader.on('line', function (line) {
    if(line.startsWith("RHYME") || line.startsWith("TITLE")){
    }
    else{
        line = line.trim().toLowerCase()
        words = line.split(" ")
        
        var prev = words[0]
                
        for(var i = 1;i<words.length;i++){
            var word = words[i]
            if(data.get(prev) == undefined){
                data.set(prev, {follow: [], repeat: []})
            }
            var index = data.get(prev).follow.indexOf(word)
            if(index == -1){
                data.get(prev).follow.push(word);
                data.get(prev).repeat.push(1);
            }
            else{
                data.get(prev).repeat[index]++;
            }
            
        }
    }
    console.log(data)
});
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