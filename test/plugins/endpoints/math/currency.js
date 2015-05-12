/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../../lib/server');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;
var before = lab.before;
var after = lab.after;

var server;

describe('GET /math/currency/{number}', function(){
  before(function(done){
    Server.init(function(err, srvr){
      if(err){ throw err; }
      server = srvr;
      done();
    });
  });

  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });
  it('should check if money', function(done){
    server.inject({method: 'GET', url: '/math/currency/1000', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('$1,000.00');
      done();
    });
  });
  it('should check if money', function(done){
    server.inject({method: 'GET', url: '/math/currency/1000000', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('$1,000,000.00');
      done();
    });
  });
  it('should check if money > 0', function(done){
    server.inject({method: 'GET', url: '/math/currency/-1000', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should check if money', function(done){
    server.inject({method: 'GET', url: '/math/currency/100', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('$100.00');
      done();
    });
  });
  it('should check if money', function(done){
    server.inject({method: 'GET', url: '/math/currency/1', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('$1.00');
      done();
    });
  });
  it('should check if money', function(done){
    server.inject({method: 'GET', url: '/math/currency/0', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('$0.00');
      done();
    });
  });
  it('should check if money', function(done){
    server.inject({method: 'GET', url: '/math/currency/9a9', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should check if money', function(done){
    server.inject({method: 'GET', url: '/math/currency/9.999', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
});
