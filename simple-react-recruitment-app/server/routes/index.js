const express = require('express');
const router = express.Router();
const md5 = require('blueimp-md5')


const {UserModel,ChatModel} = require('../db/models')
const filter = {password: 0,__v:0}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',(req,res)=>{
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

router.post('/userUpdate',((req, res) =>{
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

router.get('/userInfo',(req,res) =>{
  const {userid} = req.cookies
  if(!userid){
    res.send({code:1,msg:'Please login first'})
  }else {
    UserModel.findOne({_id:userid},filter,(error,userDoc)=>{
      //I assume that database is consistent so skipped user checking
      res.send({code:0,data:userDoc})
    })
  }
})

router.get('/userList', (req,res) => {
  const {userType} = req.query
  UserModel.find({userType},filter, (err,users) => {
    res.send({code: 0,data: users})
  })
})

router.get('/messageList',(req,res) => {
  const userid = req.cookies.userid

  UserModel.find((err,userDocs) => {
    const users = {}
    userDocs.forEach(doc => {
      users[doc._id] = {username:doc.username, avatar: doc.avatar}
    })

    ChatModel.find({'$or': [{from:userid}, {to:userid},]},filter,(err,chatMessages) => {
      res.send({code:0,data:{users,chatMessages}})
    })
  })
})

router.post('/readMessage',(req,res) => {
  const from = req.body.from
  const to = req.cookies.userid
  ChatModel.updateMany({from,to,read: false},{read: true},{multi: true},(err,doc) => {
    res.send({code:0,data:doc.nModified})
  })
})

module.exports = router;