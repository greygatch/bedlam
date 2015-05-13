'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/gcd/{num1}/{num2}',
    config: {
      description: 'Squares a num',
      validate: {
        params: {
          num1: Joi.number().required(),
          num2: Joi.number().required()
        }
      },
      handler: function(request, reply){
        var lowest = Math.min(Math.abs(request.params.num1), Math.abs(request.params.num2));
        var gcd = lowest;
        for(var i = lowest; i > 0; i--){
          if(request.params.num1 % i === 0 && request.params.num2 % i === 0){
            gcd = i;
            break;
          }
        }
        return reply({value: gcd});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'math.gcd'
};
