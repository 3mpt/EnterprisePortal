const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// user模型 => user集合
const UserType = {
    username: String,
    password: String,
    gender: Number, //0:男 1:女
    introduction: String, //个人简介
    avatar: String,  //头像
    role: String //用户角色 管理员1 编辑2
}
const UserModel = mongoose.model("user", new Schema(UserType))
module.exports = UserModel;