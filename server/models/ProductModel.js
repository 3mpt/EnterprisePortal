const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// user模型 => user集合
const ProductType = {
    title: String,
    introduction: String,
    detail: String, 
    cover: String,  
    editTime: Date
}
const ProductModel = mongoose.model("Product", new Schema(ProductType))
module.exports = ProductModel;