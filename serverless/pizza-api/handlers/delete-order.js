const AWS = require('aws-sdk')
const ddbClient = new AWS.DynamoDB.DocumentClient()
const rp = require('minimal-request-promise')

function deleteOrder(orderId) {

    if (!orderId) {
        throw new Error("Please provide a valid OrderId.")
    }

    return ddbClient.get({
        TableName: 'orders',
        Key: {
            orderId: orderId
        }
    }).promise()
        .then(result => result.Item)
        .then(item => {
            if (item.orderStatus !== 'pending') {
                throw new Error('Order status is not Pending.')
            }

            return rp.delete(`https://some-like-it-hot.effortless-serverless.com/delivery/${orderId}`, {
                headers: {
                    "Authorization": "My-auth-1234567",
                    "Content-type": "application/json"
                }
            })
        })
        .then(() => {
            ddbClient.delete({
                TableName: 'orders',
                Key: {
                    orderId: orderId
                }
            }).promise()
        })

}

module.exports = deleteOrder