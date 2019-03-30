const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const news = require('./app/news');
const comments = require('./app/comments');


const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const port = 8000;

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '06032013',
    database : 'exam_10'
});



app.use('/news', news(connection));
app.use('/comments', comments(connection));

connection.connect((err) =>{
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});