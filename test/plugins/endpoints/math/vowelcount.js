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

describe('GET /math/vowels word', function(){
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
    server.inject({method: 'GET', url: '/math/vowels/bonobo', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(3);
      done();
    });
  });
  it('should return 0', function(done){
    server.inject({method: 'GET', url: '/math/vowels/chyld', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(0);
      done();
    });
  });
  it('should return 5', function(done){
    server.inject({method: 'GET', url: '/math/vowels/bamoomoo', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(5);
      done();
    });
  });
  it('should return 400 error', function(done){
    server.inject({method: 'GET', url: '/math/vowels/7', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should return 400 error', function(done){
    server.inject({method: 'GET', url: '/math/vowels/@', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
});
