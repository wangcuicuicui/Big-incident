const express = require('express');
const app = express();
//加载express-jwt模块（解密token）控制哪些接口不需要认证
const expressJwt = require('express-jwt');

app.listen(3006, () => { console.log('111111111111') });
app.use(expressJwt(
    {
        secret: 'abcdefg',
        algorithms: ['HS256'],
    }
).unless({
    path: /^\/api/
}));
// app.use(express.urlencoded({extended:false}));
app.use(express.urlencoded({ extended: false }));


// 加载路由模块 -- login
let loginRouter = require('./routers/login');
app.use('/api', loginRouter);

// 加载路由模块 -- category
let categoryRouter = require('./routers/category');
app.use('/my/article', categoryRouter);
//错误处理中间件
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizadError') {
        res.status(401).send({ status: 1, msg: '身份认证失败' })
    }
});