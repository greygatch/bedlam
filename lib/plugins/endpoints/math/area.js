'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/area/{height}/{width}',
    config: {
      description: 'Returns area',
      validate: {
        params: {
          height: Joi.number().greater(0).required(),
          width: Joi.number().greater(0).required()
        }
      },
      handler: function(request, reply){
        return reply({value: (request.params.height * request.params.width)});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'math.area'
};
