import express from 'express'; // Importa o módulo do Express Framework
import routerAPI from './routerAPI.js';
import routerAPI2 from './routerAPI2.js';

const app = express(); // Inicializa um objeto de aplicação Express
app.use ('/api', routerAPI);
app.use ('/api/v2', routerAPI2);

//Mensagem para acesso geral
app.get ("/",(req, res) => {
    let msg = 'Você acessou Exercício 1 - Montagem de uma API RESTful.';   
    res.status(200).json( { 
        message: msg,
    });
    console.log(msg)
})

//Mensagem para acesso geral
app.use ("/",(req, res) => {    
    res.status(404);
    res.send('Recurso solicitado não existe');
})

// Inicializa o servidor HTTP na porta 3000
const port = 3000
const servidor = '127.0.0.1'
app.listen(port, function () {
  console.log(`Servidor rodando em http://${servidor}:${port}`);
});
