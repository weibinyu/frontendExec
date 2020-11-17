const express = require('express');
const router = express.Router();
const md5 = require('blueimp-md5')


const {UserModel} = require('../db/models')
const filter = {password: 0,__v:0}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',(req,res)=>{
  registerNewUserIfNotExist(req,res)
})

router.post('/login',(req,res)=>{
  const {username,password} = req.body
  UserModel.findOne({username,password:md5(password)},filter,(error,userDoc)=>{
    if(userDoc){
      res.cookie('userid',userDoc._id,{maxAge:1000*60*60*24})
      res.send({code:0,data:userDoc})
    }else {
      res.send({code:1,msg:'Username or password incorrect'})
    }
  })
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
          console.log(userDoc)
          res.cookie('userid', userDoc._id, {maxAge: 1000*60*60*24*7})
          res.send({code: 0, data: {_id: userDoc._id, username, userType}})
        })
    }
  })
}