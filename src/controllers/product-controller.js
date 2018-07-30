'use strict';

const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const validationContract = require('../validator/fluent-validator')
const repository = require('../repositores/product-repository')

exports.get = async(req, res, next) => {
    try {
        let data = await repository.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.getBySlug = async(req, res, next) => {
    try {
        let data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        let data = await repository.getBySlug(req.params.tag)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.getById = async(req, res, next) => {
    try {
        let data = await repository.getBySlug(req.params.id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.post = async(req, res, next) => {
    let contract = new validationContract()
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 3, 'O titulo deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'O titulo deve conter pelo menos 3 caracteres')

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        await repository.create(req.body)
        res.status(200).send({
            message: 'Produto cadastrado com sucesso'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar o produto'
        })
    }
}

exports.put = (req, res, next) => {
    try {
        await repository.update(req.params.id, req.params.body)
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao atualizar o produto'
        })
    }
}

exports.delete = (req, res, next) => {
    try {
        repository.delete(req.body.id)
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        })
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao remover produto',
            data: e
        })
    }
}

