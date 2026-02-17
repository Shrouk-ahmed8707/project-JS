

let username = document.getElementById("username");
let password = document.getElementById("inputPassword");
let btn_login = document.getElementById("btn_login");

let getusername = localStorage.getItem("username")
let getpass = localStorage.getItem("password")
// الحدث عند الضغط على زر التسجيل

//هجيب البيانات من ال local storage واقارنها بالل هدخله 

btn_login.addEventListener("click", function (e) {
    e.preventDefault()
    if (username.value === " " || password.value === " ") {
        alert("Please fill all data")
    } else {
        //المقارنة 
        if (getusername && getusername.trim() === username.value && getpass && getpass.trim() === password.value) {
            setTimeout(() => {
                window.location = "index.html"
            }, 1000);
        }
        //لو المقارنة غلط 
        else {
            alert("username or password is wrong")
        }
    }
})