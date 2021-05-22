const axios = require("axios");

exports.getPosts = function(route) {
  return new Promise(function(resolve, reject) {
    if (axios.get(route)) {
      const data = axios.get(route);
      return resolve(data);
    } else {
      console.log("error");
      return reject();
    }
  });
};
/*
  Vue does not support promises, so in order to use them one must create a regular
JS module with the intended function and then export it for it to be used in the Vue application proper.
*/