const spawn = require("child_process").spawn;

let visualize = () => {
    const pythonProcess = spawn("python", ["./a.py"]);
};

const simplify = require("./Backend/simplify");
let db = require("./db2");
const fs = require("fs");

let printNwrite = (file) => {
    fs.writeFileSync(`${file}.txt`, "");
    for (let [key, val] of Object.entries(db.grps.wayanad)) {
        // console.log(key);
        for (let [k, v] of Object.entries(val)) {
            console.log(`${key} -> ${k} (${v})`);
            fs.appendFileSync("a.txt", `${key},${k},${v}\n`);
        }
        console.log("");
    }
};

let addExp = (a, b, v, grp) => {
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
};

// addExp("b", "a", 35, "wayanad");
// printNwrite("a");
console.log(
    simplify(db.grps.wayanad)

);
// simplify(db.grps.wayanad)
// visualize()
let getGrpList = () => {
    return Object.keys(db.grps);
};

let getGrpMembs = () => {


    // return Object.keys(db.grps[grp]);
};

