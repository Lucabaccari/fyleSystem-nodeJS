# 📁 File System NodeJS - Projeto de Prática

Esse projeto foi criado para praticar o uso da API nativa **File System (fs)** do **Node.js**, exercitando conceitos como:

- Leitura e escrita de arquivos  
- Manipulação de dados em arquivo de texto  
- Comandos de CRUD (Create, Read, Update, Delete) pelo terminal  
- Validações de dados (duplicados, formato, tamanho, etc.)

---

## 🧠 Sobre o Projeto

Esse repositório contém um programa em JavaScript que funciona como um **CRUD simples de nomes**, utilizando o módulo `fs` do Node.js para lidar com arquivos de texto.

Ele permite:

- Adicionar nomes  
- Listar nomes  
- Editar nomes  
- Remover nomes  

Tudo isso usando comandos no terminal.

---

## 🚀 Como Funciona

Você pode rodar o programa usando o Node.js diretamente no terminal:

```bash
node app.js <comando> <nome> [nomeNovo]

Exemplos:
node app.js add Maria
node app.js list
node app.js edit Maria Ana
node app.js remove Ana
