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

describe('GET /math/area/h/w', function(){
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
  it('should have area of 4 is square has length of 2', function(done){
    server.inject({method: 'GET', url: '/math/area/2/2', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(4);
      done();
    });
  });
  it('should have area of 8 if height is 2 and width is 4', function(done){
    server.inject({method: 'GET', url: '/math/area/2/4', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(8);
      done();
    });
  });
  it('should fail if not a number', function(done){
    server.inject({method: 'GET', url: '/math/area/a/4', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should fail if either is <= 0', function(done){
    server.inject({method: 'GET', url: '/math/area/1/0', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
});
