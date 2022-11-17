let simplify = require('./simplify')
let d ={
    "a":{"b":10,"d":25},
    "b":{"c":30},
    "c":{},
    "d":{}
}
console.log(simplify(d));