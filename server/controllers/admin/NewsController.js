const NewsService = require('../../services/admin/NewsService.js');
const JWT = require('../../util/JWT.js');

const NewsController = {
    add: async (req, res) => {
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ``
        const { title, content, category, isPublish } = req.body
        // console.log(req.body)
        await NewsService.add({
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            cover,
            editTime: new Date()
        })
        res.send({
            ActionType: "OK"
        })
    },
    updateList: async (req, res) => {
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ``
        const { title, content, category, isPublish,_id } = req.body
        // console.log(req.body)
        await NewsService.updateList({
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            cover,
            editTime: new Date(),
            _id
        })
        res.send({
            ActionType: "OK"
        })
    },
    getList: async (req, res) => {
        const result = await NewsService.getList({_id:req.params.id})
        res.send({
            ActionType: "OK",
            data: result
        })
    },
    publish: async (req, res) => {
        await NewsService.publish({
            ...req.body,
          editTime: new Date()
        })
        res.send({
            ActionType: "OK",

        })
    },
    delList: async (req, res) => {
        const _id = req.params.id
        await NewsService.delList({ _id })
        res.send({
            ActionType: 'OK',
        })
    },


}
module.exports = NewsController