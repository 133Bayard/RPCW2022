var http = require('http')
var fs = require('fs')

http.createServer(function (req, res) {
    var myurl = req.url.substring()
    if (myurl == "/") {
        fs.readFile('./HTML/index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            if (err) {
                res.write("<p>Erro na leitura do ficheiro</p>")
            }
            else {
                res.write(data)
            }
            res.end()
        })
    }
    else if(myurl=="/filmes"){
        fs.readFile('./HTML/filmes.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            if (err) {
                res.write("<p>Erro na leitura do ficheiro</p>")
            }
            else {
                res.write(data)
            }
            res.end()
        })
    }
    else if(myurl=="/atores"){
        fs.readFile('./HTML/atores.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            if (err) {
                res.write("<p>Erro na leitura do ficheiro</p>")
            }
            else {
                res.write(data)
            }
            res.end()
        })
    }
    else if(myurl.includes("/filmes")) {
        var aux = myurl.substring(9)
        fs.readFile('./HTML/f' + aux + '.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            if (err) {
                res.write("<p>Erro na leitura do ficheiro</p>")
            }
            else {
                res.write(data)
            }
            res.end()
        })
    }
    else if(myurl.includes("/atores")){
        var aux = myurl.substring(9)
        fs.readFile("./HTML/a" + aux + ".html", function(err,data){
            res.writeHead(200, {'Content-Type':'text/html'})
            if(err){
                res.write("<p>Erro na leitura do ficheiro</p>")
            } else {
                res.write(data)
            }
            res.end()
        })
    }
}).listen(7777)