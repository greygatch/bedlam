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

describe('GET /math/prime/num', function(){
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
  it('should return true', function(done){
    server.inject({method: 'GET', url: '/math/prime/7', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should return false', function(done){
    server.inject({method: 'GET', url: '/math/prime/8', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should return true', function(done){
    server.inject({method: 'GET', url: '/math/prime/3469', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should return false is less than 2', function(done){
    server.inject({method: 'GET', url: '/math/prime/1', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should return false if negative', function(done){
    server.inject({method: 'GET', url: '/math/prime/-7', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
});
