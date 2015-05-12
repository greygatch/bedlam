'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/currency/{number}',
    config: {
      description: 'Determines if isogram',
      validate: {
        params: {
          number: Joi.number().integer().min(0).required()
        }
      },
      handler: function(request, reply){
        var split = request.params.number.toString().split('');
        var money = ['$'];
        for(var i = split.length; i >= 0; i--){
          if(i % 3 === 0 && i !== 0 && i !== split.length){
            money.push(',');
          }
          money.push(split[split.length - i]);
        }
        money.push('.00');
        money = money.join('');
        return reply({value: money});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'math.currency'
};
