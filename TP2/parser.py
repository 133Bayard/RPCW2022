import json
import os
from turtle import title


atores = {}
atori=1

def list_split(listA, n):
    for x in range(0, len(listA), n):
        every_chunk = listA[x: n+x]

        if len(every_chunk) < n:
            every_chunk = every_chunk + \
                [None for y in range(n-len(every_chunk))]
        yield every_chunk


def listToString(s): 
    
    # initialize an empty string
    str1 = "" 
    
    # traverse in the string  
    for ele in s: 
        str1 += ele
        str1 += "; "  
    
    # return string  
    return str1 
i=1
with open("cinemaATP.json", encoding='utf-8') as meu_json:
    dados = json.load(meu_json)

filmesO = sorted(dados, key=lambda k: k['title'], reverse=False)
atoresO = sorted(dados, key=lambda k: k['cast'], reverse=False)




for filme in filmesO:
    filename = "HTML/f"+ str(i) + ".html"
    dirname = os.path.dirname(filename)
    if not os.path.exists(dirname):
        os.makedirs(dirname)
    with open(filename, 'w'):
        file = open(filename,"w")
        file.write('<!DOCTYPE html>\n<html>\n<head>\n<title>'+filme["title"]+'</title>\n<meta charset="UTF-8"/>\n</head>')
        file.write('<body>\n<h1>'+filme["title"]+'</h1>\n<h2>Ano</h2>\n<p>'+str(filme["year"])+'</p>\n<h2>Cast</h2>\n<p>'+listToString(filme["cast"])+'</p>\n<h2>Genres</h2>\n<p>'+listToString(filme["genres"])+'</p>\n')
        file.write('<a href="http://localhost:7777/filmes">Voltar atrás</a>')
        file.write('</body>')
        file.close()
    i+=1

j=1
with open("HTML/filmes.html", 'w'):
        file = open("HTML/filmes.html","w")
        file.write('<!DOCTYPE html>\n<html>\n<head>\n<title>'+'Filmes'+'</title>\n<meta charset="UTF-8"/>\n</head>')
        file.write('<body>')
        for ele in filmesO:
            numero = str(j)
            file.write('<p><a href="http://localhost:7777/filmes/f' + numero +
                    '">' + ele['title'] + '</a>\n</p>')
            j += 1
        file.write('<a href="http://localhost:7777/">Voltar atrás</a>')
        file.write('</body>')
        file.close()

with open("HTML/index.html", 'w'):
    file = open("HTML/index.html", "w")
    file.write('<!DOCTYPE html>\n<html>\n<head>\n<title>'+'Início'+'</title>\n<meta charset="UTF-8"/>\n</head>')
    file.write('<body>')
    file.write('<h2><a href="http://localhost:7777/filmes">' + 'Filmes' + '</a></h2>\n')
    file.write('<h2><a href="http://localhost:7777/atores">' + 'Atores' + '</a></h2>\n')
    file.write('</body>')

for filme in filmesO:
    for ator in (list(list_split(filme["cast"],1))):
        if str(ator) not in atores:
            atores[str(ator)] = {
                'filmes' : []
            }
            atores[str(ator)]['filmes'].append(filme['title'])

        else:
             atores[str(ator)]['filmes'].append(filme['title'])


atores = atores.items()
atores = sorted(atores)

for ator,values in atores:
    filename = "HTML/a"+ str(atori) + ".html"
    with open(filename, 'w'):
        file = open(filename,"w")
        file.write('<!DOCTYPE html>\n<html>\n<head>\n<title>'+ator+'</title>\n<meta charset="UTF-8"/>\n</head>')
        file.write('<body>')
        for filme in values['filmes']:
            file.write('<p>'+filme+'</p>')
        file.write('<a href="http://localhost:7777/atores">Voltar atrás</a>')
        file.write('</body>')
        file.close()
    atori+=1

j=1
with open("HTML/atores.html", 'w'):
        file = open("HTML/atores.html","w")
        file.write('<!DOCTYPE html>\n<html>\n<head>\n<title>'+'Atores'+'</title>\n<meta charset="UTF-8"/>\n</head>')
        file.write('<body>')
        for ator,values in atores:
            numero = str(j)
            file.write('<p><a href="http://localhost:7777/atores/f' + numero +
                    '">' + ator + '</a>\n</p>')
            j += 1
        file.write('<a href="http://localhost:7777/">Voltar atrás</a>')
        file.write('</body>')
        file.close()