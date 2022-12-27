const express= require('express')
const app = express()
const hbs = require('hbs')
const unirest = require('unirest')

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>
{
    res.render('sms')
})

app.get('/message',(req,resp)=>
{
    let{mobile,data}=req.query;
    var req1 = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

req.query({
  "authorization": "YCKFRaoShxrTdA7pmJNgn4ZWGjQVIyMOEfk5w1eD6P2c0bX3vtv60He7xgmWEbB8F9KsGLXzCYthuayp",
  "message": data,
  "language": "english",
  "route": "q",
  "numbers":mobile,
});

req.headers({
  "cache-control": "no-cache"
});


req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});
resp.redirect('/');

})

app.listen(3100,()=>
{
    console.log("The server started at 3100");
})