const AWS = require('aws-sdk')
const ddbClient = new AWS.DynamoDB.DocumentClient()

function deleteOrder(orderId) {

    if (!orderId) {
        throw new Error("Please provide a valid OrderId.")
    }

    return ddbClient.delete({
        TableName: 'orders',
        Key: {
            orderId: orderId
        }
    }).promise()
        .then((result) => {
            console.log('Order deleted ', result)
            return result
        })
        .catch((error) => {
            console.log('Failed to delete order', error)
            throw error
        })

}

module.exports = deleteOrder