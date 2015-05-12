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

describe('GET /math/square num', function(){
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
  it('should square 3', function(done){
    server.inject({method: 'GET', url: '/math/square/3', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(9);
      done();
    });
  });
  it('should fail if not a num', function(done){
    server.inject({method: 'GET', url: '/math/square/a', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should fail if invalid character', function(done){
    server.inject({method: 'GET', url: '/math/square/;', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should return zero if num is zero', function(done){
    server.inject({method: 'GET', url: '/math/square/0', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(0);
      done();
    });
  });
});
