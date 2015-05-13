'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/leapyear/{year}',
    config: {
      description: 'Determines if leapyear',
      validate: {
        params: {
          year: Joi.number().min(1).required()
        }
      },
      handler: function(request, reply){
        var isLeap = false;
        var year = request.params.year;
        if(year % 4 === 0){
          if(year % 100 !== 0 || year % 400 === 0){
            isLeap = true;
          }
        }

        return reply({value: isLeap});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'math.leapyear'
};
