require("dotenv").config()
const express = require("express");
const cors=require("cors")
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);



const app = express();
app.use(cors())
app.use(express.json());
const path=require("path")

app.get("/",(req,res)=>{
    res.send("welcome to Apna Dukan")

})


const array = [];
 const calculateOrderAmount = (items) => {
                items.map((item) => {
                  const { price, cartQuantity } = item;
                  const cartItemAmount = price * cartQuantity;
                  return array.push(cartItemAmount);
                });
                const totalAmount = array.reduce((a, b) => {
                  return a + b;
                }, 0);
                
 
   return totalAmount*100;
 };

 app.post("/create-payment-intent", async (req, res) => {
   const { items,shipping,description } = req.body;

  
   const paymentIntent = await stripe.paymentIntents.create({
     amount: calculateOrderAmount(items),
     currency: "inr",
     automatic_payment_methods: {
       enabled: true,
     },

     description,
     shipping:{
        address:{
            line1:shipping.line1,
            line2:shipping.line2,
            city:shipping.city,
            country:shipping.countrt,
            postal_code:shipping.postal_code,

        },
        name:shipping.name,
        phone:shipping.phone,
     },
    //  receipt_email:
  });

   res.send({
     clientSecret: paymentIntent.client_secret,
   });
 });
const PORT=process.env.PORT|| 4242


app.listen(PORT, () => console.log(`Node server listening on port ${PORT}` ));
