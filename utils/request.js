const request = require('request-promise');

const simpleRequest = async uri =>
  await request({ uri }).catch(err => console.log(err.statusCode));

module.exports = {
  simpleRequest
};
