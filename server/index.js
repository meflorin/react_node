'use strict';

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { router } = require('./routes/index');

dotenv.config();

const port = process.env.NODE_DEFAULT_PORT || 9000;

var app = express();
app.use(cors());
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Expose-Headers", "Access-Control-*");
  res.header("Access-Control-Allow-Headers", "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  next();
});
*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/', router);
app.use('/add_region', router);
app.use('/regions', router);
app.use('/cities', router);
app.use('/cities_by_region', router);
app.use('/add_city', router);

app.listen(port, function () {
  console.log("ENV -------> ", process.env.ENV);
  console.log(`Server listening on ${port}!`);
});

