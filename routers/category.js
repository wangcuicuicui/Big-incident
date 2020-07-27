//分类

const db = require('../db');
//1。加载express
const express = require('express');
// 2.创建路由对象
const router = express.Router();

// 3.把接口挂在到路由对象上
// ------------------------------------获取分类------------------------------------
router.get('/cates', async (req, res) => {
    let r = await db('select * from category');
    if (r) {
        res.send({ status: 200, msg: '成功', data: r });
    } else {
        res.send({ status: 500, msg: '失败' });
    }
});
// ------------------------------------新增分类------------------------------------
router.post('/addcates', async (req, res) => {
    let r = await db('insert into category set ?', req.body);
    if (r) {
        res.send({ status: 0, msg: '成功' });
    } else {
        res.send({ status: 1, msg: '失败' });
    }
});
// ------------------------------------编辑分类------------------------------------
router.post('/updatecate', async (req, res) => {
    let sql = 'update category set ? where Id= ?';
    let r = await db(sql, [req.body, req.body.Id]);
    if (r && r.affectedRows > 0) {
        res.send({ status: 0, msg: '成功' });
    } else {
        res.send({ status: 1, msg: '失败' });
    }
});
// ------------------------------------删除分类------------------------------------
router.get('/deletecate/:id', async (req, res) => {
    let id = req.params.id;
    let r = await db('delete from category where Id= ?', id);
    if (r) {
        res.send({ status: 0, msg: '成功' });
    } else {
        res.send({ status: 1, msg: '失败' });
    }
});





// 4.导出路由对象
module.exports = router;
