'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ValidationContract = require('../validator/fluent-validator')

exports.get = async() => {
    // O find manda um array, e o findOne manda um objeto simples
    const res = await Product.find({
        active: true
    }, 'title price slug')
    return res
}

exports.getBySlug = async(slug) => {
    const res = await Product.findOne({
        slug: slug,
        active: true
    }, 'title description price slug tags')

    return res
}

exports.getByTag = async(tag) => {
    const res = await Product.find({
        tags: tag,
        active: true
    }, 'title description price slug tags')

    return res
}

exports.getById = (id) => {
    return Product.findById(id)
}

exports.create = async(data) => {
    let product = new Product(data)
    await product.save()
}

exports.update = async(id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                slug: data.slug,
                price: data.price
            }
        })
}
    
exports.delete = async(id) => {
    await Product.findOneAndRemove(id)
}