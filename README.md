# Classifyer Email Server

This server is used for sending emails from the [Classifyer](https://classifyer.app) app's contact form, hosted on Heroku.

# Server Setup

Follow these instructions:

  1. Configure the server by adding the following config variables (either through [Heroku dashboard](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard) or by running the [Heroku CLI config command](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-cli)):  
      - `MAIL_HOST`: Your mail server host
      - `MAIL_PORT`: Your mail server port
      - `MAIL_USER`: Your mail server username (usually your email)
      - `MAIL_PASS`: Your mail server password
      - `MAIL_FROM`: The sender email
      - `MAIL_TO`: The receiver email address
      - `FRONTEND_ORIGIN`: The frontend app origin to allow with CORS
  2. Create a Heroku account [here](https://signup.heroku.com/) and create a free instance.
  3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line).
  4. Run the following commands inside the project root:
  ```
  heroku login
  heroku git:remote -a classifyer-email-server
  git push heroku master
  ```
  5. Your server should be up and running!
  6. Don't forget to configure the [Classifyer web app](https://github.com/classifyer/classifyer-web).
