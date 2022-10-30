let simplify = require("./simplify");
let DB_PORT = 3001;

let axios = require("axios");
var express = require("express");
var app = express();
app.use(express.json());


app.get("/grplist", async (req, res) => {
    await axios.get(`http://localhost:${DB_PORT}/grps`).then((r) => {
        res.json(Object.entries(r.data).map((i) => i[1]["name"]));
        // console.log(Object.entries(r.data).map(i=>i[1]["name"]));
    });
});

app.get("/grpmembs", async (req, res) => {
    // {"grp":"wayanad"}
    await axios
        .get(`http://localhost:${DB_PORT}/grps?name=${req.body.grp}`)
        .then((r) => {
            res.send(Object.keys(r.data[0]["body"]));
            console.log(Object.keys(r.data[0]["body"]));
        });
    // res.send(Object.keys(db.grps[req.body.grp]));
});
app.get("/simplify", async (req, res) => {
    // {"grp":"wayanad"}
    await axios
        .get(`http://localhost:${DB_PORT}/grps?name=${req.body.grp}`)
        .then((r) => {
            console.log(simplify(r.data[0]["body"]));
            res.json(simplify(Object.keys(r.data[0]["body"])));
        });
});
app.post("/addexpense", async (req, res) => {
    // {"a":"b","b":"a","v":29,"grp":"wayanad"}
    let { a, b, v, grp } = req.body;
    let val = await axios
        .get(`http://localhost:${DB_PORT}/grps?name=${req.body.grp}`)
        .then((r) => {
            return r.data[0];
        });

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

    try {
        await axios
            .patch(`http://localhost:${DB_PORT}/grps/1`, { ...val, body: db2 })
            .then((r) => {
                res.json(r.data);
            });
    } catch (e) {
        console.log("e1");
    }
});

app.post("/newmember", async (req, res) => {
    // {"grp":"wayanad","membs":["f","g","h"]}
    await axios
        .get(`http://localhost:${DB_PORT}/grps?name=${req.body.grp}`)
        .then(async (r) => {
            val = r.data[0]
            db2 = val["body"];
            req.body.membs.forEach((i) => {db2[i]={}});

            try {
                await axios
                    .patch(`http://localhost:${DB_PORT}/grps/1`, { ...val, body: db2 })
                    .then((r) => {
                        res.json(r.data);
                    });
            } catch (e) {
                console.log("e2");
            }
            
        });
});

var server = app.listen(3002, function () {
    var port = server.address().port;
    console.log(`Example app listening at port ${port}`);
});
