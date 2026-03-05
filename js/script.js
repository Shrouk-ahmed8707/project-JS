
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

// ""مشكلة بتظهر معايا على طول لما بنادى باسم ال class خليكى id احسن ""
let allproducts = document.getElementById("products");

// Array of object for products لازم اميز كل واحد بال id بتاعه 
var products = [
  { id: 1, name: "Matte Lipstick Set", price: 25 , descrption: "A set of 5 long-lasting, smudge-proof matte lipsticks in versatile nude shades.", last_updated: "2 hours ago", image: "images/pexels-828860-2535928.jpg" },
  { id: 2, name: " Glow Foundation",    price: 45 , descrption: "A lightweight, hydrating foundation that provides buildable coverage.", last_updated: "3 hours ago", image: "images/pexels-828860-2536009.jpg" },
  { id: 3, name: "Volumizing Mascara",    price:18 , descrption: "An intense black mascara that lifts and volumizes lashes for a dramatic look.", last_updated: "5 hours ago", image: "images/pexels-828860-2693644.jpg" },
  { id: 4, name: "Eyeshadow Palette ",    price: 35 , descrption: "A versatile palette with 12 highly pigmented matte and shimmer shades", last_updated: "1 day ago", image: "images/pexels-darcy-lis-photography-travels-1478124445-33365011.jpg" },
  { id: 5, name: "Setting Spray",    price: 22 , descrption: "A refreshing spray that sets makeup and adds a healthy glow to your face.", last_updated: "2 days ago", image: "images/pexels-mariacamila-7712475.jpg" },
  { id: 6, name: "Professional Lip Definer Set",    price: 15 , descrption: "High-pigment, creamy pencils for perfectly outlined lips.  long-lasting formula", last_updated: "2024-01-04", image: "images/pexels-madalina-enache-1540051428-27462658.jpg" },
  { id: 7, name: "Single Lipstick -",    price:22 , descrption: "A highly pigmented matte lipstick that provides all-day wear with a luxury feel.", last_updated: "2 days ago", image: "images/pexels-peg1997-12503617.jpg" },
  { id: 8, name: "Essential Brush ",    price: 28 , descrption: "A curated collection of soft synthetic  blenders for seamless makeup application.", last_updated: "2024-01-04", image: "images/pexels-eugenia-remark-5767088-31209317.jpg" },
  { id: 9, name: " Shadow Palette ",    price: 28 , descrption: "A versatile palette featuring vibrant  shimmer shades to create endless eye looks.", last_updated: "2024-01-04", image: "images/pexels-greta-hoffman-7675377.jpg" },



];
// Loop through products array and create HTML for each product
//همشى على المنتجات بال ""map function ""
function displayProducts() {
  let y = products.map(itemofproduct => {
    return `
 <div class="card product-cards mb-3 mt-5" style="max-width: 350px; margin: auto;  ">                
  <img src="${itemofproduct.image}" class="card-img-top img-fluid" alt="${itemofproduct.name}" style="width: 350px; height:250px;">
  
  <div class="card-body">
    <h4 class="card-title">${itemofproduct.name}</h4>
    <p class="card-text mt-3">The Price: <span style="font-weight:bold;">${itemofproduct.price}$</span></p>
    <p class="card-text">${itemofproduct.descrption}</p>
    <p class="card-text"><small class="text-muted">${itemofproduct.last_updated}</small></p>
  </div>
  
  <div class="product-action d-flex justify-content-between align-items-center px-3 pb-3 mt-2">
    <button class="addtocart btn btn-primary" onclick="addtocart(${itemofproduct.id})">Add To Cart</button>
    <div class="icon"> 
      <i class="fa-regular fa-heart" onclick="addtofav(${itemofproduct.id})" style="font-size: 1.5rem; cursor: pointer;"></i> 
    </div>
  </div>
</div>`
  }).join("")
  //اكتب هنا باقى المنتجات 
  allproducts.innerHTML = y;
}
displayProducts();


/////////////////////////////////////////////////////////////////
let addedproducts = [];
let product_cart = document.querySelector(".product_cart div ");
let cart_notification = document.querySelector(".notification");

 addedproducts = localStorage.getItem("productincart")
  ? JSON.parse(localStorage.getItem("productincart"))
  : [];


// رسم العربة في البداية
drawCartProducts();

// دالة لرسم المنتجات في العربة
function drawCartProducts() {
  if (addedproducts.length === 0) {
    product_cart.innerHTML = "";
    cart_notification.style.display = "none";
    return;
  }

  let cartHTML = addedproducts.map(item => {
    let totalPrice = item.price * item.qty;
    return `
      <div class="row-col-6 mb-2 bg-light p-2">
        <p class="me-2">${item.name} 
          <strong class="mx-2" style="color:#0B5ED7;">Price: ${totalPrice}$</strong>
        </p>  
        <button onclick="changeQty(${item.id}, 'dec')"  class="btn btn-sm btn-secondary me-3"> - </button>    
        <span class="number me-3"> ${item.qty} </span> 
        <button onclick="changeQty(${item.id}, 'inc')"  class="btn btn-sm btn-secondary"> + </button>
      </div>`;
  }).join("");

  product_cart.innerHTML = cartHTML;
  cart_notification.style.display = "block";
  cart_notification.innerHTML = addedproducts.length;
}


// 1. شيلي الـ if الكبيرة اللي كانت لافة على الكود كله
function addtocart(id) {
  // 2. التحقق يحصل هنا (جوة الدالة) لما يضغط على الزرار
  if (getusername) {
    let productchoosen = products.find(item => item.id === id);
    
    product_cart.innerHTML += ` <div class="row-col-6 mb-2 bg-light p-2 ">
         <p class="me-2 ">${productchoosen.name} <strong class="mx-2">Price: ${productchoosen.price} </strong> </p>  
         <button onclick="increaseQty(${productchoosen.id})"  class="btn btn-sm btn-secondary"> - </button>    
         <span class="number"> ${productchoosen.qty} </span> 
         <button onclick="changeQty(${productchoosen.id})"  class="btn btn-sm btn-secondary"> + </button> </div> `;

     let existingProduct = addedproducts.find(item => item.id === id);

    if (existingProduct) {
      // لو موجود، زود الكمية
      existingProduct.qty += 1;
    } else {
      // لو مش موجود، أضف منتج جديد بكمية 1
      addedproducts.push({
        ...productchoosen,
        qty: 1
      });
    }

    localStorage.setItem("productincart", JSON.stringify(addedproducts));

        drawCartProducts();

    cart_notification.style.display = "block";
    
    let currentcount = document.querySelectorAll(".product_cart div p").length;
    cart_notification.innerHTML = currentcount;

    //////////////////////////////////////السعر للمنتج
    
  } else {
    // لو مش مسجل وداس على الزرار، ابعته يسجل
    window.location = "register.html";
  }
}

/////////////////////////////////////////////////////
// تغيير الكمية (زيادة أو نقصان)
function changeQty(id, action) {
  let product = addedproducts.find(item => item.id === id);

  if (action === 'inc') {
    product.qty += 1;
  } else if (action === 'dec') {
    product.qty -= 1;
    
    // لو الكمية وصلت لصفر، احذف المنتج من العربة
    if (product.qty === 0) {
      addedproducts = addedproducts.filter(item => item.id !== id);
    }
  }

  // حفظ التغييرات في localStorage
  localStorage.setItem("productincart", JSON.stringify(addedproducts));
  
  // إعادة رسم العربة
  drawCartProducts();
}

////////////////////////// ""اظهار واخفاء المنتجات اللى اتضافت فى العربه ""

let largediv = document.querySelector(".product_cart");
let icon_cart = document.querySelector("i.icon_cart");
// لما اضغط على ايقونة العربه تظهر المنتجات اللى اتضافت
icon_cart.addEventListener("click", () => {
  if (largediv.innerHTML != "") {
    if (largediv.style.display === "block") {
      largediv.style.display = "none";
    } else {
      largediv.style.display = "block";
    }
  }
})
////////////////////////// """logout"""

let logoutbtn = document.getElementById("logout");

logoutbtn.addEventListener("click", () => {
  localStorage.clear();
  setTimeout(()=>{
      window.location = "register.html";

  },1500)
})

////////////////////////search products
let searchInput = document.getElementById("search");
let searchMode = document.getElementById("searchMode"); // مسكنا الـ select

searchInput.addEventListener("input", () => {
  let searchTerm = searchInput.value.toLowerCase();
  let mode = searchMode.value; // هنعرف هو مختار name ولا category

  // الفلترة بناءً على الاختيار
  let filteredProducts = products.filter(item => {
    if (mode === "name") {
      return item.name.toLowerCase().includes(searchTerm);
    } else {
      // تأكدي إن المفتاح اسمه category في بياناتك
      // search بال description
      return item.descrption.toLowerCase().includes(searchTerm);
    }
  });

  // عرض النتائج (نفس الكود بتاعك)
  let y = filteredProducts.map(itemofproduct => {
    return `
   <div class="card mb-3 mt-5" style="max-width: 350px; margin: auto;">                
  <img src="${itemofproduct.image}" class="card-img-top img-fluid" alt="${itemofproduct.name}" style="width: 350px; height:250px;">
  
  <div class="card-body">
    <h4 class="card-title">${itemofproduct.name}</h4>
    <p class="card-text mt-3">The Price: <span style="font-weight:bold;">${itemofproduct.price}$</span></p>
    <p class="card-text">${itemofproduct.descrption}</p>
    <p class="card-text"><small class="text-muted">${itemofproduct.last_updated}</small></p>
  </div>
  
  <div class="product-action d-flex justify-content-between align-items-center px-3 pb-3 mt-2">
    <button class="addtocart btn btn-primary" onclick="addtocart(${itemofproduct.id})">Add To Cart</button>
    <div class="icon"> 
      <i class="fa-regular fa-heart" onclick="addtofav(event ,${itemofproduct.id})" style="font-size: 1.5rem; cursor: pointer;"></i> 
    </div>
  </div>
</div>`;
  }).join("");

  allproducts.innerHTML = y;
});

///////////////////////////////// ـجربة المفضلة


// let fav=document.querySelector(".fav")
let addedfav = localStorage.getItem("favproduct")
  ? JSON.parse(localStorage.getItem("favproduct"))
  : [];
function addtofav(id) {
  let icon = event.target;

    // تبديل شكل القلب بين المفرغ والممتلئ
    icon.classList.toggle('fa-solid');
    icon.classList.toggle('fa-regular');

    // تغيير اللون للأحمر إذا كان القلب ممتلئاً
    if (icon.classList.contains('fa-solid')) {
        icon.style.color = "red";
      //  alert(`Product added to favorites`);
    } 

  // 2. التحقق يحصل هنا (جوة الدالة) لما يضغط على الزرار
  if (getusername) {
    let favchoosen = products.find(item => item.id === id);
    // <i class="fa-solid fa-heart"></i>
    
    let isExist = addedfav.some(item => item.id === id);

    if (isExist) {
      return;
    }

    addedfav = [...addedfav, favchoosen];
    localStorage.setItem("favproduct", JSON.stringify(addedfav));
   
  } else {
    // لو مش مسجل وداس على الزرار، ابعته يسجل
    window.location = "register.html";
  }
}
/////////////////////////////////////////




/////////////////////////// ""favourate products""
// let favItems = localStorage.getItem("favoritesInCart") 
//     ? JSON.parse(localStorage.getItem("favoritesInCart")) 
//     : [];

// function addToFavorite(id) {
//     if (getusername) {
//         let product = products.find(item => item.id === id);
        
//         // التأكد إن المنتج مش موجود أصلاً في المفضلة عشان ميتكررش
//         let isExist = favItems.find(item => item.id === id);
        
//         if (!isExist) {
//             favItems.push(product);
//             localStorage.setItem("favoritesInCart", JSON.stringify(favItems));
            
//             // تغيير شكل القلب (اختياري)
//             document.getElementById(`heart-${id}`).classList.replace('fa-regular', 'fa-solid');
//             document.getElementById(`heart-${id}`).style.color = "red";
//         } else {
//             alert("المنتج موجود بالفعل في المفضلة");
//         }
//     } else {
//         window.location = "login.html";
//     }
// }
// //favourate products
// let favourate=document.querySelector(".fav");
// favourate.addEventListener("click",()=>{
//  favourate.style.backgroundColor="red";
// let addedtofav = localStorage.setItem("favourate","added to favourate");
// if(addedtofav){
//   localStorage.getItem("favourate");
//   draw_fav_products(addedtofav);
// }
// })
// function draw_fav_products(favourate){
//    let y = filteredProducts.map(itemofproduct => {
//     return `
//     <div class="card mb-3 mt-5" style="max-width: 540px;">
//         <div class="row g-0">
//           <div class="col-md-4">
//             <img src="${itemofproduct.image}" class="img-fluid rounded-start" alt="...">
//           </div>
//           <div class="col-md-8">
//             <div class="card-body">
//               <h4 class="card-title">${itemofproduct.name}</h4>
//               <p class="card-text">${itemofproduct.descrption}</p>
//               <p class="card-text"><small class="text-muted">${itemofproduct.last_updated}</small></p>
//             </div>
//             <div class="product-action d-flex justify-content-between align-items-center px-3 pb-3 mt-4">
//               <button class="addtocart btn btn-primary" onclick="addtocart(${itemofproduct.id})">Add To Cart</button>
//               <div class="icon"> <i class="fa-regular fa-heart fav"></i> </div>
//             </div>
//           </div>
//         </div>
//       </div>`;
//   }).join("");

//   allproducts.innerHTML = y;
// }





////////////////////////////////// "'dark ,light mode'"
// let themeBtn = document.getElementById("themeToggle");

// themeBtn.addEventListener("click", () => {
//     // 1. شوفي الحالة الحالية إيه؟
//     let currentMode = localStorage.getItem("theme");

//     // 2. بدلي الحالة
//     if (currentMode === "dark") {
//         setLightMode();
//     } else {
//         setDarkMode();
//     }
// });

// // وظيفة لتشغيل الـ Dark Mode
// function setDarkMode() {
//     document.body.classList.add("bg-dark", "text-white"); // كلاسات Bootstrap
//     localStorage.setItem("theme", "dark");
// }

// // وظيفة لتشغيل الـ Light Mode
// function setLightMode() {
//     document.body.classList.remove("bg-dark", "text-white");
//     localStorage.setItem("theme", "light");
// }

// // 3. أهم خطوة: أول ما الصفحة تفتح (Refresh)
// window.onload = () => {
//     let savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//         setDarkMode();
//     }
// };
