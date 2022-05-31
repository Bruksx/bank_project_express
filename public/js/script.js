const search_btn = document.getElementsByClassName("fa-magnifying-glass")[0]
const search_con = document.getElementsByClassName("search-container")[0]
const xbtn = document.getElementsByClassName("fa-x")[0]
const link_top = document.getElementById("link-top")
const mobile_bar = document.getElementsByClassName("mobile-bar")[0]
const mobile_links = document.getElementsByClassName("mobile-links")[0]

function toggleSearchCon(){
    var list = link_top.children
    if (search_con.style.display != "block"){
        search_con.style.display = "block"
        for (let i in list){
            console.log(list[i].className)
            if (list[i].className != "search-container"){
                list[i].style.display = "none"
            }
        }
    }
    else{
        search_con.style.display = "none"
        for (let i in list){
            if (list[i].className != "search-container"){
                list[i].style.display = "block"
            }
        }
    }
    
}

search_btn.addEventListener("click", toggleSearchCon)
xbtn.addEventListener("click", toggleSearchCon)

//smart phone
function toggle_mobile_nav(){
    if (mobile_links.style.height != "300px"){
        mobile_links.style.transition ="0.5s"
        mobile_links.style.height = "300px"
        this.className = "fa-solid fa-x"
        this.parentElement.style.color =  "white"
        this.parentElement.style.backgroundColor = "rgb(51, 51, 255)"
    }
    else{
        mobile_links.style.height = "0px"
        this.className = "fa-solid fa-bars mobile-bar"
        this.parentElement.style.transition = "0.5s"
        this.parentElement.style.color =  "rgb(51, 51, 255)"
        this.parentElement.style.backgroundColor = "rgb(236, 242, 249)"
    }
}

mobile_bar.addEventListener("click",toggle_mobile_nav)