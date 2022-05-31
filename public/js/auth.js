const submit_signup = document.getElementById("signup")
const submit_login = document.getElementById("login")
const signup_inputs = document.getElementsByClassName("signUpInput")
const login_inputs = document.getElementsByClassName("loginInput")

async function signup (){
    var data = new FormData()
    for (let i in signup_inputs){
        var j = signup_inputs[i]
        if (typeof j === "object"){
            data.append(j.name, j.value)
        }
    }
    var request = await fetch("signup", {
        method:"POST",
        body:data
    })
    var response = await request.text()
    response = JSON.parse(response)
    console.log(response)
}

async function login(){
    var data = new FormData()
    for (let i in login_inputs){
        var j = login_inputs[i]
        if (typeof j === "object"){
            data.append(j.name, j.value)
        }
    }
    var request = await fetch("login", {
        method:"POST",
        body:data
    })
    var response = await request.text()
    response = JSON.parse(response)
    console.log(response)

    if (response.status === "success"){
        window.location.href = "profile"
    }
}

submit_signup.addEventListener("click", signup)
submit_login.addEventListener("click", login)