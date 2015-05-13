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

describe('GET /math/gcd/num1/num2', function(){
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
  it('should return 3', function(done){
    server.inject({method: 'GET', url: '/math/gcd/6/9', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(3);
      done();
    });
  });
  it('should return 15', function(done){
    server.inject({method: 'GET', url: '/math/gcd/30/15', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(15);
      done();
    });
  });
  it('should return 2', function(done){
    server.inject({method: 'GET', url: '/math/gcd/-4/6', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(2);
      done();
    });
  });
  it('should return 3', function(done){
    server.inject({method: 'GET', url: '/math/gcd/-6/-9', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(3);
      done();
    });
  });
  it('should return 1', function(done){
    server.inject({method: 'GET', url: '/math/gcd/7/13', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(1);
      done();
    });
  });
  it('should return 1', function(done){
    server.inject({method: 'GET', url: '/math/gcd/0/13', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(0);
      done();
    });
  });
  it('should return 1', function(done){
    server.inject({method: 'GET', url: '/math/gcd/13/0', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(0);
      done();
    });
  });
});
