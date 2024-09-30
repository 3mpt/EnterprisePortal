var express = require('express');
const NewsController = require('../../controllers/web/NewsController');

var NewsRouter = express.Router();
// 图片上传

NewsRouter.get("/webapi/news/list", NewsController.getList)

module.exports = NewsRouter;