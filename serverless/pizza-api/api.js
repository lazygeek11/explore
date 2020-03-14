'use strict'

const Api = require('claudia-api-builder')
const api = new Api()

const getPizzas = require('./handlers/get-pizzas')
const createOrder = require('./handlers/create-order')
const updateOrder = require('./handlers/update-order')
const deleteOrder = require('./handlers/delete-order')
const getOrders = require('./handlers/get-orders')

api.get('/', () => 'Welcome to Pizza API')

api.get('/pizzas', () => {
    return getPizzas()
})

api.get('/pizzas/{id}', (request) => {
    return getPizzas(request.pathParams.id)
}, {
    error: 404
})

api.post('/order', (request) => {
    return createOrder(request.body)
}, {
    error: 400,
    success: 201
})

api.get('/orders', () => {
    return getOrders()
}, {
    success: 201,
    error: 404
})

api.get('/orders/{id}', (request) => {
    return getOrders(request.pathParams.id)
}, {
    success: 201,
    error: 404
})

api.put('/order/{id}', (request) => {
    return updateOrder(request.pathParams.id, request.body)
}, {
    success: 201,
    error: 404
})

api.delete('/order/{id}', (request) => {
    return deleteOrder(request.pathParams.id)
}, {
    success: 201,
    error: 404
})

module.exports = api