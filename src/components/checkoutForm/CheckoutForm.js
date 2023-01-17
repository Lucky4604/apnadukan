import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Card from '../card/Card';
import CheckoutSumm from '../checkoutSumm/CheckoutSumm';
import styles from './CheckoutForm.module.scss'


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const saveOrder=()=>{
        console.log("order saved")

    }

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
    
        if (!stripe || !elements) {
          return;
        }
    
        setIsLoading(true);
    }
    const confirmPayment =  stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required",
    
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
  
     
  return (
    <section>
        <div className={`container ${styles.checkout}`}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <Card cardClass={styles.card}>
              <CheckoutSumm />
            </Card>
          </div>
          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <h3>Stripe Checkout</h3>
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
  )
}

export default CheckoutForm