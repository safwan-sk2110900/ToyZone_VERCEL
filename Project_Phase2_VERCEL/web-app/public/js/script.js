async function getallitems(){
  document.querySelector('.loading-spinner').style.display = 'block';
const data = await fetch('/api/items',{method:'GET'})    
items = await data.json()
document.querySelector('.loading-spinner').style.display = 'none';
//payment history buttonC
const paytb=document.querySelector(".paymentbutton")
paytb.addEventListener('click',payt);

async function payt(){
  const stored=localStorage.getItem("userObject");
  if (stored==null){
    alert("Please LOGIN to see payment history")
  }
  else{
    window.location.href="paymenthist.html"
  }
}


//----------------------------------------------------------------------------------------------------------------------

//Products, items, shopping cart
let itemList = document.querySelector(".items");
let cartList = document.querySelector(".cart");
let featuredList = document.querySelector(".featured")
let killerList = document.querySelector(".killer")
let girlList = document.querySelector(".girls")
let boyList = document.querySelector(".boys")
let iconCart = document.querySelector(".icon-cart");
let itemsContainer = document.querySelector(".container");
let iconCartSpan = document.querySelector(".icon-cart span");
let body = document.querySelector("body");
let cartClose = document.querySelector(".close");

let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
cartClose.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

async function addKiller() {

  // add new datas
  if (items.length > 0) {
    // if has data
    
    const filitem=items.filter((i)=>i.stock>0)
    const filitem2 =filitem.filter((i)=>i.type=="killer")
    filitem2.forEach((item) => {
      let newItem = document.createElement("div");
      newItem.dataset.id = item.id;
      newItem.classList.add("product-card");
      newItem.innerHTML = ` <div class="product-image" data-id=${item.id}>
      <span class="discount-tag">${item.discount}% off</span>
      <img src="${item.image}" class="product-thumb" alt="">
      <button class="addCart card-btn">add to cart</button>
  </div>
  <div class="product-info">
      <h2 class="product-brand">Brand</h2>
      <p class="product-short-description">${item.name} </p>
      <span class="price">QR ${item.price}</span><span class="actual-price">QR ${item.price*((100+item.discount)/100)}</span>
  </div>
                `;
      killerList.appendChild(newItem);
    });
  }
};

//Killer offers script for scroll
const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})
async function addGirls () {

  // add new datas
  if (items.length > 0) {
    // if has data
    
    const filitem=items.filter((i)=>i.stock>0)
    const filitem2 =filitem.filter((i)=>i.gender=="girls")
    filitem2.forEach((item) => {
      let newItem = document.createElement("div");
      newItem.dataset.id = item.id;
      newItem.classList.add("card");
      newItem.classList.add("card-body");
      newItem.innerHTML = `<img src="${item.image}" alt="">
                <h2 class="card-title">${item.name}</h2>
                <div class="price">$${item.price}</div>
                <p class="card-text">${item.desc}</p>
                <button class="addCart btn btn-primary">Add To Cart</button>
                `;
      girlList.appendChild(newItem);
    });
  }
};
async function addBoys()  {

  // add new datas
  if (items.length > 0) {
    // if has data
    
    const filitem=items.filter((i)=>i.stock>0)
    const filitem2 =filitem.filter((i)=>i.gender=="boys")
    filitem2.forEach((item) => {
      let newItem = document.createElement("div");
      newItem.dataset.id = item.id;
      newItem.classList.add("card");
      newItem.classList.add("card-body");
      newItem.innerHTML = `<img src="${item.image}" alt="">
                <h2 class="card-title">${item.name}</h2>
                <div class="price">$${item.price}</div>
                <p class="card-text">${item.desc}</p>
                <button class="addCart btn btn-primary">Add To Cart</button>
                `;
      boyList.appendChild(newItem);
    });
  }
};
async function addToHTML () {

  // add new datas
  if (items.length > 0) {
    // if has data
    
    const filitem=items.filter((i)=>i.stock>0)
    const filitem2 =filitem.filter((i)=>i.type=="item")
    filitem2.forEach((item) => {
      let newItem = document.createElement("div");
      newItem.dataset.id = item.id;
      newItem.classList.add("card");
      newItem.classList.add("card-body");
      newItem.innerHTML = `<img src="${item.image}" alt="">
                <h2 class="card-title">${item.name}</h2>
                <div class="price">$${item.price}</div>
                <p class="card-text">${item.desc}</p>
                <button class="addCart btn btn-primary">Add To Cart</button>
                `;
      itemList.appendChild(newItem);
    });
  }
};
async function addFeatured () {

  // add new datas
  if (items.length > 0) {
    // if has data
    
    const filitem=items.filter((i)=>i.stock>0)
    const filitem2 =filitem.filter((i)=>i.type=="featured")
    filitem2.forEach((item) => {
      let newItem = document.createElement("div");
      newItem.dataset.id = item.id;
      newItem.classList.add("card");
      newItem.classList.add("card-body");
      newItem.innerHTML = `<img src="${item.image}" alt="">
                <h2 class="card-title">${item.name}</h2>
                <div class="price">$${item.price}</div>
                <p class="card-text">${item.desc}</p>
                <button class="addCart btn btn-primary">Add To Cart</button>
                `;
      featuredList.appendChild(newItem);
    });
  }
};

itemsContainer.addEventListener('click',(event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addCart")) {
    let id_product = positionClick.parentElement.dataset.id;
   
    addToCart(id_product);
  }
})


async function addToCart  (product_id)  {
  if (!Array.isArray(cart)) {
    cart = [];
  }
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1
      }
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1
    });
  } else {
    cart[positionThisProductInCart].quantity++
  }
  addCartToHTML();
  addCartToMemory();
};
async function addCartToMemory  ()  {
  localStorage.setItem("cart", JSON.stringify(cart));
};
async function  addCartToHTML  ()  {
  cartList.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.dataset.id = item.product_id;

      let positionProduct = items.findIndex(
        (value) => value.id == item.product_id
      );
      let info = items[positionProduct];
      cartList.appendChild(newItem);
      newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
    });
  }
  iconCartSpan.innerText = totalQuantity;
};

cartList.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(product_id, type);
  }
});
const changeQuantityCart = (product_id, type) => {
  let itemPostition = cart.findIndex((value) => value.product_id == product_id);
  if (itemPostition >= 0) {
    let info = cart[itemPostition];
    switch (type) {
      case "plus":
        info.quantity = info.quantity + 1;
        break;

      default:
        let changeQuantity = info.quantity - 1;
        if (changeQuantity > 0) {
          info.quantity = changeQuantity;
        } else {
          cart.splice(itemPostition, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};

async function initApp(){
      addToHTML();
      addFeatured();
      addKiller();
      addBoys();
      addGirls();
      // get data cart from memory
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }

      // Listen for input in the search box
      const searchBtn = document.querySelector(".search-btn")
      const searchBar = document.getElementById("#search")
      searchBtn.addEventListener("click", function () {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredItems = items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm)
        );
        displayItems(filteredItems);
      });
    
  }
initApp();

//----------------------------------------------------------------------------------------------------------------------

//Searching for items

// Load items from items.json

// Function to display items
async function displayItems(items) {
  const searchTitle = document.querySelector(".searchResults");
  const slider = document.querySelector(".slider-wrapper");
  slider.style.display = "none"
  searchTitle.textContent = "Search Results"
  searchTitle.style.textAlign = "center"
  itemsContainer.innerHTML = "";
  itemsContainer.classList.add("items")
  const filitem=items.filter((i)=>i.stock>0)
  filitem.forEach((item) => {
    let newItem = document.createElement("div");
    newItem.dataset.id = item.id;
    newItem.classList.add("card");
    newItem.classList.add("card-body");
    newItem.innerHTML = `<img src="${item.image}" alt="">
              <h2 class="card-title">${item.name}</h2>
              <div class="price">$${item.price}</div>
              <p class="card-text">${item.desc}</p>
              <button class="addCart btn btn-primary">Add To Cart</button>
              `;
    itemsContainer.appendChild(newItem);
  });
}}

getallitems()

//Initial calls


//----------------------------------------------------------------------------------------------------------------------
//Login Verification so customer can checkout
function isLoggedIn() {
  var username = localStorage.getItem("username");
  if (username) {
    window.location.href = "checkout.html";
  } else {
    window.location.href = "login.html";
  }
}
