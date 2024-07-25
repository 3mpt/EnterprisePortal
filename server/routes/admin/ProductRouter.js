var express = require('express');
const ProductController = require('../../controllers/admin/ProductController');

var ProductRouter = express.Router();
// 图片上传
const multer = require('multer');
const upload = multer({ dest: 'public/productuploads/' });
ProductRouter.post("/adminapi/product/add", upload.single("file"), ProductController.add)
ProductRouter.get("/adminapi/product/list", ProductController.getList)
ProductRouter.delete("/adminapi/product/list/:id", ProductController.delList)
ProductRouter.get("/adminapi/product/list/:id", ProductController.getList)
ProductRouter.post("/adminapi/product/list/", upload.single("file"),ProductController.updateList)

module.exports = ProductRouter;