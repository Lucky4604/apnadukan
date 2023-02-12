import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount } from "../../Redux/slice/cartSlice";
import { selectEmail } from "../../Redux/slice/authSlice";
import { selectBillingAddress, selectShippingAddress } from "../../Redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../checkoutForm/CheckoutForm";


const stripePromise = loadStripe("pk_test_51MQwPXSGt4ARocIAIfnAFvFcjVSYHj1xtkD9rgWp3RO4PzQQf3Rs3kJCYYo3xbM5i8hJpgRy3e15lECFxKP7o02h00BFVVnYPp");

const Checkout = () => {
    const [message, setMessage] = useState("Initializing Checkout");
    const [clientSecret, setClientSecret] = useState("");

    const item = useSelector(selectCartItems);
    const amount = useSelector(selectCartTotalAmount);
    const email = useSelector(selectEmail);
    const shipping = useSelector(selectShippingAddress);
    const billing = useSelector(selectBillingAddress);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CALCULATE_SUBTOTAL);
        dispatch(CALCULATE_TOTAL_QUANTITY);
    }, [dispatch, item]);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/http://localhost:4242/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
             items: item,
             emails:email,
             shippingDetails:shipping,
             billingDetails:billing,
             }),
        })
          .then((res) => res.json())
          
          .then((data) => setClientSecret(data.clientSecret));
      }, []);
    
      const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };
    return (
        <>
            <section>
                <div className="container">
                    {!clientSecret && <h3>{message}</h3>}
                    

        </div>
    </section>
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    
    </>
  )
}

export default Checkout