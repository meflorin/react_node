'use strict';

const dotenv = require('dotenv');
var express = require('express');
var router = express.Router();
var fs = require('fs');

dotenv.config();

let dataFixtures = 'data/';
if (process.env.ENV == 'TEST') {
  dataFixtures = 'tests/data/';
}

router.get('/', function(req, res, next) {
  res.send(
    {
      "result" : "Romania Map"
    }
  );
});

/*
router.post('/create_region_file', function(req, res) {  
  fs.appendFile('data/regions/regions.json', '', function (err) {
    if (err) throw err;
    res.send('File is created successfully.');
  }); 
})
*/

router.post('/add_region', function(req, res) {
  fs.readFile(dataFixtures+'regions/regions.json', (err, data) => {
    if (err) throw err;
    let regions = JSON.parse(data);
    regions.push({'name': req.body.region});

    let dataRegions = JSON.stringify(regions, null, 2);

    fs.writeFile(dataFixtures+'regions/regions.json', dataRegions, (err) => {
      if (err) throw err;

      fs.readFile(dataFixtures+'cities/cities.json', (err, data) => {
        if (err) throw err;
    
        let result = JSON.parse(data);
        let tmp = {
          "region": req.body.region,
          "cities": []
        }
        result.region_cities.push(tmp);

        let dataCities = JSON.stringify(result, null, 2);
    
        fs.writeFile(dataFixtures+'cities/cities.json', dataCities, (err) => {
          if (err) throw err;
        });          
      })

      res.send(
        {
          "result" : regions
        }
      );
    });
  
  })
})

router.get('/regions', function(req, res) { 
  fs.readFile(dataFixtures+'regions/regions.json', (err, data) => {  
    if (err) throw err;
    let regions = JSON.parse(data);

    res.send(
      {
        "result" : regions
      }
    );
  });
})

router.get('/cities', function(req, res) { 
  fs.readFile(dataFixtures+'cities/cities.json', (err, data) => {
    if (err) throw err;
    let result = JSON.parse(data);

    res.send(
      {
        "result" : result.region_cities
      }
    );  
  });
})

router.get('/cities_by_region/:region?', function(req, res) {
  let region = req.query.region;
  
  fs.readFile(dataFixtures+'cities/cities.json', (err, data) => {
    if (err) throw err;
    let cities = [];
    let result = JSON.parse(data);
   
    for (let i in result.region_cities) {
      if (result.region_cities[i].region == region) {
        cities = result.region_cities[i].cities;
      }
    }

    res.send(
      {
        "result" : cities
      }
    );
  });
})

router.post('/add_city', function(req, res) {
  let region = req.body.region;
  let city = req.body.city;
  let cities = [];
  fs.readFile(dataFixtures+'cities/cities.json', (err, data) => {
    if (err) throw err;

    let result = JSON.parse(data);
    
    for (let i in result.region_cities) {
      if (result.region_cities[i].region == region) {
        result.region_cities[i].cities.push(city);
        cities = result.region_cities[i].cities;
        let dataCities = JSON.stringify(result, null, 2);

        fs.writeFile(dataFixtures+'cities/cities.json', dataCities, (err) => {
          if (err) throw err;
        });
      }
    }
    
    res.send(
      {
        "result" : cities
      }
    );
  })
})


module.exports = { router: router };