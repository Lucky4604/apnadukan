import React, { useEffect, useState } from "react";
import styles from './CheckoutForm.module.scss'
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import Card from "../card/Card";
import CheckoutSumm from "../checkoutSumm/CheckoutSumm";
import { toast } from "react-toastify";

const CheckoutForm=() =>{
  const stripe = useStripe();
  const elements = useElements();

  

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    
  }, [stripe]);

  const saveOrder=()=>{
    console.log("order saved")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      
      return;
    }

    setIsLoading(true);

    

    const confirmPayment = await stripe.confirmPayment({
      elements,
      confirmParams: {
        
        return_url: "http://localhost:3000",
    },
      redirect_url:"if_required"
    })
    .then((result) => {
        // ok - paymentIntent // bad - error
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
            if (result.paymentIntent.status === "succeeded") {
              setIsLoading(false);
              toast.success("Payment successful");
              saveOrder();
            }
          }
        });
        setIsLoading(false);
    };

    
    

    

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
<section>
    <div className={`container ${styles.checkout }`}>
        <h2>checkout</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <Card cardClass={styles.card}>
                    <CheckoutSumm/>
                </Card>
            </div>
            <div>
                <Card cardClass={`styles.card ${styles.pay}`}>
                    <h3> Stripe Checkout</h3>
                    <PaymentElement id={styles["payment-element"]} />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className={styles.button}
              >
                <span id="button-text">
                  {isLoading ? (
                    <img
                      src={""}
                      alt="Loading..."
                      style={{ width: "20px" }}
                    />
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id={styles["payment-message"]}>{message}</div>}
                </Card>
            </div>
        </form>
    </div>
</section>
  );
}
export default CheckoutForm