'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/palindrome/{phrase}',
    config: {
      description: 'Determines if palindrome',
      validate: {
        params: {
          phrase: Joi.string().regex(/^[^0-9]+$/).required()
        }
      },
      handler: function(request, reply){
        var isPalindrome = false;
        var word = request.params.phrase;
        var reverse = word.split('').reverse().join('');

        if(word === reverse){
          isPalindrome = true;
        }

        return reply({value: isPalindrome});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'math.palindrome'
};
