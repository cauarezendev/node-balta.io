'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const router = express.Router()

//Conecta ao banco
const connection = 'mongodb://cauabalta:caua170690@ds255451.mlab.com:55451/ndstr'
const parser = { useNewUrlParser: true }
mongoose.connect(connection, parser)

// Carraga os models
const Product = require('./models/product-models')

// Carrega as rotas
const index = require('./routes/index')
const product = require('./routes/product')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/products', product)


module.exports = app