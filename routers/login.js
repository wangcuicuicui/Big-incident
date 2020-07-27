const experss = require('express');
const router = experss.Router();

// 加载加密模块
const utility = require('utility');
//加载jsonwebtoken模块
const jwt = require('jsonwebtoken');
//加载db模块
const db = require('../db');
// 注册接口
router.post('/reguser', async (req, res) => {
    //客户端提交账号，密码到达接口。req.body
    // 判断账号是否存在
    let r2 = await db('select * from user where username=?', req.body.username);
    //如果r2是非空数组，就不再进行注册
    if (r2 && r2.length > 0) {
        res.send({ status: 1, msg: '用户名已存在' });
        return;

    };
    //对密码加密
    req.body.password = utility.md5(req.body.password);
    //把账号密码添加到数据库的表格中
    let r = await db('insert into user set ?', req.body);
    if (r && r.affectedRows > 0) {
        res.send({ status: 0, msg: '注册成功' });
    } else {
        res.send({ status: 1, msg: '注册失败' });
    }
});
// ----------------------------登录
router.post('/login', async (req, res) => {
    //客户端提交账号密码
    // 接口判断账号密码是否正确

    //加密密码
    //根据账号密码，进行查询，查询得到说明正确，反正错误
    let arr = [req.body.username, utility.md5(req.body.password)];
    let r = await db('select * from user where username =? and password = ?', arr);
    //查询寻得到返回是非空数组，反之为空数组
    if (r && r.length > 0) {
        res.send(
            {
                status: 0,
                msg: '成功',
                token: 'Bearer ' + //固定写法必须加
                    jwt.sign(
                        { id: r[0].id },//token中保存的数据
                        'abcdefg',//用于加密key。解密token需要用到
                        { expiresIn: '2 days' }//配置token的有效期
                        )
            });
    } else {
        res.send({ status: 1, msg: '账号或密码错误，登录失败' });
    }
})
// 导出路由对象
module.exports = router;
