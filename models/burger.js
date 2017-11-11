'use strict';

var mongoose = require('mongoose');


var burgerSchema = mongoose.Schema({
  name: String,
  description: String,
  image_url: String,
  ingredients: [
    {
      name: String,
      description: String
    }
  ]
});


module.exports = mongoose.model("Burger", burgerSchema);
