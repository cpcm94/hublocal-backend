# hublocal-backend

The frontend for this app can be found [here](https://github.com/cpcm94/hublocal-frontend).

## Setup

Install all required packages with the command `npm install`

## Heroku Postgres

This application uses the Heroku Addon [Heroku Postgres](https://www.heroku.com/postgres).

## Environment

This project uses the following environment variables:

| Variable          | Description                     |
| ----------------- | ------------------------------- |
| POSTGRES_HOST     | Your Postgres Database Host     |
| POSTGRES_DATABASE | Your Postgres Database Name     |
| POSTGRES_USER     | Your Postgres Database User     |
| POSTGRES_PORT     | Your Postgres Database Port     |
| POSTGRES_PASSWORD | Your Postgres Database Password |
| ENCONDE_TOKEN     | String to encode your JWTokens  |

If you dont intend on running the app locally you can just set them up on your heroku dashboard.

## Running locally

To run the app locally it is necessary to set the environment variables in a `.env` file with their respectives values and run the application with the command: `npm start`
