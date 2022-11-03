let simplify = require("./simplify");
// let {insert, print} = require("./connection")

// print('table1','*')
let DB_PORT = 3001;

let axios = require("axios");
var express = require("express");
var app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

let grpbody = async (grp) => {
    let d = await axios
        .get(`http://localhost:${DB_PORT}/grps?name=${grp}`)
        .then((r) => {
            // console.log(r.data[0]);
            return r.data[0];
        })
        .catch((e) => {
            console.log("e - get grp content");
        });
    return d;
};

app.post("/login", async (req, res) => {
    [name, username, email, password] = req.body.params;
});

app.get("/grpbody", async (req, res) => {
    let { grp } = req.query;
    let body = await grpbody(grp);
    console.log(body);
    res.json(body);
});

app.get("/grplist", async (req, res) => {
    let { name } = req.query;
    await axios
        .get(`http://localhost:${DB_PORT}/grps`)
        .then((r) => {
            d = {};
            r.data.map(i=>{
                let grp = i["name"]
                let body = i["body"]
                let obj = simplify(body)[name];
                let s = Object.values(obj).reduce((a, b) => a + b, 0);
                d[grp] = s;
            })
            // Object.entries(r.data).map((i) => {
            //     let nam = i[1]["name"];
            //     // console.log(simplify(i[1]["body"]));
            //     let obj = simplify(i[1]["body"])[name];
            //     let s = Object.values(obj).reduce((a, b) => a + b, 0);
            //     d[nam] = s;
            // });
            console.log('triggered /grplist');
            res.json(d);
        })
        .catch((e) => {
            console.log("e - get grp list");
        });
});

let frndData = async (name, frnd) => {
    await axios
        .get(`http://localhost:${DB_PORT}/grps`)
        .then((r) => {
            d = {};
            r.data.map(i => {
                let grp = i["name"];
                let body = i["body"];

                d[grp]=simplify(body)[frnd]?.[name]??0
            });
            // console.log(d);
            return d;

        })
        .catch((e) => {
            console.log("e - get grp list");
        });
    return d;
};

app.get("/frienddata", async (req, res) => {
    let { name, frnd } = req.query;
    let a = await frndData(name, frnd);
    console.log(a);
});

app.get("/friendlist", async (req, res) => {
    let { name } = req.query;
    await axios
        .get(`http://localhost:${DB_PORT}/grps`)
        .then(async(r) => {
            
            st = new Set();

            //add each friend of owner to the set st
            r.data.map((i) => {
                Object.keys(i["body"]).map((t) => {
                    st.add(t);
                });
                
            });
            st.delete(name)
            //array of names of all friends of owner
            let frndnames = [...st];
            t ={}

            //iterate through each friend
            for(let frnd of frndnames){
                let obj = await frndData(name, frnd);
                //calculate the sum of expenses in all grps a friend frnd owe u
                let s = Object.values(obj).reduce((a, b) => a + b, 0)
                t[frnd] = s

            }
            console.log('triggered /friendlist')
            res.send(t)

        })
        .catch((e) => {
            console.log("e - get grp list");
        })
});

app.get("/grpmembs", async (req, res) => {
    // {"grp":"wayanad"}
    let { grp } = req.body;

    let val = await grpbody(grp);
    res.send(Object.keys(val["body"]));
    console.log(Object.keys(val["body"]));
});
app.get("/simplify", async (req, res) => {
    let { grp } = req.body;
    // {"grp":"wayanad"}

    let val = await grpbody(grp);
    res.send(simplify(val["body"]));
    console.log(simplify(val["body"]));
});
app.post("/addexpense", async (req, res) => {
    // {"a":"b","b":"a","v":29,"grp":"wayanad"}
    let { a, b, v, grp } = req.body;

    let val = await grpbody(grp);
    let db2 = val["body"];

    if (db2?.[b]?.[a]) {
        if (db2[b][a] > v) {
            db2[b][a] -= v;
        } else if (db2[b][a] < v) {
            db2[a][b] = v - db2[b][a];
            delete db2[b][a];
        } else {
            delete db2[b][a];
        }
    } else if (db2?.[a]?.[b]) {
        db2[a][b] += v;
    } else if (db2?.[a]) {
        db2[a][b] = v;
    }

    await axios
        .patch(`http://localhost:${DB_PORT}/grps/1`, { ...val, body: db2 })
        .then((r) => {
            res.json(r.data);
        })
        .catch((e) => {
            console.log("e - add expense");
        });
});

app.post("/newmember", async (req, res) => {
    // {"grp":"wayanad","membs":["f","g","h"]}
    let { grp, membs } = req.body;
    let val = await grpbody(grp);
    db2 = val["body"];
    membs.forEach((i) => {
        db2[i] = {};
    });
    await axios
        .patch(`http://localhost:${DB_PORT}/grps/1`, {
            ...val,
            body: db2,
        })
        .then((r) => {
            console.log(r.data);
            res.json(r.data);
        })
        .catch((e) => {
            console.log("e - add membs");
        });
});

app.post("/deletemember", async (req, res) => {
    // {"grp":"wayanad","membs":["f","g","h"]}
    let { grp, membs } = req.body;
    let val = await grpbody(grp);
    db2 = val["body"];
    membs.forEach((i) => {
        Object.keys(db2).includes(i) && Object.keys(db2[i]).length == 0
            ? delete db2[i]
            : console.log(`${i} is not empty`);
    });
    await axios
        .patch(`http://localhost:${DB_PORT}/grps/1`, {
            ...val,
            body: db2,
        })
        .then((r) => {
            console.log(r.data);
            res.json(r.data);
        })
        .catch((e) => {
            console.log("e - add membs");
        });
});

var server = app.listen(3002, function () {
    var port = server.address().port;
    console.log(`Example app listening at port ${port}`);
});
