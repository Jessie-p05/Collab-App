const { sequelize, User } = require('./models')
const PORT = process.env.PORT || 5000;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');



// //Databse
// const db = require('./config/database')

// // Test db

// db.authenticate()
//     .then(() => console.log('Connection to database has been established successfully.'))
//     .catch (error => console.log('Unable to connect to the database. Error:'+ error));


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CollabApp Routes
app.use('/users', require('./routes/users'));
app.use('/projects', require('./routes/projects'));
app.use('/', (req, res) => res.send("Hello World. This is the CollabApp"));



app.listen(PORT, async () => {
    console.log(`Server started on port, ${PORT}`);
    await sequelize.sync()
    console.log('database synced!')
});