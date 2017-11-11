'use strict';

var schema = {
  burger_name: {
    errorMessage: 'Must have a value and if you are using multiple words use underscores to separate',
    optional: true,
    notEmpty: true
  },
  page: {
    errorMessage: 'Must be a number greater than 0',
    optional: true,
    isInt: { options: { min: 1 } }
  },
  per_page: {
    errorMessage: 'Must be a number greater than 0 and less than 80',
    optional: true,
    isInt: { options: { min: 1, max: 80 } }
  }
};

module.exports = schema
