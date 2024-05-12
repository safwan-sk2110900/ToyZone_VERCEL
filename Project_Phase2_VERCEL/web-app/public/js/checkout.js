console.log("hi")


// Get username and display it
var username = localStorage.getItem("username");
const nameDisplay = document.getElementById("nameDisplay");
nameDisplay.textContent = username;

// Get cart data and product list
const cartDataString = localStorage.getItem("cart");
const cartDataParsed = JSON.parse(cartDataString);
let shoppingCart = Object.values(cartDataParsed);
let cartContainer = document.querySelector(".cart");
let productList = [];

async function checkoutdet(){
await fetch('/api/items',{method:'GET'})    
  .then((response) => response.json())
  .then((data) => {
    productList = data;
    displayCart();
  });

// Function to display cart
async function displayCart() {
  cartContainer.innerHTML = "";
  let totalPrice = 0;
  if (shoppingCart.length > 0) {
    shoppingCart.forEach((item) => {
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.dataset.id = item.product_id;
      let productIndex = productList.findIndex(
        (value) => value.id == item.product_id
      );
      let productInfo = productList[productIndex];
      cartContainer.appendChild(newItem);
      totalPrice += productInfo.price * item.quantity;
      newItem.innerHTML = `
                <div class="image">
                    <img src="${productInfo.image}">
                </div>
                <div class="name">
                    ${productInfo.name}
                </div>
                <div class="totalPrice">$${
                  productInfo.price * item.quantity
                }</div>
                <div class="quantity">
                    <span>${item.quantity}</span>
                </div>
            `;
    });
    let totalElement = document.createElement("div");
    let cart = JSON.parse(localStorage.getItem('cart'));
    let item = cart[0];
    item.total =JSON.stringify(totalPrice);
    totalPrice=item.total;
    localStorage.setItem('cart', JSON.stringify(cart));
    totalElement.innerHTML = `<p>Total Price: $${totalPrice}</p>`;
   // localStorage.setItem('total',JSON.stringify(totalPrice))
    cartContainer.appendChild(totalElement);
    //localStorage.removeItem('total');
  }
  
}
}

checkoutdet()

//Retrieve form data
const form = document.getElementById('form')

addEventListener('submit',event=>{
  event.preventDefault()
  let data = getFormData(form)
  data=data.city;
  localStorage.setItem('ShippingLocation',(data))
  window.location.href="confirm.html"
})

function getFormData(form) {
  const formData = new FormData(form);
  const data = {};
  for (const [key, value] of formData) {
    data[key] = value;
  }
  return data;
}


