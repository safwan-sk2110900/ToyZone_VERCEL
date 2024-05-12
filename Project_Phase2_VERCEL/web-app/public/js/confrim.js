//const username = localStorage.getItem("username");
const userObject = JSON.parse(localStorage.getItem('userObject'));
const nameDisplay = document.getElementById("nameDisplay");
nameDisplay.textContent = userObject.username;
//Confirm payment
const card = document.querySelector('.confirmation');
let loc=localStorage.getItem("ShippingLocation");
const availableBalance = userObject.balance;
const cartitems = JSON.parse(localStorage.getItem('cart'));
const total = parseInt(cartitems[0].total);
console.log(total);

//const total = JSON.parse(localStorage.getItem('total'))
card.innerHTML = `
<h5 class="card-title">Total Price: $${total}</h5>
<p class="card-text">Available Balance: $${availableBalance}</p>
<button class="btn btn-primary confirm">Confirm</button>
`;
const cartDataString = localStorage.getItem("cart");
const cartDataParsed = JSON.parse(cartDataString);
let user = JSON.parse(localStorage.getItem('userObject'));
console.log("productid:", (cartDataParsed[0].product_id),"qty:", (cartDataParsed[0].quantity),
    "amount:", parseInt(cartDataParsed[0].total), "username:", user.username
);

async function confrimprocess() {
    try {
        const data = await fetch('/api/items', { method: 'GET' });
        const items = await data.json();

        const data2 = await fetch('/api/customers', { method: 'GET' });
        const customers = await data2.json();

        const data3 = await fetch('/api/sellers', { method: 'GET' });
        const sellers = await data3.json();

        const btn = document.querySelector('.confirm');
        btn.addEventListener('click', async (event) => {
            try {
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                if (availableBalance > total) {
                    const cartDataString = localStorage.getItem("cart");
                    const cartDataParsed = JSON.parse(cartDataString);
                    let shoppingCart = Object.values(cartDataParsed);
                    let productList = [];
                   
                    let user = JSON.parse(localStorage.getItem('userObject'));
                    let ourcart = JSON.parse(localStorage.cart);
                    let ourid = (ourcart[0].product_id);
                    let ourqty = (ourcart[0].quantity);

                    const itemind = items.findIndex((i) => i.id == ourid);
                    if (items[itemind].stock < ourqty) {
                        window.confirm("Sorry,We do not have the quantity you need ... please chose something else and come back");
                        window.location.href = "customer.html";
                        return;
                    }
                    items[itemind].stock = items[itemind].stock - ourqty;
                    let salehistory = { PID:items[itemind].id, Quantity: ourqty, User: user.username, Price: items[itemind].price*ourqty };
                    //items[itemind].salehistory.push(buyerdetail);

                    const response = await fetch(`/api/items/${items[itemind].id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(items[itemind])
                    });

                    // const response1 = await fetch(`/api/salehistory`, {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify(salehistory)
                    // });
                    const sellerIndex = sellers.findIndex((s) => s.companyName == items[itemind].seller);
                    sellers[sellerIndex].account += total;

                    const response2 = await fetch(`/api/sellers/${sellers[sellerIndex].companyName}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(sellers[sellerIndex])
                    });

                    const customerIndex = customers.findIndex((u) => u.username == user.username);
                    console.log("prodcut id: ",cartDataParsed[0].product_id , "qty: ",cartDataParsed[0].Quantity)
                    
                    //customers[customerIndex].paymenthistory.push(paymentDetails);
                    customers[customerIndex].balance -= total;
                    const userObject = JSON.parse(localStorage.getItem('userObject'));
                    userObject.balance=customers[customerIndex].balance;
                    const updatedUserObjectString = JSON.stringify(userObject);
                    localStorage.setItem('userObject', updatedUserObjectString);

                    const response3 = await fetch(`/api/customers/${customers[customerIndex].username}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(customers[customerIndex])
                    });
                    let currentdate=new Date();
                    let loc=(localStorage.getItem("ShippingLocation"));
                    let paymenthistory = {productid: parseInt(cartDataParsed[0].product_id),qty: (cartDataParsed[0].quantity),
                        amount: parseInt(cartDataParsed[0].total), username: user.username,location :loc, purchaseDate:currentdate
                    };
                    const response4 = await fetch(`/api/paymenthistory/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(paymenthistory)
                    });
                } else {
                    alert("Insufficient Balance!");
                }
            } catch (error) {
                console.error("Error in payment processing:", error);
                // Handle payment processing errors
            }
            localStorage.removeItem("ShippingLocation");
            window.location.href = "customer.html";
        });
    } catch (error) {
        console.error("Error in fetching data:", error);
        // Handle data fetching errors
    }
}

confrimprocess();
