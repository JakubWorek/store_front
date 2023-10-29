import { mongooseConnect } from "@/lib/mongoose";
import {buffer} from 'micro';
import {Order} from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);

const endpointSecret = "whsec_b7ee778b75c78ba7bbffd7567b2bc2d09feb5caeada8e7dae767dc9545839747";

export default async function handler(req, res) {
  await mongooseConnect();

  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      // console.log(data);
      const orderID = data.metadata.orderID;
      const paid = data.payment_status === 'paid';

      if (orderID && paid){
        await Order.findByIdAndUpdate(orderID, {paid:true});
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: {
    bodyParser: false,
  },
};