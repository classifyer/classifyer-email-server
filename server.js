const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 8080;

// Enable JSON body parser
app.use(bodyParser.json());
// Enable CORS
app.use(cors({ origin: (origin, cb) => {

  try {

    const url = new URL(origin);

    // Frontend origin allowed
    if ( url.origin === process.env.FRONTEND_ORIGIN ) cb(null, true);
    // Localhost with any port allowed
    else if ( url.hostname === 'localhost' ) cb(null, true);
    // Other origins are denied
    else cb(new Error('Origin not allowed by CORS.'));

  }
  catch (error) {

    cb(new Error('Invalid origin!'));

  }

}}));

// Define route /send
app.post('/send', (req, res) => {

  // Check body
  if (
    ! req.body ||
    ! req.body.name || typeof req.body.name !== 'string' || ! req.body.name.trim() ||
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
  .createTransport({
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT,
    secure: +process.env.MAIL_PORT === 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })
  .sendMail({
    from: `"Classifyer Contact Form" <${process.env.MAIL_FROM}>`,
    to: process.env.MAIL_TO,
    subject: req.body.subject,
    text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nCategory: ${req.body.category}\nDate and Time: ${new Date(req.body.time)}\nTimestamp: ${req.body.time}\nMessage:\n\n${req.body.message}`
  }, (error, info) => {

    // Error handling
    if ( error ) return res.status(500).json({
      error: true,
      code: error.code,
      message: error.message
    });

    // Success
    if ( info.accepted && info.accepted.includes(process.env.MAIL_TO) ) {

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
