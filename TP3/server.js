var http = require('http')
var fs = require('fs')
const axios = require('axios')
const { create } = require('domain')

function index_generator(){
    return `<!DOCTYPE html>
    <html lang="pt">
        <head>
            <meta charset="UTF-8">
            <title>TPC3 - Escola de Música</title>
        </head>
        <body>
                <h2><a href="http://localhost:4000/alunos">Alunos</a></h2>
                <h2><a href="http://localhost:4000/cursos">Cursos</a></h2>
                <h2><a href="http://localhost:4000/instrumentos">Intrumentos</a></h2>
            </ul>
        </body>
    </html>`
}



function cursos_generator(res){
    axios.get('http://localhost:3000/cursos')
    .then( resp=> {
        data = resp.data;
        var html = `<!DOCTYPE html>
    <html lang="pt">
        <head>
            <meta charset="UTF-8">
            <title>Alunos - Escola de Música</title>
        </head>
        <body>
            <table style="width:100%">
            <tr>
                <th>ID</th>
                <th>Designação</th>
                <th>Duração</th>
                <th>Instrumento</th>
            </tr>`
        data.forEach(a => {
            html += '<tr>'
            html += `<td>${a.id}</td>`
            html += `<td>${a.designacao}</td>`
            html += `<td>${a.duracao}</td>`
            old_key = '#text'
            new_key = 'text'
            a.instrumento[new_key] = a.instrumento[old_key]
            html += `<td>${a.instrumento.text}</td>`
            html += '</tr>'
        });
        html +=` </table>
            </body>
            </html>
            `
        res.write(html);
        res.end();
    })
    .catch( error  => {
        console.log(error);
    });
}



function alunos_generator(res){
    axios.get('http://localhost:3000/alunos')
    .then( resp=> {
        data = resp.data;
        var html = `<!DOCTYPE html>
    <html lang="pt">
        <head>
            <meta charset="UTF-8">
            <title>Alunos - Escola de Música</title>
        </head>
        <body>
            <table style="width:100%">
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Data Nascimento</th>
                <th>Curso</th>
                <th>Ano Curso</th>
                <th>Instrumento</th>
            </tr>`
        data.forEach(a => {
            html += '<tr>'
            html += `<td>${a.id}</td>`
            html += `<td>${a.nome}</td>`
            html += `<td>${a.dataNasc}</td>`
            html += `<td>${a.curso}</td>`
            html += `<td>${a.anoCurso}</td>`
            html += `<td>${a.instrumento}</td>`
            html += '</tr>'
        });
        html +=` </table>
            </body>
            </html>
            `
        res.write(html);
        res.end();
    })
    .catch( error  => {
        console.log(error);
    });
}

function instrumentos_generator(res){
    axios.get('http://localhost:3000/instrumentos')
    .then( resp=> {
        data = resp.data;
        var html = `<!DOCTYPE html>
    <html lang="pt">
        <head>
            <meta charset="UTF-8">
            <title>Alunos - Escola de Música</title>
        </head>
        <body>
            <table style="width:100%">
            <tr>
                <th>ID</th>
                <th>Instrumento</th>
            </tr>`
            data.forEach(a => {
                html += '<tr>'
                html += `<td>${a.id}</td>`
                old_key = '#text'
                new_key = 'text'
                a[new_key] = a[old_key]
                html += `<td>${a.text}</td>`
                html += '</tr>'
            });
        html +=` </table>
            </body>
            </html>
            `
        res.write(html);
        res.end();
    })
    .catch( error  => {
        console.log(error);
    });
}

function create_s(){
    http.createServer(function (req, res) {
        var myurl = req.url.substring()
        if (myurl == "/") {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(index_generator())
            res.end()
            }
        if (myurl ==  "/alunos"){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            alunos_generator(res)
        }
        if (myurl ==  "/cursos"){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            cursos_generator(res)
        }
        if (myurl ==  "/instrumentos"){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            instrumentos_generator(res)
        }
    }).listen(4000)
    console.log("Servidor a escuta na porta 4000")
}

create_s()