
const toyform=document.querySelector(".toys-form");

function formToObject(form){
    const formData=new FormData(form);
    console.log(formData);
    const data={};
    for (const[key,value] of formData){
        data[key]=value;
    }
    return data;
}
//let newobj=Object.create(null);
//let newid=30;
async function addToy(e) {
    e.preventDefault();
    const response = await fetch(`/api/items`, { method: 'GET' });
    if (!response.ok) {
        throw new Error(`Failed to fetch Items data. Status: ${response.status}`);
    }
    const items = await response.json();
    const user = JSON.parse(localStorage.userObject);
    const toyform = document.querySelector(".toys-form");
    const formData = formToObject(toyform);
    console.log(formData)
    //const newidString = formData.image.match(/\d+/)[0];
    //const newid = parseInt(newidString);
    const itemExists = items.some((item) => item.name === formData.name);
    if (itemExists){
            alert("Item Already Exists , aborting....");
            window.location.href="seller.html"
    }
    else{
    alert(JSON.stringify(formData));
    console.log(formData)
    formData.stock=parseInt(formData.stock)
    formData.price=parseFloat(formData.price)
    formData.seller=user.companyName;
    formData.type="item";
    formData.discount=0;
    console.log(formData)
    const response = await fetch(`/api/items/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    console.log(JSON.stringify(formData));
    //form.reset();
    window.location.href="seller.html"
    }

}


function closeupload(){
    window.location.href="seller.html"
}
toyform.addEventListener('submit', addToy);
toyform.addEventListener('reset',closeupload)