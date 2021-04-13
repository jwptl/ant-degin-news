var express = require('express');

var router = express.Router();

var Users = require('../Controllers/UserControllers.js')

/* GET users listing. */
router.post('/sendCode', Users.sendCode);

router.post('/signUser', Users.signUser);

router.post('/login', Users.login);

router.post('/editUserInfo', Users.editUserInfo);

router.post('/getUserInfoCms', Users.getUserInfoCms);

router.post('/valita',(req,res)=>{
    console.log(req.headers.authorization)
})

router.post('/forgetPasswd',Users.forgetPasswd)

router.post('/getUserList',Users.getUserList)

router.post('/getUserInfoList',Users.getUserInfoList)

router.post('/addUserItem',Users.addUserItem)

router.post('/deleUserItem',Users.deleUserItem)

router.post('/editUserState',Users.editUserState)

module.exports = router;
