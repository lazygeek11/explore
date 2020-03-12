function deleteOrder(orderId) {

    if(!orderId ) {
        throw new Error("Please provide a valid OrderId.")
    }

    return {"message": "Order deleted"};

}

module.exports = deleteOrder