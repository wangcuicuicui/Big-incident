//mysql查询属于异步操作，需要使用promise    






module.exports = (sql, values) => {


    const mysql = require('mysql');
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'Dva'
    });


    return new Promise((resolve, reject) => {
        conn.connect();

        conn.query(sql, values, (err, result) => {
            err ? reject(err) : resolve(result);
        });
        conn.end();
    }).catch(e => {
         console.log('===============================');
        console.log('错误描述：' + e.sqlMessage);
        console.log('错误的SQL：' + e.sql);
        console.log('===============================');
    });



};