# Classifyer Email Server

This server is used for sending emails from the [Classifyer](https://classifyer.app) app's contact form, hosted on Heroku.

# Server Setup

Follow these instructions:

  1. Clone this repository
  2. Run `npm install` to install all the dependencies
  3. Create a Heroku account [here](https://signup.heroku.com/) and create a free instance.
  4. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line).
  5. Run the following commands inside the project root:
      ```
      heroku login
      heroku git:remote -a classifyer-email-server
      ```
  6. Configure the server by adding the following config variables (either through [Heroku dashboard](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard) or by running the [Heroku CLI config command](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-cli)):  
      - `MAIL_HOST`: Your mail server host
      - `MAIL_PORT`: Your mail server port
      - `MAIL_USER`: Your mail server username (usually your email)
      - `MAIL_PASS`: Your mail server password
      - `MAIL_FROM`: The sender email
      - `MAIL_TO`: The receiver email address
      - `FRONTEND_ORIGIN`: The frontend app origin to allow with CORS
  7. Run `git push heroku master` to deploy the server. It should be up and running after a few seconds.
  8. Don't forget to add the email server's URL in the [Classifyer web app](https://github.com/classifyer/classifyer-web).

# API

This server creates the following RESTful API:
  - Endpoint: `/send`
  - Method: `POST`
  - Headers: `Content-Type: application/json`
  - Body:
      ```json
      {
        "name": "string",
        "email": "string",
        "reason": "string",
        "subject": "string",
        "time": "number",
        "message": "string"
      }
      ```
