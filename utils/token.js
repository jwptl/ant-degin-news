const jwt = require('jsonwebtoken');
//秘钥
var signkey = 'msg';
//生成token
const setToken = function (id) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            id: id
        }, signkey, { expiresIn:  60 * 60 * 24 * 3 });
        resolve(token);
    })
}
//验证token
const verToken = function (token) {
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token.split(' ')[1], signkey);
        resolve(info);
    })
}
module.exports = {
    setToken,
    verToken
}