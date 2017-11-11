'use strict';

function are_all_params_valid(req_query) {
  var req_query_size = Object.keys(req_query).length;
  var valid_params = ['burger_name', 'per_page', 'page'];
  var valid_params_size = valid_params.length;
  var counter = 0;

  for (var i = 0; i < valid_params_size; i++) {
    if (valid_params[i] in req_query)
      counter += 1;
  }

  return counter != req_query_size;
}


module.exports = are_all_params_valid;
