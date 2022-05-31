const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const body_parser = require("body-parser")
const multer = require("multer")
const upload = multer()
const userMethods = require("./models/user")
const session = require("express-session")
const MongoStore = require("connect-mongo")



app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}))
app.use(upload.array())
app.use (session({
    secret: "sdfghjgfdsaaBdf';#assedaAADV",
    resave:true,
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/example_db',
        ttl: 14 * 24 * 60 * 60,
        autoREmove: "native"
    })
}))

app.get("/", function(req, res){
    res.render("index")
})

app.post("/signup", function(req, res){
    var form_data = req.body
    var empty_fields = []
    for (let i in form_data){
        if (form_data[i]=== ""){
            empty_fields.push(i)
        }
    }

    if (empty_fields.length != 0){
        var data = {
            status: "empty fields",
            fields: empty_fields,
            message: `the following fields are empty ${empty_fields.join()}`
        }
        res.json(data)
    }

    if (form_data["password"] != form_data["password2"]){
        var data = {
            status: "password not matched",
            message: "password do not match"
        }
        res.json(data)
    }

    else{
        var data = {
            status: "success",
            message: "Successful registration"
        }
        userMethods.save_user(form_data.firstname, form_data.lastname, form_data.username, form_data.email, form_data.password)
        res.json(data)
    }
})

app.post("/login", async function(req, res){
    var form_data = req.body
    data = await userMethods.validate_user(form_data)
    if (data.status === "success"){
        req.session.user = await userMethods.get_user(form_data.email)
        req.session.save()
        console.log(req.session.user)
    }
    res.json(data)
})

app.get("/profile", async function(req, res){
    if (req.session.user){
        var profile = req.session.user
        res.render("profile", {
            profile: profile
        })
    }
})

app.listen(port, () => console.log(
    `express started on http://localhost:${port}`
))