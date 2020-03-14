const orders = require('./orders')

function createOrder(order) {

    if(!order || !order.pizza || !order.address) {
        throw new Error("Invalid Order.")
    }

    return orders(order)

}

module.exports = createOrder