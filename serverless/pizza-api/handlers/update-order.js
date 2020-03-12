function updateOrder(orderId, order) {

    if(!order || !orderId ) {
        throw new Error("Please provide a valid OrderId and Order to update.")
    }

    return {"message": "Order updated"};

}

module.exports = updateOrder