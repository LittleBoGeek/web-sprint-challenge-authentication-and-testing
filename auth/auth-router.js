const router = require('express').Router();
const bcrypt = require('bcryptjs') //import bcrypt to add password hashing functionality
const Users = require('../user/user-model.js')

const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config/secrets')

router.post('/register', (req, res) => {
  // implement registration 
  let user = req.body 
  const hash = bcrypt.hashSync(user.password, 10)

  user.password = hash
  Users.add(user)
  .then((saved) => {
    res.status(201).json(saved)
  }) .catch((error) => {
    res.status(500).json(error)
  })
});

router.post('/login', (req, res) => {
  // implement login

  let {username, password} = req.body
Users.findBy({username})
.first()
.then((user) => {
  

    if(user && bcrypt.compareSync(password, user.password)) {
    const token = generateToken(user)
    res.status(200).json({message:`welcome ${user.username}`, token, // send the token 
   })
  } else {
    res.status(500).json({message:'invalid credentials'})
  }
}) .catch((error) => {
  res.status(500).json(error)
})
});


function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    lat: Date.now()
  }
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, jwtSecret, options);
}
module.exports = router;
