'use strict'

const AWS = require('aws-sdk')
const ddbClient = new AWS.DynamoDB.DocumentClient()

module.exports = function updateOrderStatus(request) {
    if (!request.deliveryId || !request.status) {
        throw new Error("Delivery and status Id is required to update Order status")
    }

    return ddbClient.update({
        TableName: 'orders',
        Key: {
            orderId: request.deliveryId
        },
        AttributeUpdates: {
            orderStatus: {
                Action: 'PUT',
                Value: request.status
            }
        }
    }).promise()
        .then(() => {
            return {}
        })
}