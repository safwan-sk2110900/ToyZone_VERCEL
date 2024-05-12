//Login verification
let users
let login = document.getElementById('form5')

async function fetchCustomersAndLogin() {
    try {
        const customeresponse = await fetch('api/customers', { method: 'GET' });
        const adminsresponse = await fetch('api/admins', { method: 'GET' });
        const sellersresponse = await fetch('api/sellers', { method: 'GET' });
        const cusdata = await customeresponse.json();
        const seldata = await sellersresponse.json();
        const adminsdata = await adminsresponse.json();
        const users=[cusdata,seldata,adminsdata];
        login.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const type = document.getElementById('userType').value;

            checkLogin(username, password, users, type);
            
        });
    } catch (error) {
        console.error('Error fetching customers:', error);
    }
}

fetchCustomersAndLogin();

function checkLogin(username,password,users,type){
    if(username==0||password==0||type=="0"){
        alert("Please fill all details")
    }
    else{
        let user1
        switch(type){
            case "1":user1=users[0];break
            case "2":user1=users[1];break
            case "3":user1=users[2];break
        }
        const index = user1.findIndex(us=>us.username==username&&us.password==password)
        if(index==-1){
            alert("Invalid Username/Password")
        }
        else{
            localStorage.setItem('username',username)
            localStorage.setItem('userObject',JSON.stringify(user1[index]))
            switch(type){
                case "1":{window.location.href = "customer.html";break}
                case "2":{window.location.href = "seller.html";break}
                case "3":{window.location.href = '/summary/';break}
            }
            
           
        }
    }
}
