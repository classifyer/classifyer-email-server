# Classifyer Email Server

This server is used for sending emails from the [Classifyer](https://classifyer.app) app's contact form, hosted on Heroku.

# Server Setup

Follow these instructions:
  1. Create a file called `config.json` at the project root with the following content:
  ```json
  {
    "host": "your-mail-server-host",
    "port": 465,
    "secure": true,
    "auth": {
      "user": "your-user-name",
      "pass": "your-password"
    }
  }
  ```
  Keep in mind that if port number is anything other than `465`, then `secure` should be `false`.
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
