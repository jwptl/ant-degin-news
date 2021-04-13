var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressJwt = require('express-jwt')
const cors = require('cors');
var userToken = require('./utils/token');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var http = require('http');
var server = http.createServer(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
//中间件
// 解析token获取用户信息
app.use(function (req, res, next) {
    var token = req.headers['Authorization']; if (token == undefined) {
        return next();
    } else {
        userToken.verToken(token).then((data) => {
            req.data = data;
            console.log(data)
             returnnext();
        }).catch((error) => {
            return next();
        })
    }
});

//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
    secret: 'msg',
    algorithms: ['HS256']
}).unless({
    path: ['/', '/users/login','/users/signUser','/users/sendCode','/users/forgetPasswd','/getClassList','/getNewsIdList','/queryNewsMsg']//除了这个地址，其他的URL都需要验证
}));

app.use(function (err, req, res, next) {
    console.log(err)
    if (err.name === 'UnauthorizedError') {
        res.json({
            message: 'token过期，请重新登录',
            code: 400
        })
        return
    }
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);


server.listen('8888');
