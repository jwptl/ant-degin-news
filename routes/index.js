var express = require('express');

var router = express.Router();

var List = require('../Controllers/ListControllers.js')
/* GET home page. */
router.post('/getNewsList', List.getNewsList);

router.post('/saveNewsList', List.saveNewsList);

router.post('/deleNewsMod', List.deleNewsMod);

router.post('/editNewsMsg', List.editNewsMsg);

router.post('/queryNewsMsg', List.queryNewsMsg);

router.post('/editNewsStatus', List.editNewsStatus);

router.post('/getClassList', List.getClassList);

router.post('/saveClassList', List.saveClassList);

router.post('/deleClassItem', List.deleClassItem);

router.post('/getNewsIdList', List.getNewsIdList);

module.exports = router;
