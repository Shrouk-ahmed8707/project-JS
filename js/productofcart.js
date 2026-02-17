
// بنقل المنتجات اللى فى العربة الى صفحة ال productofcart

let productsincart = JSON.parse(localStorage.getItem("productincart")) || [];
let allproducts = document.querySelector(".products");

if (productsincart) {
  let item = productsincart;
  drawproductsincart(item);
}

function drawproductsincart(products) {
  let totalpricesofproducts = 0;
  let y = products.map(itemofproduct => {
    let totalprice = itemofproduct.price * itemofproduct.qty
    totalpricesofproducts += totalprice;

    return `
    <div class="col-md-3 mt-3">
        <div class="card h-100 mt-auto">
            <img src="${itemofproduct.image}" class="card-img-top" style="height:150px; object-fit:cover">
            <div class="card-body">
                <h5>${itemofproduct.name}</h5>
             \
                <p><strong>The price: ${totalprice} $ </strong></p>
                <div class="d-flex justify-content-center align-items-center my-3">
                    <button class="btn btn-sm btn-secondary" onclick="changeQty(${itemofproduct.id}, 'dec')"> - </button>    
                    <span class="mx-3 fw-bold" style="font-size:18px"> ${itemofproduct.qty} </span> 
                    <button class="btn btn-sm btn-secondary" onclick="changeQty(${itemofproduct.id}, 'inc')"> + </button>
                </div>
                <button class="btn btn-danger w-100" onclick="removefromcart(${itemofproduct.id})"> <i class="fa-solid fa-trash mx-2"></i>remove</button>
            </div>
        </div>
    </div>`;
  }).join("");
  // اكتب هنا باقى المنتجات 
  allproducts.innerHTML = y;

  let allprices = document.getElementById("allprices")
  allprices.innerHTML =" The Total Price : " + totalpricesofproducts + " $"
}

/////////////////?/////////////////////////
// دالة تغيير الكمية
function changeQty(id, action) {
  let product = productsincart.find(item => item.id === id);

  if (!product) return;

  if (action === 'inc') {
    product.qty += 1;
  } else if (action === 'dec') {
    product.qty -= 1;

    // لو الكمية وصلت لصفر، احذف المنتج من العربة
    if (product.qty === 0) {
      productsincart = productsincart.filter(item => item.id !== id);
    }
  }

  // حفظ التغييرات في localStorage
  localStorage.setItem("productincart", JSON.stringify(productsincart));

  // إعادة رسم العربة
  drawproductsincart(productsincart);
}


////////////////////////////////تجربة المفضلة  

let fav_products = document.querySelector(".fav_products");
let favItems = JSON.parse(localStorage.getItem("favproduct")) || [];
if (favItems) {
  let item = favItems;
  draw_fav_products(item);
}
// دالة رسم المنتجات المفضلة
function draw_fav_products(products) {

  let y = products.map(itemofproduct => {
    return `
    <div class="col-md-3 mt-3 ">
        <div class="card h-100">
            <img src="${itemofproduct.image}" class="card-img-top" style="height:150px;">
            <div class="card-body d-flex  justify-content-between align-items-center my-2">
                <h5>${itemofproduct.name}</h5>
               <i  class="fa-solid fa-heart fs-4" style="color: rgba(230, 18, 18, 1.00); cursor: pointer;" onclick="remove_from_favourate(${itemofproduct.id})" style="cursor: pointer;"></i> 
              
            </div>
        </div>
    </div>`;
  }).join("");
  fav_products.innerHTML = y;
}


//////////////remove product from carts/////////////
function removefromcart(id) {

  addedproducts = localStorage.getItem("productincart")
    ? JSON.parse(localStorage.getItem("productincart"))
    : [];

  let filteredproduct = addedproducts.filter(item => item.id !== Number(id))
  addedproducts = filteredproduct;
  localStorage.setItem("productincart", JSON.stringify(filteredproduct));

  drawproductsincart(filteredproduct)
  //نقلل ال counter 
  let cart_notification = document.querySelector(".notification");
  cart_notification.innerHTML = filteredfav.length
}

//////////////remove product from fav////////////////
function remove_from_favourate(id) {

  let addedfav = localStorage.getItem("favproduct")
    ? JSON.parse(localStorage.getItem("favproduct"))
    : [];

  let filteredfav = addedfav.filter(item => item.id !== Number(id))
  addedfav = filteredfav;
  localStorage.setItem("favproduct", JSON.stringify(filteredfav));

  draw_fav_products(filteredfav)


}

/////////////////////////////////////////////////////////////////////////////////
// `
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
//               <button class="addtocart btn btn-danger " onclick="removefromcart(${itemofproduct.id})">remove from Cart</button>
//             </div>
//           </div>
//         </div>
//       </div>`






