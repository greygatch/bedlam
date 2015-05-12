'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/isogram/{word}',
    config: {
      description: 'Determines if isogram',
      validate: {
        params: {
          word: Joi.string().required()
        }
      },
      handler: function(request, reply){
        // var hasDuplicates = (/([a-z])\1/i).test(request.params.word);

        var repeats = [];
        var hasDuplicates;
        request.params.word.toLowerCase().split('').forEach(function(l){
          if(repeats.indexOf(l) !== -1){
            hasDuplicates = true;
          }
          repeats.push(l);
        });
        return reply({value: !hasDuplicates});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'math.isogram'
};
