let errorCode = require('./errorCode');
module.exports = function (response) {
  if(response.errorCode){
    return {
      "error": true,
      "message": errorCode[response.errorCode],
      "data": {},
      "errorCode": response.errorCode
    }
  }
  if(response.data){
    return {
      "error": false,
      "message": "",
      "data": response.data,
      "errorCode": ""
    }
  }
};
