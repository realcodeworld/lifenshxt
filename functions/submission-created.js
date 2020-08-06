const axios = require('axios')
const { Body } = require('node-fetch')
require('dotenv').config();
console.log("triggered")
const EMAIL_TOKEN = process.env.TOKEN

exports.handler = function(event, context, callback) {

    let body = {}
    try {
        body = JSON.parse(event.body)
        console.log("success")
        console.log(body)

    } catch (e) {
        body = event.body
        console.log(e)
    }

    // Bail if email is missing
    if (!body.email) {
        console.log("missing email")
        return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
                error: 'missing email'
            })
        })
    }

    const bodyToPost = {
        email: body.email
    }

    console.log(bodyToPost)

    const url = 'https://api.buttondown.email/v1/subscribers'
    const options = {
        headers: {
        Authorization: `Token ${EMAIL_TOKEN}`,
        'Content-Type': 'application/json',
        }
    }

    return axios.post(url, bodyToPost, options)
    .then( data => {
            console.log(`Submitted to Buttondown: ${bodyToPost.email}`)
            callback(null, {
                statusCode: 200,
                body: data
            })
    })
    .catch ( error => {
        // Error 😨
        if (error.response) {
            console.log("data: " + error.response.data);
            console.log(error);
            console.log("status: " + error.response.status);
            callback(null, {
                statusCode: error.response.status,
                body: JSON.stringify(error.response.data)
            })
        } else if (error.request) {
            console.log(error.request);
            callback(null, {
                statusCode: 502,
                body: String(error.request)
            })
        } else {
            console.log('Error', error.message);
            callback(null, {
                statusCode: 500,
                body: String(error.message)
            })
        }
    })
}