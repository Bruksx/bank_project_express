const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/example_db')

var userSchema = mongoose.Schema({
    createdAt: {type: Date, default: Date.now},
    firstname: {type: String},
    lastname: {type: String},
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String}
})

var user = mongoose.model("user", userSchema)

class userMethods{
    constructor (){}
    async save_user(f, l, u, e, p){
        var salt = await bcrypt.genSalt(10)
        p = await bcrypt.hash(p, salt)
        var new_user = new user({
        firstname: f,
        lastname: l,
        username: u,
        email: e,
        password: p
        })
        new_user.save()
        console.log("user saved successfully")
    }
    async validate_user(form_data){
        var user = mongoose.model("user", userSchema)
        var test = await user.findOne({email: form_data.email})
        console.log(test)
        if (test) {
            // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(form_data.password, test.password)
            if (validPassword === true) {
                return {status:"success", message:"Valid password"}
            } 
            else {
                return {status:"invalid password", message:"Invalid Password"}
            }
          }
        else{
            return {status:"user does not exist", message:"user does not exist"}
        } 
    }

    async get_user(email){
        var user = mongoose.model("user", userSchema)
        var test = await user.findOne({email: email})
        return test
    }
}




module.exports = new userMethods()