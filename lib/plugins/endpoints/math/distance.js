'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/distance/{coord1}/{coord2}/{coord3}/{coord4}',
    config: {
      description: 'Finds distance between two points',
      validate: {
        params: {
          coord1: Joi.array().length(2).required(),
          coord2: Joi.array().length(2).required(),
          coord3: Joi.array().length(2).required(),
          coord4: Joi.array().length(2).required()
        }
      },
      handler: function(request, reply){
        var c = request.params;
        var xdist1 = Math.pow((c.coord2[0] - c.coord1[0]), 2);
        var ydist1 = Math.pow((c.coord2[1] - c.coord1[1]), 2);
        var xdist2 = Math.pow((c.coord3[0] - c.coord2[0]), 2);
        var ydist2 = Math.pow((c.coord3[1] - c.coord2[1]), 2);
        var xdist3 = Math.pow((c.coord4[0] - c.coord3[0]), 2);
        var ydist3 = Math.pow((c.coord4[1] - c.coord3[1]), 2);

        var distance = Math.sqrt(xdist1 + ydist1) + Math.sqrt(xdist2 + ydist2) + Math.sqrt(xdist3 + ydist3);
        distance = parseFloat(distance.toFixed(2));
        return reply({value: distance});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'math.distance'
};
