// const express = require('express');
import express from 'express'; // Importa o módulo do Express Framework
const routerAPI = express.Router();

// Declara um array de produtos com id, decsrição, marca e preço
const produtos = [
    { id: 1, descricao: 'Coca-Cola', marca: 'Coca-Cola', preco: 5.00},
    { id: 2, descricao: 'Pepsi', marca: 'Pepsi', preco: 4.50},
    { id: 3, descricao: 'Guaraná', marca: 'Antarctica', preco: 4.00},
    { id: 4, descricao: 'Fanta', marca: 'Coca-Cola', preco: 4.00},
    { id: 5, descricao: 'Dolly', marca: 'Dolly', preco: 3.00},
    { id: 6, descricao: 'Sukita', marca: 'Coca-Cola', preco: 4.00},
    { id: 7, descricao: 'Sprite', marca: 'Coca-Cola', preco: 4.00}
]

// processa o corpo da requisição e insere os dados recebidos 
// como atributos de req.body
routerAPI.use(express.json());
routerAPI.use(express.urlencoded({ extended: true }))

//Obter a lista de produtos
routerAPI.get ('/produtos', (req, res) => {
    res.json (produtos);
})

//Obter um produto específico
routerAPI.get ('/produtos/:id', (req, res) =>{
    let produto = produtos.find(p => p.id == req.params.id);
    if (produto) {
      res.json(produto);
    }else {
      res.status(404).json({ message: `Produto ${req.params.id} não encontrado`});
    } 
})

//Incluir um produto
routerAPI.post('/produtos', (req, res) => {
    console.log(req.body);
    const lastId = Math.max(...produtos.map(produto => produto.id));
    req.body.id = lastId + 1;
    produtos.push(req.body);
  
    res.status(201).json( { 
        message: 'Produto adicionado com sucesso',
        data: { id: req.body.id } });  
})

// Alterar um produto
routerAPI.put('/produtos/:id', (req, res) => {
    const produtoIndex = produtos.findIndex(p => p.id == req.params.id);
    if (produtoIndex === -1) {
      res.status(404).json({ message: `Produto ${req.params.id} não encontrado` });
    } else {
      produtos[produtoIndex] = { ...produtos[produtoIndex], ...req.body };
      res.json({ message: `Produto ${req.params.id} atualizado com sucesso` });
    }
});

// Excluir um produto
routerAPI.delete('/produtos/:id', (req, res) => {
    const produtoIndex = produtos.findIndex(p => p.id == req.params.id);
    if (produtoIndex === -1) {
      res.status(404).json({ message: `Produto ${req.params.id} não encontrado` });
    } else {
      produtos.splice(produtoIndex, 1);
      res.json({ message: `Produto ${req.params.id} excluído com sucesso` });
    }
});

export default routerAPI;