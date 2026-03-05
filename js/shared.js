
let nameofaccount = document.getElementById("nameofaccount");

//الاسم اللى هكتبه على اول الصفحة  اسم ال ""useraccount""
let getusername = localStorage.getItem("username")
let links = document.getElementsByClassName("link");
let rest_icons = document.getElementsByClassName("rest_icons");

if (getusername) {
  // 1. لإخفاء الروابط (Login/Register) لأنها قائمة لازم نلف عليها بـ Loop
  // عشان هما collection 
  for (let i = 0; i < links.length; i++) {
    links[i].style.display = "none";
    rest_icons[0].style.display = "flex";
  }

  // 2. إظهار اسم الحساب وتنسيقه
  nameofaccount.style.display = "flex";
  nameofaccount.innerHTML = getusername;
  nameofaccount.style.color = "black";
  nameofaccount.style.fontWeight = "bold";
  nameofaccount.style.fontSize = "1.2rem";
  nameofaccount.style.textDecoration="none"
}
///////////////////////////////////////////////////////
let logoutbtn = document.getElementById("logout");

logoutbtn.addEventListener("click", () => {
  localStorage.clear();
  setTimeout(()=>{
      window.location = "register.html";

  },1500)
})
