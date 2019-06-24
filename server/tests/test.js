var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();
var expect = chai.expect();
var assert = chai.assert;

chai.use(chaiHttp);

describe('Routes', function() {
    let randomItemNumber = Math.floor(Math.random() * 1000);
    
    it('should redirect to homepage the root route', function(done) {
        chai.request('http://localhost:9000')
            .get('/')
            .end(function(err, res){                
                res.should.have.status(200);
                res.should.be.json;
                assert.equal('Romania Map',res.body.result, 'Homepage message not correct');
                done();
            });
    });
    

    it('should list all regions on /regions GET', function(done) {
        chai.request('http://localhost:9000')
            .get('/regions')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.result.should.be.a('array');
                done();
            });
    });

    it('should list all cities on /cities GET', function(done) {
        chai.request('http://localhost:9000')
            .get('/cities')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.result.should.be.a('array');
                done();
            });
    });

    it('should list all cities of a region on /cities_by_region GET', function(done) {
        let region = "West";
        chai.request('http://localhost:9000')
            .get('/cities_by_region?region=' + region)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.result.should.be.a('array');
                done();
            });
    });

    it('should list an empty array when invalid region sent as parameter on /cities_by_region GET', function(done) {
        let region = "wwwabc";
        chai.request('http://localhost:9000')
            .get('/cities_by_region?region=' + region)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.result.should.be.a('array');
                assert.equal(0,res.body.result.length, 'AN invalid region should return an empty array.');
                done();
            });
    });

    it('should add a new region on /add_region POST', function(done) {
        let test_region = "test_region"+randomItemNumber;
        chai.request('http://localhost:9000')
            .get('/regions')
            .end(function(err, res){
                let initialNumberOfRegions = res.body.result.length;
                chai.request('http://localhost:9000')
                    .post('/add_region')
                    .send({ "region" : test_region })
                    .end(function(err, res){
                        let afterInsertNumberOfRegions = res.body.result.length;
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.result.should.be.a('array');
                        assert.equal(
                            initialNumberOfRegions + 1,
                            afterInsertNumberOfRegions, 
                            'The initial number of regions should increment with an unit after new region added.'
                        );
                        assert.equal(
                            res.body.result[res.body.result.length - 1].name,
                            test_region, 
                            'The last added region should be the one inserted.'
                        );
                        done();
                    });    
            });
    });

    it('should add a new city on /add_city POST', function(done) {
        let test_city = "test_city"+randomItemNumber;
        let test_region = "West";
        chai.request('http://localhost:9000')
            .get('/cities_by_region?region=' + test_region)
            .end(function(err, res){
                let initialNumberOfCities = res.body.result.length;
                chai.request('http://localhost:9000')
                    .post('/add_city')
                    .send({ 
                        "region" : test_region,
                        "city" : test_city 
                    })
                    .end(function(err, res){
                        let afterInsertNumberOfCities = res.body.result.length;
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.result.should.be.a('array');
                        assert.equal(
                            initialNumberOfCities + 1,
                            afterInsertNumberOfCities, 
                            'The initial number of cities should increment with an unit after new city added.'
                        );
                        assert.equal(
                            res.body.result[res.body.result.length - 1],
                            test_city, 
                            'The last added city should be the one inserted.'
                        );
                        done();
                    }); 
            });
    });

});