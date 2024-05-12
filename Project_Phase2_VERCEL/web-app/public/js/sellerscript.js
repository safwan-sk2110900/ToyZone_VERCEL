let itemsContainer = document.querySelector(".items");
let originalContent = ''; 

async function handlesellerpage(){
    const response = await fetch(`/api/items`, { method: 'GET' });
    if (!response.ok) {
        throw new Error(`Failed to fetch Items data. Status: ${response.status}`);
    }
    const items = await response.json();
    
    let user = JSON.parse(localStorage.userObject);
    let filtereditems = items.filter((i) => i.seller == user.companyName);
    let sellerAccount = document.querySelector(".sellerBalance");
    let sellerAmount = user.account;
    sellerAccount.innerHTML=`<h4>Balance: ${sellerAmount} QAR</h4>` 
    uploadbutton=document.querySelector(".upload-bt")
    async function displayItems() {
        itemsContainer.innerHTML=''
        filtereditems.forEach((item) => {
            let newItem = document.createElement("div");
            newItem.dataset.id = item.id;
            newItem.classList.add("card");
            newItem.classList.add("card-body");
            newItem.innerHTML = `<img src="${item.image}" alt="">
                      <h2 class="card-title">${item.name}</h2>
                      <div class="price">$${item.price}</div>
                      <p> Stock Status : ${item.stock === 0 ? 'OUT OF STOCK' : item.stock} </p>
                      <p class="card-text">${item.desc}</p>
                      <button class="addCart btn btn-primary" onclick="viewdetails(${item.id})">View Details</button><br>
                      `;
            itemsContainer.appendChild(newItem); 
        });
    }
    displayItems()
    const searchBtn = document.querySelector(".search-btn")
    const searchBar = document.getElementById("#search")
      searchBtn.addEventListener("click", async function () {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredItems1 = filtereditems.filter((item) =>
          item.name.toLowerCase().includes(searchTerm)
        );
        filtereditems = filteredItems1;
        displayItems();
      });

    uploadbutton.addEventListener("click",uploadfunc);
    function uploadfunc(){
    window.location.href="upload.html"
    }

}


handlesellerpage();


async function viewdetails(id) {
    const response = await fetch(`/api/items`, { method: 'GET' });
    if (!response.ok) {
        throw new Error(`Failed to fetch Items data. Status: ${response.status}`);
    }
    const items = await response.json();
    const ouritem = items.find((i) => i.id == id);
    console.log(ouritem);

    originalContent = itemsContainer.innerHTML;
    //itemsContainer.innerHTML=<h2> <b>PRODUCT SALE HISTORY</b></h2>
    if (ouritem.paymenthistory.length==0){
        itemsContainer.innerHTML=`<h2> Sorry , no one purchased your product</h2> <br>`
    }
    else{
    itemsContainer.innerHTML = ouritem.paymenthistory.map(eachrecord).join("");}
    function eachrecord(f){ 
        
        return `<table class="Product Sale History">
                
                <tr>
                  <td class="purchase-label">Purchaser Username:</td>
                  <td class="purchase-data">${f.username}</td>
                </tr>
                <tr>
                  <td class="purchase-label">Purchased Quantity:</td>
                  <td class="purchase-data">${f.qty}</td>
                  <td class="purchase-label">Selling Price of Each Product</td>
                  <td class="purchase-data">${f.amount}</td>
                </tr>
              </table>`;
    }
    const backButton = document.createElement("button");
    const updatebutton=document.createElement("button")
    updatebutton.textContent="Update Stock"
    backButton.textContent = "Back";
    updatebutton.classList.add("update-stock");
    backButton.classList.add("back-button");
    backButton.addEventListener("click", goBack);
    updatebutton.addEventListener('click',stockupd);
    itemsContainer.appendChild(updatebutton);
    itemsContainer.appendChild(backButton)
    


    async function stockupd(){
        itemsContainer.innerHTML=createform();
        const newform=document.querySelector(".updateForm");
        newform.addEventListener('submit',updatesotckfun);
    }
    async function updatesotckfun(e){
        e.preventDefault();
        const response1 = await fetch(`/api/items`, { method: 'GET' });
        if (!response1.ok) {
            throw new Error(`Failed to fetch Items data. Status: ${response.status}`);
                 }
        const items = await response1.json();
         const newstock=formToObject(e.target);

        const indexof=items.findIndex((i)=>i.id==id);
        items[indexof].stock=parseInt(newstock.newStock);

        const response = await fetch(`/api/items/${items[indexof].id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(items[indexof])
        });

        confirm("stock updated succesfully");

        window.location.href="seller.html";
        console.log(newstock);
        console.log("Iteem is: ",items[indexof])
        
    }

}

function createform(){
    return `<h2>Update Stock</h2>
    <form class="updateForm" id="updateStockForm">
    <label for="newStock">New Stock:</label>
    <input type="number" id="newStock" name="newStock" required>
    <br><br>
    <button type="submit"  value="Submit">Submit</button>
    <button type="click" onclick="goBack()">Go Back</button>
        </form>`
}

    

function goBack() {
    window.location.href="seller.html"
}






function formToObject(form){
    const formData=new FormData(form);
    console.log(formData);
    const data={};
    for (const[key,value] of formData){
        data[key]=value;
    }
    return data;
}