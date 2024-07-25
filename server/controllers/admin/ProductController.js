const ProductService = require('../../services/admin/ProductService.js');
const JWT = require('../../util/JWT.js');

const ProductController = {
    add: async (req, res) => {
        const cover = req.file ? `/productuploads/${req.file.filename}` : ``
        const { title, introduction, detail } = req.body
        // console.log(req.body)
        await ProductService.add({
            title,
            introduction,
            detail,
            cover,
            editTime: new Date()
        })
        res.send({
            ActionType: "OK"
        })
    },
    getList: async (req, res) => {
        const _id = req.query.id
        const result = await ProductService.getList({ _id })
        res.send({
            ActionType: "OK",
            data: result
        })
    },
    delList: async (req, res) => {
        const _id = req.params.id
        await ProductService.delList({ _id })
        res.send({
            ActionType: "OK",
        })
    },
    updateList: async (req, res) => {

        const cover = req.file ? `/productuploads/${req.file.filename}` : ``
        const { title, introduction, detail, _id } = req.body
        await ProductService.updateList({ _id, title, introduction, detail, cover })
        res.send({
            ActionType: "OK",
        })
    },

}
module.exports = ProductController