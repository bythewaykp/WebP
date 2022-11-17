let db = require("../db2.json");

let simplify = require("../simplify");
var express = require("express");
var app = express();
app.use(express.json());

app.get("/grplist", (req, res) => {
    res.json(Object.keys(db.grps));
    // res.json({ a: "hi" });
});

app.get("/grpmembs", (req, res) => {
    // {"grp":"wayanad"}
    res.send(Object.keys(db.grps[req.body.grp]));
});
app.get("/simplify", (req, res) => {
    // {"grp":"wayanad"}
    simplify(db.grps[req.body.grp]);
    res.send("ok");
});
app.post("/addexpense", (req, res) => {
    // {"a":"b","b":"a","v":29,"grp":"wayanad"}
    let { a, b, v, grp } = req.body;

    try {
        // if(grp == undefined)
        //     throw 'no grp'
        // if(a == undefined)
        //     throw 'no a'
        // if(b == undefined)
        //     throw 'no b'
        // if (v == undefined || v == 0) throw "zero or null";

        if (db.grps[grp]?.[b]?.[a]) {
            if (db.grps[grp][b][a] > v) {
                db.grps[grp][b][a] -= v;
            } else if (db.grps[grp][b][a] < v) {
                db.grps[grp][a][b] = v - db.grps[grp][b][a];
                delete db.grps[grp][b][a];
            } else {
                delete db.grps[grp][b][a];
            }
        } else if (db.grps[grp]?.[a]?.[b]) {
            db.grps[grp][a][b] += v;
        } else if (db.grps[grp]?.[a]) {
            db.grps[grp][a][b] = v;
        }
    } catch (e) {
        // if (e == "zero") {
        //     console.log("Expense entered is Zero");
        // } else {
        //     console.log(e);
        // }
    } finally {
        grp && res.send(db.grps[grp]) && console.log(db.grps[grp]);
    }
});

app.post("/newmember", (req, res) => {});

var server = app.listen(3002, function () {
    var port = server.address().port;
    console.log(`Example app listening at port ${port}`);
});
