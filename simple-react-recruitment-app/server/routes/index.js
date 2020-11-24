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

router.post('/update',((req, res) =>{
  const {userid} = req.cookies

  if(!userid){
    return res.send({code:1,msg:'Please login first'})
  }
  const userInfo = req.body
  UserModel.findByIdAndUpdate({_id:userid},userInfo,(err,prevUserDoc) =>{
    if(!prevUserDoc){
      res.clearCookie('userid')
      res.send({code:1,msg:'Could not update user information'})
    }else {
      const {_id,username,userType} = prevUserDoc
      const data = Object.assign(userInfo,{_id,username,userType})
      res.send({code:0,data})
    }
  })
}))

router.get('/getUserInfo',(req,res) =>{
  const {userid} = req.cookies
  console.log("adfasdfasdf")
  if(!userid){
    res.send({code:1,msg:'Please login first'})
  }else {
    UserModel.findOne({_id:userid},filter,(error,userDoc)=>{
      //I assume that database is consistent so skipped user checking
      res.send({code:0,data:userDoc})
    })
  }
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