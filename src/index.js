const express =require("express")
const app = express()
const path= require("path")
//const hbs = require("hbs")
//const LogInCollection = require("./mongodb.js").default
const LogInCollection = require('./mongodb');

const port = process.env.PORT || 3001
const templatePath = path.join(__dirname,'../templates')
const publicPath = path.join(__dirname,'../public')
module.exports = LogInCollection;

 // Inside mongo.js or index.js
// Export the connect function
//module.exports.connect = connect;

console.log(publicPath);
app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))
app.use(express.static(publicPath))


app.get("/",(req,res) =>{
    res.render("login")
})
app.get("/signup",(req,res) =>{
    res.render("signup")
})
/*app.post("/signup",async (req,res) =>{
    const data ={
        name:req.body.name,
        password:req.body.password
    }
const checking = await LogInCollection.findOne({name:req.body.name}).maxTimeMS(20000);

try{
    if(checking.name === req.body.name && checking.password === req.body.password){
        res.send("user exists")
    }
else{
await LogInCollection.insertMany([data])
res.render("home")
}

}
catch{
    res.send("wrong input")
}
res.status(201).render("home",{
    naming:req.body.name
})
})*/

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    const checking = await LogInCollection.findOne({ name: req.body.name }).maxTimeMS(20000);

    try {
        if (checking) {
            res.send("user exists");
        } else {
            await LogInCollection.insertMany([data]);
            res.status(201).render("home", { naming: req.body.name });
        }
    } catch {
        res.send("wrong input");
    }
});

app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})



app.listen(port,() =>{
    console.log("Port connected");
})


/*const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./mongodb")
const port = process.env.PORT || 3001
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})



// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup', async (req, res) => {
    
    // const data = new LogInCollection({
    //     name: req.body.name,
    //     password: req.body.password
    // })
    // await data.save()

    const data = {
        name: req.body.name,
        password: req.body.password
    }

    const checking = await LogInCollection.findOne({ name: req.body.name })

   try{
    if (checking.name === req.body.name && checking.password===req.body.password) {
        res.send("user details already exists")
    }
    else{
        await LogInCollection.insertMany([data])
    }
   }
   catch{
    res.send("wrong inputs")
   }

    res.status(201).render("home", {
        naming: req.body.name
    })
})


app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})



app.listen(port, () => {
    console.log('port connected');
})*/