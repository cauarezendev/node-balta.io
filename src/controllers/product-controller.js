'use strict';

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = (req, res, next) => {
    // O find manda um array, e o findOne manda um objeto simples
    Product.findOne({
        active: true
    }, 'title price slug')
    .then(
        data => {
            res.status(200).send(data)
    }).catch(error => {
        res.status(400).send(e)
    })
}

exports.getBySlug = (req, res, next) => {
    Product.find({
        slug: req.params.slug,
        active: true
    }, 'title description price slug tags')
    .then(
        data => {
            res.status(200).send(data)
    }).catch(error => {
        res.status(400).send(e)
    })
}

exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true
    }, 'title description price slug tags')
    .then(
        data => {
            res.status(200).send(data)
    }).catch(error => {
        res.status(400).send(e)
    })
}

exports.getById = (req, res, next) => {
    Product.findById(req.params.id)
    .then(
        data => {
            res.status(200).send(data)
    }).catch(error => {
        res.status(400).send(e)
    })
}

exports.post = (req, res, next) => {
    let product = new Product(req.body)
    product
        .save()
        .then(
            json => {
                res.status(201).send(
                    { message: 'Produto cadastrado com sucesso!'
                })
            }
        ).catch(error => {
            res.status(400).send({ 
                message: 'Falha ao cadastro o produto!',
                data: error
            })
        })
}

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            }
        }).then(json => {
            res.status(200).send({
                message: 'Produto atualizado com sucesso!'
            })
        }).catch(error => {
            res.status(400).send({
                message: 'Falha ao atualizar produto',
                data: e
            })
        })
}

exports.delete = (req, res, next) => {
    res.status(201).send(req.body)
}