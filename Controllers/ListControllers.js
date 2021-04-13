const dbconfig = require("../utils/dbconfig")
//获取新闻列表
getNewsList = (req, res) => {
    let sql = `select * from newslist`
    let sqlArr = []
    let callBack = (err, data) => {
        if (err) {
            res.send({
                code: '400',
                msg: '出错了'
            })
        }
        else {
            res.send({
                code: '200',
                data: data
            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//根据类型获取新闻列表
getNewsIdList = (req, res) => {
    let {id} = req.body
    let sql = `select * from newslist where news_class_id=? and status=2`
    let sqlArr = [id]
    let callBack = (err, data) => {
        if (err) {
            res.send({
                code: '400',
                msg: '出错了'
            })
        }
        else {
            if(data.length){
                res.send({
                    code: '200',
                    data: data
                })
            }
            else if(data.length==0){
                res.send({
                    code: '200',
                    data: data
                })
            }
            else{
                res.send({
                    code: '300',
                    data: '参数错误'
                })
            }
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//添加新闻
saveNewsList = async (req, res) => {
    let { new_title, type, new_content, user_id, news_class_id } = req.body
    let sql = `insert into newslist(new_title,new_author,type,new_content,create_time,status,user_id,news_class_id,news_class_name) value(?,?,?,?,?,?,?,?,?)`
    let new_author = await chaIdName(user_id)
    if (new_author == 0) {
        res.send({
            'code': 500,
            'msg': '用户id错误'
        })
        return false
    }
    let news_class_name = await chaClssName(news_class_id)
    let sqlArr = [new_title, new_author, type, new_content, (new Date().valueOf()), '0', user_id, news_class_id, news_class_name]
    let callBack = (err, data) => {
        if (err) {
            console.log(err)
            return 
        }
        else {
            if (data.affectedRows == 1) {
                res.send({
                    'code': 200,
                    'msg': '添加成功'
                })
            }
            else {
                res.send({
                    'code': 300,
                    'msg': '添加失败'
                })
            }
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//根据id 查询分类名称
let chaClssName = async (id) => {
    let sql = `select news_class_name from newsclass where id=?`
    let sqlArr = [id]
    let res = await dbconfig.SySqlConnect(sql, sqlArr)
    if (res.length) {
        return res[0].news_class_name
    }
    else {
        return '0'
    }
}

//删除新闻
deleNewsMod = (req, res) => {
    let { id } = req.body
    let sql = `delete from newslist where id=?`
    let sqlArr = [id]
    let callBack = (err, data) => {
        if (err) {
            return
        }
        else {
            if (data.affectedRows == 1) {
                res.send({
                    'code': 200,
                    'msg': '删除成功'
                })
            }
            else {
                res.send({
                    'code': 300,
                    'msg': '删除失败'
                })
            }
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//修改新闻
editNewsMsg = async (req, res) => {
    let { new_title, type, new_content, id, new_class_id } = req.body
    let news_class_name = await chaClssName(new_class_id)
    console.log(news_class_name)
    let sql = `update newslist set new_title=?,type=?,new_content=?,news_class_id=?,news_class_name=? where id=?`
    let sqlArr = [new_title, type, new_content, new_class_id, news_class_name, id]
    let callBack = (err, data) => {
        if (err) {
            return
        }
        else {
            if (data.affectedRows == 1) {
                res.send({
                    'code': 200,
                    'msg': '修改成功'
                })
            }
            else {
                res.send({
                    'code': 300,
                    'msg': '修改失败'
                })
            }
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//查询新闻
queryNewsMsg = (req, res) => {
    let { id } = req.body
    let sql = `select * from newslist where id=?`
    let sqlArr = [id]
    let callBack = (err, data) => {
        if (err) {
            return
        }
        else {
            if (data.length) {
                res.send({
                    'code': 200,
                    'data': data[0]
                })
            }
            else {
                res.send({
                    'code': 300,
                    'data': data[0],
                    'msg': '无数据'
                })
            }
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}


//修改状态
editNewsStatus = (req, res) => {
    let { id, status } = req.body
    let sql = `update newslist set status=? where id=?`
    let sqlArr = [status, id]
    let callBack = (err, data) => {
        if (err) {
            return
        }
        else {
            if (data.affectedRows == 1) {
                res.send({
                    'code': 200,
                    'msg': '成功'
                })
            }
            else {
                res.send({
                    'code': 300,
                    'msg': '失败'
                })
            }
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//获取用户名
let chaIdName = async (id) => {
    let sql = `select username from userinfo where user_id=?`
    let sqlArr = [id]
    let res = await dbconfig.SySqlConnect(sql, sqlArr)
    if (res.length) {
        return res[0].username
    }
    else {
        return '0'
    }
}

//获取分类列表
getClassList = (req, res) => {
    let sql = `select * from newsclass`
    let sqlArr = []
    let callBack = (err, data) => {
        if (err) {
            return
        }
        else {
            if (data.length) {
                res.send({
                    'code': 200,
                    'data': data
                })
            }
            else if (data.length == 0) {
                res.send({
                    'code': 200,
                    'data': data
                })
            }
            else {
                res.send({
                    'code': 300,
                    'msg': '失败'
                })
            }
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//添加分类
saveClassList = async (req, res) => {
    let { news_class_name, news_content, user_id } = req.body
    let sql = `insert into newsclass (news_class_name,news_content,user_id,username,create_time) value (?,?,?,?,?)`
    let username = await chaIdName(user_id)
    if (username == 0) {
        res.send({
            'code': 500,
            'msg': '用户id错误'
        })
        return false
    }
    let sqlArr = [news_class_name, news_content, user_id, username, (new Date().valueOf())]
    let callBack = (err, data) => {
        if (err) {
            return
        }
        else {
            if (data.affectedRows == 1) {
                res.send({
                    'code': 200,
                    'msg': '添加成功'
                })
            }
            else {
                res.send({
                    'code': 300,
                    'msg': '添加失败'
                })
            }

        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//删除分类
deleClassItem = (req, res) => {
    let { id } = req.body
    let sql = `delete from newsclass where id=?`
    let sqlArr = [id]
    let callBack = (err, data) => {
        if (err) {
            res.send({
                'code': 500,
                'msg': err
            })
            return
        }
        else {
            if (data.affectedRows == 1) {
                res.send({
                    'code': 200,
                    'msg': '删除成功'
                })
            }
            else {
                res.send({
                    'code': 300,
                    'msg': '删除失败'
                })
            }

        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}
module.exports = {
    getNewsList,
    saveNewsList,
    deleNewsMod,
    editNewsMsg,
    queryNewsMsg,
    editNewsStatus,
    getClassList,
    saveClassList,
    deleClassItem,
    getNewsIdList
}