const NewsService = require('../../services/web/NewsService.js');


const NewsController = {
    getList: async (req, res) => {
        const result = await NewsService.getList({_id:req.params.id})
        res.send({
            ActionType: "OK",
            data: result
        })
    }


}
module.exports = NewsController