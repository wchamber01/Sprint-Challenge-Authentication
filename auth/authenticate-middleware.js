const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secret.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        //console.log(decodedToken, "decodedToken line 11");
        //i.e: the token is not valid
        res.status(401).json({ message: "Must be an authorized user" });
      } else {
        req.user = decodedToken;
      }
      next();
    });
  } else {
    res.status(401).json({ message: "Must be an authorized user" });
  }
};
