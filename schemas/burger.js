'use strict';

var schema = {
  burger_id: {
    errorMessage: 'burger_id must be a mongoID',
    isMongoId: function(id) {
      var ObjectId = require('mongoose').Types.ObjectId;
      return ObjectId.isValid(id);
    }
  }
};

module.exports = schema;
