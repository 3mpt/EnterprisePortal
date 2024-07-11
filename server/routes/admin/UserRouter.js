var express = require('express');
const UserController = require('../../controllers/admin/UserController');

var UserRouter = express.Router();
// 图片上传
const multer = require('multer');
const upload = multer({ dest: 'public/avataruploads/' });
UserRouter.post("/adminapi/user/login", UserController.login)
UserRouter.post("/adminapi/user/upload", upload.single("file"), UserController.upload)
UserRouter.post("/adminapi/user/add", upload.single("file"), UserController.add)
// 实现用户列表增删改查
UserRouter.get("/adminapi/user/list", UserController.list)
UserRouter.get("/adminapi/user/list/:id", UserController.list)
UserRouter.delete("/adminapi/user/list/:id", UserController.delList)
UserRouter.put("/adminapi/user/list/:id", UserController.putList)
// UserRouter.get("/adminapi/user/list", UserController.list)
// UserRouter.get("/adminapi/user/list", UserController.list)


module.exports = UserRouter;
