var jwt = require('jsonwebtoken');
let response = require('./response');

module.exports = function(req,res,next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // console.log(req.body.token);
    // console.log(req.query.token);
    // console.log(req.headers['x-access-token']);
    if (token) {
    // verifies secret and checks exp
        jwt.verify(token, global.config.jwt_secret, function(err, decoded) {
            if (err) { //failed verification.
                return res.json(response({"errorCode":"001"}));
            }
            req.decoded = decoded;
            next(); //no error, proceed
        });
    } else {
      console.log(errorCode);
        // forbidden without token
        return res.status(403).send(response({"errorCode":"001"}));
    }
}
