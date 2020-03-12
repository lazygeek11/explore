function createOrder(order) {

    if(!order || !order.pizzaId || !order.address) {
        throw new Error("Invalid Order.")
    }

    return {};

}

module.exports = createOrder