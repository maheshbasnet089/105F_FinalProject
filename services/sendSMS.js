const twilio = require('twilio')("ACe15c932d2acd2854f39b80706ea476a5","47ea190c6dbc4b1feda9bd481bb0cff4")


async function sendSMS(){
   await twilio.messages.create({
        body : "Testing SMS in nodejs",
        to : "+977 9816366094",
        from : "+14092190183"
    })
    console.log("SMS sent")
}

module.exports = sendSMS