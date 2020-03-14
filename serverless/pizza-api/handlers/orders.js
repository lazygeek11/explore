const AWS = require('aws-sdk')
const ddbClient = new AWS.DynamoDB.DocumentClient()
const uuid = require('uuid/v4')


function createOrder(request) {
    if(!request || !request.pizza || !request.address) {
        throw new Error('Invalid Pizza Order. Please specify a pizza and a valid address')
    }

    return ddbClient.put({
        TableName: 'orders',
        Item: {
            orderId: uuid(),
            pizza: request.pizza,
            address: request.address,
            orderStatus: 'Pending'
        }
    }).promise()
    .then ((res) => {
        console.log('Order saved', res)
        return res
    })
    .catch((error) => {
        console.log('Order failed', error)
        throw error
    })

}

module.exports = createOrder 