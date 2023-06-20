// const express = require('express');
import express from 'express'; // Importa o módulo do Express Framework
import knex from 'knex';
import knexConfig from './knexfile.cjs';

const routerAPI2 = express.Router();
const db = knex(knexConfig.development);

// processa o corpo da requisição e insere os dados recebidos 
// como atributos de req.body
routerAPI2.use(express.json());
routerAPI2.use(express.urlencoded({ extended: true }))

//Obter a lista de produtos
routerAPI2.get ('/produtos', (req, res) => {
    db('produtos').then((dados) => {
        res.json(dados);
    })
    .catch((err) => {
        res.json({message: `Erro ao obter os produtos: ${err.message}`});
    })
})

//Obter um produto específico
routerAPI2.get ('/produtos/:id', (req, res) =>{
    db('produtos').where('id', req.params.id).first()
    .then((dados) => {
        if (dados) {
            res.json(dados);
        } else {  
            res.status(404).json({ message: `Produto ${req.params.id} não encontrado`});
        }
    })
})

//Incluir um produto
routerAPI2.post('/produtos', (req, res) => {
    db('produtos').insert(req.body)
    .then((dados) => {
        res.status(201).json( {
            message: 'Produto adicionado com sucesso',
            data: { id: dados[0] }
        });
    })
})

// Alterar um produto
routerAPI2.put('/produtos/:id', (req, res) => {
    db('produtos').where('id', req.params.id).update(req.body)
    .then((dados) => {
        if (dados) {
            res.status(201).json({ message: `Produto ${req.params.id} atualizado com sucesso` });
        } else {  
            res.status(404).json({ message: `Produto ${req.params.id} não encontrado`});
        }
    })
})

// Excluir um produto
routerAPI2.delete('/produtos/:id', (req, res) => {
    db('produtos').where('id', req.params.id).delete()
    .then((dados) => {
        if (dados) {
            res.status(201).json({ message: `Produto ${req.params.id} excluído com sucesso` });
        } else {
            res.status(404).json({ message: `Produto ${req.params.id} não encontrado` });
        }
    })
})

export default routerAPI2;