const express= require('express')

const hbs= require('hbs')
const bcrypt =require('bcryptjs')
const app=express()
const USMANI = require("./mongo")
const bodyparser = require('body-parser')
const session = require("express-session");
const mongosession = require("connect-mongodb-session")(session);

const mongoURI = "mongodb://localhost:27017/signup";

app.use(bodyparser.urlencoded({extended:true}))
// app.use(bodyparser.json())
app.set('view engine','hbs')



const store = new mongosession({
    uri: mongoURI,
    collection: 'mysession',
});

app.use(session({
    secret: 'This is Key',
    resave: false,
    saveUninitialized: false,
    store: store
}));

const isAuth = (req,res, next) => {
    if(req.session.isAuth){
        next()
    } else {
        res.redirect('/');
    }
}

app.get('/',(req,res)=>{
    res.render("login")
})
app.get('/sms',(req,res)=>{
    res.render("sms")
})

app.get('/reg',(req,res)=>{
    
    res.render("register")
})
app.post("/login",async (req,res) => {
    try {
        const {username,pass} = req.body;
        const check = await USMANI.users.findOne({Email:username});

        console.log(check)

        if(bcrypt.compareSync(pass,check.password)){
            // console.log(pass,check.password)
            req.session.isAuth = true;
            res.render("home");
        }
        else{
            return res.redirect("/");
        }
    } catch (error) {
        console.log(error)
        res.send("WRONG DETAILS");
    }
});

app.get("/home", isAuth ,(req,res) => {
    res.render("home");
});

app.post("/signup",async(req,res)=>
{
    const{fullname,uname,password}=req.body;
  const epass=await bcrypt.hash(password,12)
  const dbdata={FullName:fullname,Email:uname,password:epass}
  await USMANI.users.insertMany([dbdata],(err,resp)=>
{
    if(err){
        console.log(err);
    }else{
        console.log(resp)
    }
});
console.log(dbdata);
res.redirect("/");
   
});
app.post("/message"),async(req,res)=>
{
    const{mobile,data}=req.body;

}

app.post("/logout",(req,res)=>{
    req.session.destroy((err) => {
        if(err) throw err;
        return res.redirect("/");
    })
});

app.listen(4500,()=>{
    console.log("The server is running at 4500")
})