let purno=1;
const payment=document.querySelector(".pay-hist");
//const storedValue = localStorage.getItem("currenthist");
async function getpaymenthistory() {
    
  try {
    payment.innerHTML = '<div class="loading-icon"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
      
      const userObject = JSON.parse(localStorage.getItem('userObject'));
      const uname = userObject.username;

      const response = await fetch(`/api/paymenthistory/${uname}`, { method: 'GET' });
      if (!response.ok) {
          throw new Error(`Failed to fetch customer data. Status: ${response.status}`);
      }

      const paymenthistory = await response.json();
      //const custname=paymenthistory[0].customer.name;
      //console.log('Customer data:', custname);
      
      const storedValue = paymenthistory;
      console.log('Payment history:', storedValue);

      if (storedValue.length === 0) {
          payment.innerHTML = `<h3>Sorry, no payment history available</h3>`;
      } else {
        paymenthistory.map((f) => console.log(f));
          payment.innerHTML = paymenthistory.map((f) => eachrecord(f)).join('');
          
      }

  } catch (error) {
      console.error('Error fetching payment history:', error);
      payment.innerHTML = `<h3>Error fetching payment history. Please try again later.</h3>`;
  }
  const backButton = document.createElement("button");
  backButton.textContent = "Back";
  backButton.classList.add("back-button");
  backButton.addEventListener("click", goBack);
  payment.appendChild(backButton)



function goBack() {
    window.location.href="customer.html"
}


function eachrecord(f) {
 
  return `<table class="purchase-table">
      <tr>
          <th colspan="2" class="purchase-header">Purchase No ${purno++}</th>
      </tr>
      <tr>
          <td class="purchase-label">Purchased Item Name:</td>
          <td class="purchase-data"> ${f.item.name}</td>
      </tr>
      <tr>
      <td class="purchase-label">Purchased Item:</td>
      <td class="purchase-data"><img src="${f.item.image}" class="product-image"></td>
          <td class="purchase-label">Purchased Quantity:</td>
          <td class="purchase-data">${f.qty}</td>
          <td class="purchase-label">Total Amount:</td>
          <td class="purchase-data">${f.amount}</td>
      </tr>
  </table>`;
}


}
getpaymenthistory();
