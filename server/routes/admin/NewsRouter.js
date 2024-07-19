var express = require('express');
const NewsController = require('../../controllers/admin/NewsController');

var NewsRouter = express.Router();
// 图片上传
const multer = require('multer');
const upload = multer({ dest: 'public/newsuploads/' });
NewsRouter.post("/adminapi/news/add", upload.single("file"), NewsController.add)
NewsRouter.post("/adminapi/news/list", upload.single("file"), NewsController.updateList)
NewsRouter.get("/adminapi/news/list", NewsController.getList)
NewsRouter.put("/adminapi/news/publish", NewsController.publish)
NewsRouter.delete("/adminapi/news/list/:id", NewsController.delList)
NewsRouter.get("/adminapi/news/list/:id", NewsController.getList)
module.exports = NewsRouter;