require('dotenv').config({path: '.env'}); // this is important!
module.exports = {
  "development": {
    "username": process.env.PGUSERNAME,
    "password": process.env.PGPASSWORD,
    "database": process.env.PGDATABASE,
    "host": process.env.PGHOST,
    "dialect": "postgres"
  },
  "test": {
    "username": "labber",
    "password": "labber",
    "database": "collabapp",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "labber",
    "password": "labber",
    "database": "collabapp",
    "host": "localhost",
    "dialect": "postgres"
  }
}
