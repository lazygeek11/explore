const AWSXray = require('aws-xray-sdk-core')
const AWS = AWSXray.captureAWS(require('aws-sdk'))
const ddbClient = new AWS.DynamoDB.DocumentClient()
const rp = require('minimal-request-promise')


function createOrder(request) {
    if(!request || !request.pizza || !request.address) {
        throw new Error('Invalid Pizza Order. Please specify a pizza and a valid address')
    }

    return rp.post('https://some-like-it-hot.effortless-serverless.com/delivery', {
        headers: {
            "Authorization": "My-auth-1234567",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            pickupTime: '15:30pm',
            pickupAddress: "My store address",
            deliveryAddress: request.address,
            webhookUrl: 'https://a0pxdocmr2.execute-api.us-east-1.amazonaws.com/latest/delivery'
        })
    }).then(rawResponse => JSON.parse(rawResponse.body))
    .then(response => {
        return ddbClient.put({
            TableName: 'orders',
            Item: {
                orderId: response.deliveryId,
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

    })

   

}

module.exports = createOrder 