const AWS = require('aws-sdk')
const ddbClient = new AWS.DynamoDB.DocumentClient()

function updateOrder(orderId, order) {

    if (!order || !orderId || !order.pizza || !order.address) {
        throw new Error("Please provide a valid OrderId and Order to update.")
    }

    return ddbClient.update({
        TableName: 'orders',
        Key: {
            orderId: orderId
        },
        UpdateExpression: 'set pizza= :p, address = :a',
        ExpressionAttributeValues: {
            ':p': order.pizza,
            ':a': order.address
        },

        ReturnValues: 'ALL_NEW'
    }).promise()
        .then((result) => {
            console.log('Order updated', result)
            return result.Attributes
        })
        .catch((error) => {
            console.log('Updating order failed', error)
            throw error
        })

}

module.exports = updateOrder