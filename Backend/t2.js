let axios = require("axios");

let getold = async(grp)=>{
    let d = await axios
        .get(`http://localhost:3002/grps?name=${grp}`)
        .then((r) => {
            // console.log(r.data);
            return r.data[0];
        })
        .catch((e) => {
            console.log("e - get grp content");
        });
        console.log(d);
}

let grpbody = (grp) => {

    (async()=>{

        let d = await axios
        .get(`http://localhost:3002/grps?name=${grp}`)
        .then((r) => {
            return r.data[0];
        })
        .catch((e) => {
            console.log("e - get grp content");
        });
        console.log(d);
    })()

};
// grpbody("mysore")
getold("mysore")