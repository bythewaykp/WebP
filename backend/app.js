let simplify = require("./simplify");

let DB_PORT = 3001;
let axios = require("axios");
var express = require("express");
var app = express();
app.use(express.json());

const cors = require("cors");
// app.use(cors());
app.use(cors({origin: true, credentials: true}));
// cors({ origin : [ "http://localhost:3002"]})

let grpbody = async (grp) => {
    let d = await axios
        .get(`http://localhost:${DB_PORT}/grps?name=${grp}`)
        .then((r) => {
            return r.data[0];
        })
        .catch((e) => {
            console.log("e - get grp content");
        });
    return d;
};

app.post("/login", async (req, res) => {
    console.log('triggered /login POST');
    [name, username, email, password] = req.body.params;
    console.log(req.body.params);
});



app.get("/grpindividual", async (req, res) => {
    let { name, grp } = req.query;
    console.log(`triggered /grpindivdual ${grp}, ${name}`);
    let b = await grpbody(grp);
    // console.log(b);
    let s = simplify(b["body"]);
    let db = {};

    Object.keys(s)
        .filter((i) => i != name)
        .map((k) => {
            db[k] = s[name]?.[k] ?? 0;
        });
    res.json({ db ,s });
});

app.get("/grpindividualnosimp", async (req, res) => {
    let { name, grp } = req.query;

    console.log(`triggered /grpindivdualnosimp ${grp}, ${name}`);
    let b = await grpbody(grp);

    // console.log(b);
    let s = b["body"];

    let t = { ...s };

    Object.keys(s).map((i) => {
        Object.keys(s[i]).map((j) => {
            t[j][i] = -s[i][j];
        });
    });
    console.log(s);

    // console.log(s);
    let db = {};

    Object.keys(s)
        .filter((i) => i != name)
        .map((k) => {
            db[k] = s[name][k] ?? 0;
        });

    res.json({ db, t });
});

app.get("/grplist", async (req, res) => {
    let { name } = req.query;
    console.log(`triggered /grplist ${name}`);

    await axios
        .get(`http://localhost:${DB_PORT}/grps`)
        .then((r) => {
            d = {};
            r.data.map(async (i) => {
                let grp = i["name"];
                let body = i["body"];
                let p = simplify(body);
                let obj = p[name] ?? 0;
                let s;
                if (obj == 0) {
                    s = 0;
                } else {
                    s = Object.values(obj).reduce((a, b) => a + b, 0);
                }
                d[grp] = s;
            });
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
            r.data.map((i) => {
                let grp = i["name"];
                let body = i["body"];

                d[grp] = simplify(body)[frnd]?.[name] ?? 0;
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
    console.log(`triggered /frienddata ${frnd}, ${name}`);
    let a = await frndData(name, frnd);
    console.log(a);
});

app.get("/friendlist", async (req, res) => {
    let { name } = req.query;
    console.log(`triggered /friendlist ${name}`);

    await axios
        .get(`http://localhost:${DB_PORT}/grps`)
        .then(async (r) => {
            st = new Set();

            //add each friend of owner to the set st
            r.data.map((i) => {
                Object.keys(i["body"]).map((t) => {
                    st.add(t);
                });
            });
            st.delete(name);
            //array of names of all friends of owner
            let frndnames = [...st];
            t = {};

            //iterate through each friend
            for (let frnd of frndnames) {
                let obj = await frndData(name, frnd);
                //calculate the sum of expenses in all grps a friend frnd owe u
                let s = Object.values(obj).reduce((a, b) => a + b, 0);
                t[frnd] = s;
            }
            res.send(t);
        })
        .catch((e) => {
            console.log("e - get grp list");
        });
});

app.get("/grpmembs", async (req, res) => {
    // {"grp":"wayanad"}
    let { grp } = req.query;
    console.log(`triggered /grpmembs ${grp}`);

    let val = await grpbody(grp);
    res.send(Object.keys(val["body"]));
    // console.log(Object.keys(val["body"]));
});

app.get("/simplify", async (req, res) => {
    let { grp } = req.body;
    // {"grp":"wayanad"}

    let val = await grpbody(grp);
    res.send(simplify(val["body"]));
    console.log(simplify(val["body"]));
});

app.post("/addexpense", async (req, res) => {
    console.log("triggered /addexpense");
    // {"a":"b","b":"a","v":29,"grp":"wayanad"}
    let { a, membs, grp } = req.body;

    let addExp = (a, b, v) => {
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
        return db2;
    };

    let val = await grpbody(grp);
    let db2 = val["body"];
    // console.log(db2);
    let [id] = await axios
        .get(`http://localhost:${DB_PORT}/grps?name=${grp}`)
        .then((r) => {
            return r.data.filter((i) => i != grp).map((i) => i["id"]);
        })
        .catch((e) => {
            console.log("e - get grp id");
        });

    Object.keys(membs)
        .filter((i) => i != a)
        .map((i) => {
            addExp(i, a, Number(membs[i]));
        });

    console.log(db2);

    await axios
        .patch(`http://localhost:${DB_PORT}/grps/${id}`, { ...val, body: db2 })
        .then((r) => {
            res.json(r.data);
        })
        .catch((e) => {
            console.log("e - add expense");
        });
});




//edit group
app.post("/editgrp", async (req, res) => {
    console.log("triggered /editgrp post");
    let { grp, membs, name, newgrp } = req.body;

    let val = await grpbody(grp);
    let b = val["body"];
    let db2 = { ...b };
    let s = simplify(db2);

    let [id] = await axios
        .get(`http://localhost:${DB_PORT}/grps?name=${grp}`)
        .then((r) => {
            return r.data.filter((i) => i != grp).map((i) => i["id"]);
        })
        .catch((e) => {
            console.log("e - get grp id");
        });

    Object.keys(membs)
        .filter((i) => !Object.keys(db2).includes(i))
        .map((j) => {
            db2[j] = {};
        });
    Object.keys(db2)
        .filter(
            (i) =>
                !Object.keys(membs).concat(Object.keys(s)).includes(i) &&
                i != name
        )
        .map((j) => {
            delete db2[j];
        });

    await axios
        .patch(`http://localhost:${DB_PORT}/grps/${id}`, {
            ...val,
            name: newgrp,
            body: db2,
        })
        .then((r) => {
            res.json(r.data);
        })
        .catch((e) => {
            console.log("e - add membs");
        });
});

app.post("/new",async (req,res)=>{
    console.log("hi da");
})

app.post("/creategrp", (req, res) => {

    console.log("triggered /creategrp post");

    // let { grp, membs, owner} = req.body;

    // let val = await grpbody(grp);
    // let b = val["body"];
    // let db2 = { ...b };
    // let s = simplify(db2);

    // let [id] = await axios
    //     .get(`http://localhost:${DB_PORT}/grps?name=${grp}`)
    //     .then((r) => {
    //         return r.data.filter((i) => i != grp).map((i) => i["id"]);
    //     })
    //     .catch((e) => {
    //         console.log("e - get grp id");
    //     });

    // Object.keys(membs)
    //     .filter((i) => !Object.keys(db2).includes(i))
    //     .map((j) => {
    //         db2[j] = {};
    //     });
    // Object.keys(db2)
    //     .filter(
    //         (i) =>
    //             !Object.keys(membs).concat(Object.keys(s)).includes(i) &&
    //             i != name
    //     )
    //     .map((j) => {
    //         delete db2[j];
    //     });

    // await axios
    //     .patch(`http://localhost:${DB_PORT}/grps/${id}`, {
    //         ...val,
    //         name: newgrp,
    //         body: db2,
    //     })
    //     .then((r) => {
    //         res.json(r.data);
    //     })
    //     .catch((e) => {
    //         console.log("e - add membs");
    //     });
});

var server = app.listen(3002, function () {
    var port = server.address().port;
    console.log(`Example app listening at port ${port}`);
});
