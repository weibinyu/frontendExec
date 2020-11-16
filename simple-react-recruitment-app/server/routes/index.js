const express = require('express');
const router = express.Router();
const md5 = require('blueimp-md5')
const {UserModel} = require('../db/models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',(req,res)=>{
  registerNewUserIfNotExist(req,res)
})

module.exports = router;

function registerNewUserIfNotExist(req,res){
  const {username, password, userType} = req.body
  UserModel.findOne({username}, function (err, user) {
    if(user) {
      res.send({code: 1, msg: 'User already exists'})
    } else {
      new UserModel({
        username,
        password: md5(password),
        userType}).save(function (err, userDoc) {
          res.cookie('userid', userDoc._id, {maxAge: 1000*60*60*24*7})
          res.send({code: 0, data: {_id: userDoc._id, username, userType}})
        })
    }
  })
}