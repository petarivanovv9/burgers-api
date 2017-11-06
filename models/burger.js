var mongoose = require('mongoose');


var burgerSchema = mongoose.Schema({
  name: String,
  description: String,
  image_url: String,
  ingredients: [String],
});


module.exports = mongoose.model("Burger", burgerSchema);
