'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/prime/{number}',
    config: {
      description: 'Determines if prime',
      validate: {
        params: {
          number: Joi.number().min(2).required()
        }
      },
      handler: function(request, reply){
        var num = request.params.number;
        var isPrime = true;
        for(var i = Math.ceil(num / 2); i > 1; i--){
          if(num % i === 0){
            isPrime = false;
          }
        }
        return reply({value: isPrime});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'math.prime'
};
