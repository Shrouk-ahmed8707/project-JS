

let username = document.getElementById("username");
let password = document.getElementById("password");
let Email = document.getElementById("Email");
let btn_register = document.getElementById("btn_register");

// الحدث عند الضغط على زر التسجيل
btn_register.addEventListener("click", function (e) {
    e.preventDefault()
    if (username.value === "" || password.value === "" || Email.value === "") {
        alert("Please fill all data")
    }
    else {
        localStorage.setItem("username", username.value)
        localStorage.setItem("password", password.value)
        localStorage.setItem("Email", Email.value)

        setTimeout(() => {
            window.location = "login.html"
        }, 1500)
    }
})





