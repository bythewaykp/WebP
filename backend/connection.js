var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "kp",
    password: "Marvellouskp#1",
    database: "kp",
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


let print = (t,val) => {
    let sql = `SELECT ${val} FROM ??`
    con.query(
        sql,
        [t],
        (err, result, fields) => {
            if (err) console.log("err");
            console.log(result);
        }
    );
}
let insert = (t,val) => {
    let sql = "INSERT INTO ?? SET ?";
    con.query(sql, [t,val], (err, result, fields) => {
        if (err) console.log("err");
        else console.log("success");
    });
};

let create = (t, val) => {
    var sql = "CREATE TABLE kp2 (name VARCHAR(255), address VARCHAR(255))";
    let q = con.query(sql, val, (err, result) => {
        if (err) console.log("err");
        else console.log("1 record inserted");
    });
    console.log(q.sql);
};

// insert("table1", {
//     name: "abhi15",
//     email: "abhi@g.com",
//     username: "abz8",
//     password: "abhi8@123",
// });

// print("table1",'*');

module.exports = {insert,print}