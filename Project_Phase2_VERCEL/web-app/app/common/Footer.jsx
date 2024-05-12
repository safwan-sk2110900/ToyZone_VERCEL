import React from 'react'

export default function Footer() {
  return (<>
    <div className="contact">
    <h2>Contact</h2>
    <ul className="box">
      <li><a href="#">Al Shamal</a></li>
      <li><a href="#">Doha, Qatar</a></li>
      <li><a href="#">+974 55668978</a></li>
      <li><a href="#">info@toyzone.com</a></li>
    </ul>
  </div>
  <div className="information">
    <h2>Information</h2>
    <ul className="box">
      <li><a href="#">About us</a></li>
      <li><a href="#">Contact us</a></li>
      <li><a href="#">FAQs</a></li>
      <li><a href="#">Gift cards</a></li>
    </ul>
  </div>
  <div className="policies">
    <h2>Policies</h2>
    <ul className="box">
      <li><a href="#">Return policy</a></li>
      <li><a href="#">Privacy policy</a></li>
      <li><a href="#">Help center</a></li>
      <li><a href="#">Terms and conditions</a></li>
    </ul>
  </div>
  <div className="newsletter">
    <h2>newsletter</h2>
    <form action="" className="form-search">
      <input type="text" placeholder="Enter Email ID" required />
      <button className="btn" type="submit">submit</button><br /><br />
      <a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">...</svg></a>
      <a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">...</svg></a>
      <a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">...</svg></a>
    </form>
  </div>
  <div className="footer-bottom">
    <img src="images/TZ_logo.2022-768x218.png" alt="" />
    <p>All Rights reserved by Toy Zone</p>
  </div>
  </>
  )
}
