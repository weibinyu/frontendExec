const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',(res,req)=>{
  registerNewUserIfNotExist(res,req)
})

module.exports = router;

function registerNewUserIfNotExist(res,req){

}