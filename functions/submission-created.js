console.log("triggered Woo")
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
        console.log(body.payload.email)
    } catch (e) {
        body = event.body
        console.log(e)
    }

    const bodyToPost = {
        email: body.payload.email
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
    .then(function(response){
      console.log(`status:${response.status}` )
      console.log(`data:${response.data}` )
      console.log(`headers:${response.headers}` )
  
      if (response.headers['content-type'] === 'application/x-www-form-urlencoded') {
        // Do redirect for non JS enabled browsers
        return callback(null, {
          statusCode: 302,
          headers: {
            Location: '/thanks.html',
            'Cache-Control': 'no-cache',
          },
          body: JSON.stringify({})
        });
      }
  
      // Return data to AJAX request
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({ emailAdded: true })
      })
    }).catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  };