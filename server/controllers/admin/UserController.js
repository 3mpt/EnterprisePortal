const UserService = require('../../services/admin/UserService.js');
const JWT = require('../../util/JWT.js');

const UserController = {
    login: async (req, res) => {
        var result = await UserService.login(req.body)
        if (result.length === 0) {
            res.send({
                code: '-1',
                error: '用户名密码不匹配'
            })
        } else {
            // 生成token
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, '10s')
            res.header("Authorization", token)
            res.send({
                ActionType: 'OK',
                data: {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0, //0:保密 1:男 2:女
                    introduction: result[0].introduction, //个人简介
                    avatar: result[0].avatar,  //头像
                    role: result[0].role //用户角色 管理员1 编辑2
                }
            })
        }
    },
    upload: async (req, res) => {
        const { username, introduction, gender } = req.body
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
        const token = req.headers["authorization"].split(" ")[1]
        let payload = JWT.verify(token)
        await UserService.upload({ _id: payload._id, username, introduction, gender: Number(gender), avatar })
        if (avatar) {
            res.send({
                ActionType: 'OK',
                data: {
                    username,
                    gender: Number(gender),
                    introduction,
                    avatar
                }
            })
        } else {
            res.send({
                ActionType: 'OK',
                data: {
                    username,
                    gender: Number(gender),
                    introduction,

                }
            })
        }

    },
    add: async (req, res) => {
        const { username, password, introduction, gender, role } = req.body
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
        await UserService.add({ username, password, introduction, gender: Number(gender), avatar, role })
        res.send({
            ActionType: 'OK',
        })
    },
    list: async (req, res) => {
        const result = await UserService.list(req.params)
        res.send({
            ActionType: 'OK',
            data: result
        })

    },
    delList: async (req, res) => {
        const _id = req.params.id
        await UserService.delList({ _id })
        res.send({
            ActionType: 'OK',
        })
    },
    putList: async (req, res) => {
        
        await UserService.putList(req.body)
        res.send({
            ActionType: 'OK',
        })
    }
}
module.exports = UserController