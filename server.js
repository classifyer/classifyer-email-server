const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config.json');
const PORT = process.env.PORT || 8080;

// Enable JSON body parser
app.use(bodyParser.json());
// Enable CORS
app.use(cors({ origin: ['http://localhost', 'https://classifyer.app'] }));

// Define route /send
app.post('/send', (req, res) => {

  // Check body
  if (
    ! req.body ||
    ! req.body.email || typeof req.body.email !== 'string' || ! req.body.email.trim() ||
    ! req.body.subject || typeof req.body.subject !== 'string' || ! req.body.subject.trim() ||
    ! req.body.category || typeof req.body.category !== 'string' || ! req.body.category.trim() ||
    ! req.body.message || typeof req.body.message !== 'string' || ! req.body.message.trim() ||
    ! req.body.time || typeof req.body.time !== 'number'
  ) {

    return res.status(400).json({
      error: true,
      code: 'INVALID_INPUT',
      message: 'The body is invalid or missing properties!'
    });

  }

  // Send email
  nodemailer
  .createTransport(config)
  .sendMail({
    from: '"Classifyer Contact Form" <ramtin@chiselpowered.com>',
    to: 'classifyerapp@gmail.com',
    subject: req.body.subject,
    text: `Email: ${req.body.email}\nCategory: ${req.body.category}\nDate and Time: ${new Date(req.body.time)}\nTimestamp: ${req.body.time}\nMessage:\n\n${req.body.message}`
  }, (error, info) => {

    // Error handling
    if ( error ) return res.status(500).json({
      error: true,
      code: error.code,
      message: error.message
    });

    // Success
    if ( info.accepted && info.accepted.includes('classifyerapp@gmail.com') ) {

      res.status(200).json({
        ok: true
      });

    }
    // Fail
    else {

      res.status(400).json({
        error: true,
        code: 'EMAIL_FAILED',
        message: 'Mail server did not accept the recipient: ' + info.res
      });

    }

  });

});

// Start the server
app.listen(PORT, () => {

  console.log(`Server started on port ${PORT}...`);

});
