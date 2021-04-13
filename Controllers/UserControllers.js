const dbconfig = require("../utils/dbconfig")
const userToken = require("../utils/token")
var phoneList = []
let sendphone = (phone) => {
    for (var item of phoneList) {
        if (phone == item.phone) {
            return true
        }
    }
    return false
}

//发送验证码
sendCode = (req, res) => {
    let phone = req.body.phone
    let code = '8888'
    if (phone) {
        if (sendphone(phone)) {
            res.send({
                'code': 300,
                'msg': '请60秒后再试'
            })
        }
        else {
            phoneList.push({
                'phone': phone,
                'code': '8888'
            })
            res.send({
                'code': 200,
                'msg': '验证码8888'
            })
        }
    }
    else {
        res.send({
            'code': 300,
            'msg': '手机号不能为空'
        })
    }

}
//验证手机号和密码
let valiadPhoneCode = (phone, code) => {
    for (var item of phoneList) {
        if (phone == item.phone && code == item.code) {
            return true
        }
    }
    return false
}

let selectPhone = async (phone) => {
    let sql = `select * from users where phone=?`
    let sqlArr = [phone]
    let res = await dbconfig.SySqlConnect(sql, sqlArr)
    if (res.length) {
        return true
    }
    return false
}

let selectUsername = async (username) => {
    let sql = `select * from users where username=?`
    let sqlArr = [username]
    let res = await dbconfig.SySqlConnect(sql, sqlArr)
    if (res.length) {
        return true
    }
    return false
}

//注册
signUser = async (req, res) => {
    let { phone, code, username, password } = req.body
    //验证手机验证码
    if (valiadPhoneCode(phone, code)) {
        //验证手机号是否存在
        let result = await selectPhone(phone)
        if (result) {
            res.send({
                'code': 300,
                'msg': '手机号已存在'
            })
            return
        }
        let msg = await selectUsername(username)
        if (msg) {
            res.send({
                'code': 300,
                'msg': '用户名已存在'
            })
            return
        }
        let sql = `insert into users(phone,username,password,create_time,status) value(?,?,?,?,?)`
        let sqlArr = [phone, username, password, (new Date().valueOf()), 0]
        var callBack = async (err, data) => {
            if (err) {
                res.send({
                    'code': 500,
                    'msg': '出错了'
                })
            }
            else {
                if (data.affectedRows == 1) {
                    res.send({
                        'code': 200,
                        'msg': '注册成功'
                    })
                }
                else {
                    res.send({
                        'code': 300,
                        'msg': '注册失败'
                    })
                }
            }
        }
        dbconfig.sqlConnect(sql, sqlArr, callBack)
    }
    else {
        res.send({
            'code': 300,
            'msg': '验证码不正确'
        })
    }
}

//登录
login = (req, res) => {
    let { username, password } = req.body
    let sql = `select * from users  where (username=? or phone=?) and password=?`
    let sqlArr = [username, username, password]
    var callBack = async (err, data) => {
        if (err) {
            res.send({
                'code': 500,
                'msg': '出错了'
            })
        }
        else if (data == "") {
            res.send({
                'code': 300,
                'msg': '账号或密码错误'
            })
        }
        else {
            let result = await loginBind(data[0].id, data[0].username, data[0].create_time, data[0].phone)
            let token = await userToken.setToken(data[0].id)
            result[0].token = token
            res.send({
                'code': 200,
                'msg': '登录成功',
                'data': result[0]
            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//检测是否第一次登录
let loginBind = async (id, username, create_itme, phone) => {
    let sql = 'select * from userinfo where username =? or phone=?'
    let sqlArr = [username, phone]
    let res = await dbconfig.SySqlConnect(sql, sqlArr)
    if (res.length) {
        return res
    }
    else {
        let res = await createUerInfo(id, username, create_itme, phone)
        let result = await loginStatus(id)
        return res
    }
}

//登录 启动用户状态
let loginStatus = async (id) => {
    let sql = `update users set status=? where id=?`
    let sqlArr = ["1", id]
    let res = await dbconfig.SySqlConnect(sql, sqlArr)
    return res
}

//新建关联表
let createUerInfo = async (id, username, create_itme, phone) => {
    let sql = `insert into userinfo(user_id,username,user_pic,user_desc,create_itme,phone) values(?,?,?,?,?,?)`
    let sqlArr = [id, username, 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4255886855,218583982&fm=111&gp=0.jpg', '', create_itme, phone]
    let res = await dbconfig.SySqlConnect(sql, sqlArr)
    if (res.affectedRows == 1) {
        let msg = await getUserInfo(id)
        return msg
    }
    else {
        return false
    }
}
//获取用户详细信息
let getUserInfo = (id) => {
    let sql = `select user_id,username,user_pic,user_desc,create_itme from userinfo where user_id=?`
    let sqlArr = [id]
    return dbconfig.SySqlConnect(sql, sqlArr)
}

//获取用户详情接口
getUserInfoCms = async (req, res) => {
    let id = req.body.id
    let token = req.headers.authorization
    let tokenid = await userToken.verToken(token)
    console.log(tokenid.id)
    if (id != tokenid.id) {
        res.send({
            'code': 500,
            'msg': 'token已失效'
        })
        return
    }
    let sql = `select * from userinfo where user_id=?`
    let sqlArr = [id]
    let result = await dbconfig.SySqlConnect(sql, sqlArr)
    if (result.length) {
        res.send({
            'code': 200,
            'data': result[0]
        })
    }
    else {
        res.send({
            'code': 300,
            'msg': '获取失败'
        })
    }
}


//忘记密码
forgetPasswd = (req, res) => {
    let { password, phone } = req.body
    let sql = `update users set password=? where phone=?`
    let sqlArr = [password, phone]
    var callBack = async (err, data) => {
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

//修改用户信息
let valatUserName = async (username) => {
    let sql = `select * from userinfo where username=?`
    let sqlArr = [username]
    let res = await dbconfig.SySqlConnect(sql, sqlArr)
    if (res.length) {
        return true
    }
    else {
        return false
    }

}
editUserInfo = async (req, res) => {
    let { username, userdesc, id } = req.body
    let result = await valatUserName(username)
    if (result) {
        res.send({
            'code': 300,
            'msg': '用户名已存在'
        })
    }
    else {
        let sql = `update userinfo set username=?,user_desc=? where user_id=?`
        let sqlArr = [username, userdesc, id]
        let msg = await dbconfig.SySqlConnect(sql, sqlArr)
        if (msg.affectedRows == 1) {
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

//获取用户列表
getUserList = (req, res) => {
    let sql = `select * from users `
    let sqlArr = []
    var callBack = async (err, data) => {
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
                    'msg': '暂无数据'
                })
            }
            else {
                res.send({
                    'code': 300,
                    'msg': '错误'
                })
            }

        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//获取用户列表详细信息
getUserInfoList = (req, res) => {
    let sql = `select * from userinfo `
    let sqlArr = []
    var callBack = async (err, data) => {
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
                    'msg': '暂无数据'
                })
            }
            else {
                res.send({
                    'code': 300,
                    'msg': '错误'
                })
            }

        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//添加用户
addUserItem = async (req, res) => {
    let { phone, username, } = req.body
    let result = await selectPhone(phone)
    if (result) {
        res.send({
            'code': 300,
            'msg': '手机号已存在'
        })
        return
    }
    let msg = await selectUsername(username)
    if (msg) {
        res.send({
            'code': 300,
            'msg': '用户名已存在'
        })
        return
    }
    let sql = `insert into users(phone,username,password,create_time,status) value(?,?,?,?,?)`
    let sqlArr = [phone, username, '123456', (new Date().valueOf()), 0]
    var callBack = async (err, data) => {
        if (err) {
            res.send({
                'code': 500,
                'msg': '出错了'
            })
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

//删除用户
deleUserItem = async (req, res) => {
    let { id } = req.body
    let sql = `delete from users where id=?`
    let sqlArr = [id]
    var callBack = async (err, data) => {
        if (err) {
            res.send({
                'code': 500,
                'msg': '出错了'
            })
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

//修改用户状态
editUserState = async (req, res) => {
    let { status, id } = req.body
    let sql = `update users set status=?  where id=?`
    let sqlArr = [status, id]
    var callBack = async (err, data) => {
        if (err) {
            res.send({
                'code': 500,
                'msg': '出错了'
            })
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
module.exports = {
    sendCode,
    signUser,
    login,
    editUserInfo,
    getUserInfoCms,
    forgetPasswd,
    getUserList,
    getUserInfoList,
    addUserItem,
    deleUserItem,
    editUserState
}