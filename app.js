const http = require('http');
const url = require('url');
const fs = require('fs');
const readline = require('readline')
const ed = require('edit-distance');

var data = new Map()

var lineReader = readline.createInterface({
  input: fs.createReadStream('lyrics.txt')
});

lineReader.on('line', function (line) {
    if(line.startsWith("RHYME") || line.startsWith("TITLE")){
    }
    else{
        line = line.trim().toLowerCase()
        words = line.split(" ")
        
        var prev = "\n";
        var i = 0;
        for(i = 0;i<words.length;i++){
            var word = words[i]
            if(data.get(prev) == undefined){
                data.set(prev, {follow: [], repeat: [],sum:0})
            }
            var index = data.get(prev).follow.indexOf(word)
            if(index == -1){
                data.get(prev).follow.push(word);
                data.get(prev).repeat.push(1);
                data.get(prev).sum ++;
            }
            else{
                data.get(prev).repeat[index]++;
                data.get(prev).sum++;
            }
            prev = words[i]
        }
        
        var word = "\n"
            if(data.get(prev) == undefined){
                data.set(prev, {follow: [], repeat: [],sum:0})
            }
            var index = data.get(prev).follow.indexOf(word)
            if(index == -1){
                data.get(prev).follow.push(word);
                data.get(prev).repeat.push(1);
                data.get(prev).sum ++;
            }
            else{
                data.get(prev).repeat[index]++;
                data.get(prev).sum++;
            }
   
    }
    //console.log(data)
}).on('close',function(){
    console.log("FINISHED LOADED DATA")
    Gen()
});

function editDistance(word1,word2){
    var distance = 0
    var a = []
    for(var i = 0;i<word1.length;++i ){
        a[i] = new Array(word2.length)

    }
    for(var i=0;i<word1.length;++i){
        for(var j = 0;j<word2.length;++j){
            if (i==0)
                a[i][j] = j
            else if (j==0)
                a[i][j] = i
            else if(word1[i]==word2[j]){
                a[i][j]=a[i-1][j-1]
            }else {
                a[i][j]=1+Math.min(a[i-1][j],a[i][j-1],a[i-1][j-1])
            }
        }
    }
    return a[word1.length-1][word2.length-1]
    
}

function getRhyme(prevWord,newWord,choosen){
    var min = 9999
    var minIndex = -1
    for(var i=0;i<data.get(newWord).follow.length;++i){
        var maybe = data.get(newWord).follow[i]
        if (maybe!="\n"){
            var temp =editDistance(prevWord.length<=2?prevWord.substring(0,prevWord.length):prevWord.substring(0,2),maybe.length<=2?maybe.substring(0,maybe.length):maybe.substring(0,2))
            if(temp<=min){
                min=temp
                minIndex = i
            }
        }
    }
    if(minIndex==-1){
        console.log(prevWord+"    "+choosen)
        return choosen
    }else{
        console.log(prevWord+"    "+data.get(newWord).follow[minIndex])
        return data.get(newWord).follow[minIndex]
    }
}

function getWord(word){
    var randomNumber = Math.random()*(data.get(word).sum)
    var words = data.get(word).follow
    var k =0
    var pk = 0
    for (var i =0;i<words.length;i++){
        pk += data.get(word).repeat[i]
        if (randomNumber<pk){
            return words[i]
        }
    }
    return "\n"
}
function Gen(){
    var len = 1000
    var rap = ""
    var prevLastWord = ""
    var flag = 0
    var tempWord = ""
    var word = ""
    var wordF = "i"
    var wordl = ""
    for (var i =0;i<len;++i){
        if (flag==0){
            tempWord =getWord(wordF)
            if(tempWord!="\n"&&wordF!='\n'){
                prevLastWord = tempWord
            }else if (tempWord=="\n"){
                flag=1
            }
            wordF = tempWord  
        }else if (flag==1){
            tempWord =getWord(wordF)
            if(tempWord=="\n"&&wordF=="\n"){
                flag = 0
            }else if(tempWord!="\n"&&wordF!='\n'){
                wordl = word
                word = tempWord
            }else if (tempWord=="\n"){
                rap = rap.substring(0,rap.length-1-word.length)
                word = getRhyme(prevLastWord,wordl,word)
                rap+=word
                rap+=" "  
                flag=0
            }
            wordF = tempWord  
        }
        rap+= tempWord
        if (tempWord!="\n"){
                    rap+=" "  
        }
    }
    console.log(rap)
}
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
