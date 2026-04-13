const listaZap = require('./contatos.js')

const getListaContatos = function() {

    let contatos = []

    listaZap.contatos["whats-users"].forEach(contato => {
        contatos.push(contato)
    })

    return contatos
}

const getDadosContatos = function() {

    let contatos = []

    listaZap.contatos["whats-users"].forEach(contato => {
        contatos.push ({
            id: contato.id,
            nome: contato.account,
            nick: contato.nickname,
            foto: contato["profile-image"],
            numero: contato.number,
            corFundo: contato.background,
            criadoEm: contato["created-since"].start,
            encerradoEm: contato["created-since"].end

        })
    })

    return contatos
}

const getDadosUsuario = function(){

    let dadosContatos = []

    listaZap.contatos["whats-users"].forEach(user => {

        user.contacts.forEach(contato => {
            dadosContatos.push({
                nome: contato.name,
                foto: contato.image,
                descricao: contato.description
            })
        })

    })

    return dadosContatos
}

const getDadosMensagem = function(numero){

    let dadosMensagem = []

    listaZap.contatos["whats-users"].forEach(user => {

        if (!numero || user.number === numero) {

            user.contacts.forEach(contato => {

                contato.messages.forEach(msg => {
                    dadosMensagem.push({
                        usuario: user.account,
                        numero: user.number,
                        contato: contato.name,
                        remetente: msg.sender,
                        mensagem: msg.content,
                        horario: msg.time
                    })
                })

            })

        }

    })

    return dadosMensagem
}

const getConversas = function(numero, nomeContato){

    let resultado = []

    listaZap.contatos["whats-users"].forEach(user => {

        if (numero && user.number !== numero) return

        user.contacts.forEach(contato => {
            if (nomeContato && contato.name !== nomeContato) return

                contato.messages.forEach(msg => {
                    resultado.push({
                        usuario: user.account,
                        numero: user.number,
                        contato: contato.name,
                        remetente: msg.sender,
                        mensagem: msg.content,
                        horario: msg.time
                    })
                })

        })

    })

    return resultado

}

const getBuscarMensagens = function(numero, nomeContato, palavraChave){

    let resultado = []

    listaZap.contatos["whats-users"].forEach(user => {

        if (numero && user.number !== numero) return

        user.contacts.forEach(contato => {

            if (nomeContato && contato.name !== nomeContato) return

            contato.messages.forEach(msg => {

                if (palavraChave && msg.content.toLowerCase().includes(palavraChave.toLowerCase())) {
                    resultado.push({
                        usuario: user.account,
                        contato: contato.name,
                        remetente: msg.sender,
                        mensagem: msg.content,
                        horario: msg.time
                    })
                }

            })

        })

    })

    return resultado
}

//console.log(getListaContatos())
//console.log(getDadosContatos())
//console.log(getDadosUsuario())
//console.log(getDadosMensagem("1194457796"))
//console.log(getConversas("11987876567","Ana Maria"))
//console.log(getBuscarMensagens("11987876567","Ana Maria","I'm"))

module.exports = {getConversas, getDadosContatos, getDadosMensagem, getDadosUsuario, getListaContatos, getBuscarMensagens}