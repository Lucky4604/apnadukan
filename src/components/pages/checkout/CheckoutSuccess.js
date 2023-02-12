import Linkify from 'react-linkify';


import { Link } from "react-router-dom";


const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>Proceed Your Payment!</h2>
       
        <br />
       <Linkify>
       <button className="--btn --btn-primary">
          
         
  <a href='https://buy.stripe.com/test_bIYbLZe7i13d0H67ss' target="_blank">
    complete your payment
  </a>
  </button> 

  
  </Linkify>


        
      </div>
    </section>
  );
};

export default CheckoutSuccess;