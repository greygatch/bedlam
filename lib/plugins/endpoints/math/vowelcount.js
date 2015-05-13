'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/vowels/{word}',
    config: {
      description: 'Squares a num',
      validate: {
        params: {
          word: Joi.string().alphanum().regex(/[^0-9]+$/).required()
        }
      },
      handler: function(request, reply){
        var vowels = 'aeiouAEIOU';
        var count = 0;
        var split = request.params.word.split('');
        split.forEach(function(e){
          if(vowels.indexOf(e) !== -1){
            count++;
          }
        });

        return reply({value: count});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'math.vowel'
};
