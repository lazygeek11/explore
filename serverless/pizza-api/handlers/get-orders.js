const AWS = require('aws-sdk')
const ddbClient = new AWS.DynamoDB.DocumentClient()


function getOrders(orderId) {
    if (typeof orderId === 'undefined') {
        return ddbClient.scan({
            TableName: 'orders'
        }).promise()
            .then(result => result.Items)
    }

    return ddbClient.get({
        TableName: 'orders',
        Key: {
            orderId: orderId
        }
    }).promise()
        .then(result => result.Item)
}

module.exports = getOrders