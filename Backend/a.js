const fs = require('fs')

let grpmembs = {
    wayanad : ["a","b","c","d","e","f"],
    mysore : ["p","q","r","s"]
}

let db = {
    grps : {
        wayanad : {
            "a" : [["b",25],["c",15],["e",25]],
            "b" : [["c",10],["e",55]],
            "c" : [["d",35]],
            "d" : [["e",20]],
        },

        mysore : {
            
        }
        
    }
    
}
fs.writeFileSync("b.txt","")

for (let k in db.grps.wayanad){
    v= db.grps.wayanad[k]
    v.forEach(e=>{
        console.log(k,e[0],e[1])
        fs.appendFileSync("a.txt",`${k},${e[0]},${e[1]}\n`)

    })
    console.log("");
}
