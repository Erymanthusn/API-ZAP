const express = require("express")
const cors = require('cors')

const app = express()

const corsOptions = {
    origin: ['*'],
    methods:'GET',
    allowedHeaders: ['Content-type', 'Authorization']

}

app.use(cors(corsOptions))

const contatosZap = require('./modulo/array_json.js')

app.get('/v1/whatsapp/listacontatos', function(request, response){
    let listaContato=contatosZap.getListaContatos()

    if(listaContato){

        response.status(200)
        response.json(listaContato)
        
    }else{

        response.status(404)
        response.json({"message": "Nenhum contato foi encontrado"})
    }
})

app.get('/v1/whatsapp/dadoscontatos', function(request, response){
    let dadosContatos=contatosZap.getDadosContatos()

    if(dadosContatos){
        response.status(200)
        response.json(dadosContatos)
    }else{
        response.status(404)
        response.json({"message": "Nenhum contato foi encontrado"})
    }
})

app.get('v1/whatsapp/dadosusuario', function (request, response){
    let dadosUsuario=contatosZap.getDadosUsuario()

    if(dadosUsuario){
        response.status(200)
        response.json(dadosUsuario)
    }else{
        response.status(404)
        response.json({"message": "Nenhum contato foi encontrado"})
    }
})

app.get('/v1/whatsapp/dadosmensagem/:numero', function(request, response){
    let numero = request.params.numero
    let dadosMensagem=contatosZap.getDadosMensagem(numero)

    if(dadosMensagem){
        response.status(200)
        response.json(dadosMensagem)
    }else{
        response.status(404)
        response.json({"message": "Nenhum contato foi encontrado"})
    }
})

app.get('/v1/whatsapp/conversa', function(request, response){

    let numeroUsuario = request.query.usuario
    let nomeContato = request.query.contato

    let conversa = contatosZap.getConversas(numeroUsuario, nomeContato)

    if(conversa && conversa.length > 0){
        response.status(200).json(conversa)
    }else{
        response.status(404).json({
            message: "Nenhum contato foi encontrado"
        })
    }
})

app.get('/v1/whatsapp/buscarmensagem', function(request, response){

    let numeroUsuario = request.query.usuario
    let nomeContato = request.query.contato
    let palavraChave = request.query.palavrachave

    let buscarMensagens = contatosZap.getConversas(numeroUsuario, nomeContato, palavraChave)

    if(buscarMensagens && buscarMensagens.length > 0){
        response.status(200).json(buscarMensagens)
    }else{
        response.status(404).json({
            message: "Nenhum contato foi encontrado"
        })
    }
})

app.get('v1/whatsapp/help', function(request, response){
    let docAPI = {
        "api-description": "API para manipular dados do Whatsapp",
        "date": "2026-04-13",
        "development": "Kaique Carvalho Costa",
        "version": 1.0,
        "endpoints": [
            {
                "rota1": "v1/whatsapp/listacontatos",
                "description": "Retorna uma lista de todos os números"
            },
            {
                "rota2": "v1/whatsapp/dadoscontatos",
                "description": "Listar dados da conta do profile do usuário"
            },
            {
                "rota3": "v1/whatsapp/dadosusuarios",
                "description": "Listar dados de contato para cada usuário"
            },
            {
                "rota4": "v1/whatsapp/dadosmensagem/:numero",
                "description": "Listar todas as mensagens trocadas de uma conta de usuário, usando o seu número como filtro"
            },
            {
                "rota5": "v1/whatsapp/conversa",
                "description": "Listar uma conversa de um usuário e um contato, usando o número do usuário e o nome do contato como filtro"
            },
            {
                "rota6": "v1/whatsapp/buscarmensagem",
                "description": "filtro como “pesquisa de palavra chave” com base em uma palavra nas conversas do usuário e do respectivo contato, usando o número do usuário, nome do contato e a palavra-chave como filtro"
            }
        ]
    }
})


