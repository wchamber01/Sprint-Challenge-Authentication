const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/dbConfig.js");

const { jwtSecret } = require("./secret.js");
const Users = require("./auth-model.js");

//for endpoints beginnings with /api
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 3);
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  //console.log(password, "password line 27");
  Users.findByUser(username)
    .first()
    .then(user => {
      //console.log(user, "user line 31");
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);

        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error" });
    });
});

/********** signToken **********/
function signToken(user) {
  const payload = {
    id: user.id,
    name: user.username
  };

  const options = {
    expiresIn: "8h"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
