const nodemailer = require('nodemailer')

exports.handler = function (event, context, callback) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true, // use TLS
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  const message = JSON.parse(event.body)

  transporter.sendMail(message, (error, info) => {
    if (error) {
      callback(error)
    } else {
      callback(null, {
        statusCode: 200,
        body: 'Message sent successfully',
      })
    }
  })
}
