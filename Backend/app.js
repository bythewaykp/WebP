var express = require('express');
var app = express();

let db = {
    grps : {
        wayanad : {
            a : [(b,5),(c,15),(e,25)],
            b : [(c,10),(e,55)],
            d : [(c,35),(e,20)],
        },
        mysore : {
            
        }
        
    }
    
}

// This responds with "Hello World" on the homepage
app.get('/',(req, res)=> {
   console.log("Got a GET request for the homepage");
   res.send('Hello GET');
})

app.post('/newexpense',(req, res)=> {
    
    
})

app.post('/newmember',(req, res)=> {

})

var server = app.listen(3002, function () {

   var port = server.address().port
   
   console.log(`Example app listening at port ${port}`)
})

db.grps.wayanad.forEach((k,v)=>{
    console.log(k);
    v.forEach(e=>console.log(e))
})