'use strict';

require("dotenv").config();

const express = require('express');
const connection = require("./model/db.js");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));

app.get('/animal', async (req, res) => {
   connection.query(
           "SELECT * FROM animal",
       (err, results, fields) => {
       console.log(results);
       console.log(fields);
       res.json(results);
   }
   )
});

app.get('/animal', async (req, res) => {
   console.log(req.query);
   //res.send(`query params? ${req.query}`);
    try{
        const [results] = await connection.query(
            'SELECT * FROM animal WHERE name LIKE ?',
            [req.query.name]);
        res.json[results];
    }catch (e) {
        res.send(`dp error ${e}`);
    }
});

app.post('/animal', bodyParser.urlencoded({extended:true}), async (req, res) => {
    console.log(req.body);
    //res.send('will do asap');
    try {
        const [result] = await connection.query(
            'INSERT INTO animal (name) VALUES (?)',
            [req.body.name]
        );
        res.json(result);
    }catch (e) {
        console.log(e);
        res.send('dp-error');
    }
});

app.get('/', (req, res) => {
    res.send('Hello from my Node server');
});

app.get('/demo', (req, res) =>{
    console.log("request", req);
    res.send('demo');
});


app.listen(3000, () =>{
    console.log('server app start?');
});