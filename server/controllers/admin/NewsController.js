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

}
module.exports = NewsController