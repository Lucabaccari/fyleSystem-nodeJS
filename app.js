const fs = require("fs") //Importa o módulo de File System, que serve para tartar de arquivos

const comando = process.argv[2] //Process é usado para trabalhar com valores do terminal nesse caso
const nome = process.argv[3]
const novoNome = process.argv[4]

const limiteCaracteres = (nome && nome.length >= 25) ||
  (novoNome && novoNome.length >= 25)

const regexNome = /^[\p{L}\d ]+$/u

function verificaRegex(nome){
 if(!regexNome.test(nome)){
    console.log("O nome só pode conter letras, números e espaços!")
    process.exit()
 }
}

//Verifca se o comando tem o mínimo de comando necessários
if(process.argv.length < 3){
 console.log(`Comandos possíveis: 
    1. "list" para listar usuários
    2. "add" + "nome" para adicionar usuário
    3. "edit" + "nome" a ser editado + edição
    4. "remove" + "nome" para remover usuário `)
    process.exit()
}


//Lista usuários, lendo um arquivo já existente
if(comando === "list"){
    fs.readFile("usuários.txt", "utf-8", (erro, dados) => {
        if(erro){console.log(`Houve um erro: ${erro}`)}

        if(!dados){
            console.log(`Ainda não existem usuários, adicione através do método "add"`)
            return
        }

        console.log(`Os usuários são: \n${dados}`)
    }) 
}

//Adiciona usuários e poderia criar o arquivo caso ele não existisse
else if(comando === "add"){
    //Verifica se o nome já existe, se não existir cai no append
    fs.readFile("usuários.txt", "utf-8", (erro,dados) => {
        if(erro){console.log(`Houve um erro: ${erro}`)}

        verificaRegex(nome)

        if(limiteCaracteres){
            console.log("O limite é de 25 caracteres!")
            return
        }
        //Separa os nomes a partir das quebras de linha e coloca-os em um array
        const users = dados.split('\n').filter(Boolean)
        //Faz uma verificação percorrendo a array, verificando se existe algo dentro que atenda a condição retornando um boolean
        const nomeExiste = users.some(usuario => usuario === nome)
        
        if(nomeExiste){
            console.log("Esse nome de usuário já existe!")
            return
        }
        
        fs.appendFile("usuários.txt", nome + '\n', (erro) => {
           if(erro){console.log(`Houve um erro: ${erro}`)}
           
           console.log(`Usuário ${nome} adicionado com sucesso`)
       })  
    })

}

//Edita os usuários
else if(comando === "edit"){
    fs.readFile("usuários.txt", "utf-8", (erro, dados) => {
    //Tratamento de erro
    if(erro){console.log(`Houve um erro: ${erro}`)}

        
        const users = dados.split("\n").filter(Boolean)

        //Verifica se o nome a ser editado existe
        const nomeExiste = users.some(usuario => usuario === nome)
        if(!nomeExiste){
        console.log("O nome a ser editado não existe na lista!")
        return
        }
        
        //Verifica se o resultado da edição já existe, percorrendo a array de users fazendo a condição
        const edicaoExiste = users.some(usuario => usuario === novoNome)
        if(edicaoExiste){
            console.log("Sua edição não foi possível pois esse usuário já existe!")
            return
        }

        if(limiteCaracteres){
            console.log("O limite é de 25 caracteres!")
            return
        }

        verificaRegex(novoNome)
        
        //Se passar pelos tratamentos, cria uma nova array atualizada com o nome editado
        const edicao = users.map(usuario => usuario === nome ? novoNome : usuario)

        //Reeescreve o documento com essa nova array sendo transformada em string
        fs.writeFile("usuários.txt", edicao.join("\n"), () => {    
        console.log("Usuário editado com sucesso")
        })
    }) 
}

//Remove usuários
else if(comando === "remove"){
    fs.readFile("usuários.txt", "utf-8", (erro, dados) => {
    //Tratamento de erro
    if(erro){console.log(`Houve um erro: ${erro}`)}
        
    const users = dados.split("\n").filter(Boolean)
    
    const nomeExiste = users.some(usuario => usuario === nome)
    if(!nomeExiste){
        console.log("O nome a ser excluído não existe na lista!")
        return
    }

    //Dessa array, cria uma nova, filtrando apenas os usuários, sem o nome que deseja ser removido
    const novaLista = users.filter(usuario => usuario !== nome)

    //Reescreve o arquivo já existente com essa segunda nova array
    fs.writeFile("usuários.txt", novaLista.join("\n"), () => {})
    console.log("Usuário removido com sucesso!")
})
}

else{
   console.log("O comando é inválido")
}








