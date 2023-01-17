require("dotenv").config()
const express = require("express");
const cors=require("cors")
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);



const app = express();
app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("welcome to Apna Dukan")

})


// const calculateOrderAmount = (items) => {
 
//   return 1400;
// };

// app.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;

  
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "inr",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });
const PORT=process.env.PORT|| 4242


app.listen(PORT, () => console.log(`Node server listening on port ${PORT}` ));
