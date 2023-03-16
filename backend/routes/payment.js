const express = require("express");
const router = express.Router();
const paypal = require("paypal-rest-sdk");

const verifyCustomerToken = require("../middleware/customerAuth");
const Bill = require("../models/Bill");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

router.post("/", verifyCustomerToken, (req, res) => {
  const { products, total } = req.body;
  const customerId = req.customerId;

  console.log(customerId);
  let itemList = [];
  let totalPrice = 0;
  for (let item of products) {
    console.log(item);
    totalPrice += item.price * item.quantity;
    itemList.push({
      name: item._id,
      sku: customerId,
      price: item.price,
      currency: "USD",
      quantity: item.quantity,
    });
  }

  let create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `http://localhost:5000/api/payment/${totalPrice}`,
      cancel_url: "http://localhost:5000/api/payment/failed",
    },
    transactions: [
      {
        item_list: {
          items: itemList,
        },
        amount: {
          currency: "USD",
          total: totalPrice,
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.json({ success: true, forwardLink: payment.links[i].href });
        }
      }
    }
  });
});

router.get("/:totalPrice", (req, res) => {
  const payerID = req.query.PayerID;
  const paymentID = req.query.paymentId;

  const totalPrice = req.originalUrl
    .replace(new RegExp("\\?payment[\\w=\\-\\&]+", "gm"), "")
    .replace("/api/payment/", "");

  console.log(req.originalUrl);

  console.log(totalPrice, "totalPrice - totalPrice");

  const execute_payment_json = {
    payer_id: payerID,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: totalPrice,
        },
      },
    ],
  };

  const createBill = async (payment) => {
    const total = payment.transactions[0].amount.total;
    const products = payment.transactions[0].item_list.items;
    const customerId = payment.transactions[0].item_list.items[0].sku;
    let array = [];
    //Validation
    if (!products)
      return res
        .status(400)
        .json({ success: false, message: "Missing Products" });
    if (!customerId)
      return res
        .status(400)
        .json({ success: false, message: "Missing CustomerId" });
    for (x in products) {
      let hold = {
        product: products[x].name,
        quantity: products[x].quantity,
        price: products[x].price,
      };

      array.push(hold);
    }

    try {
      const newBill = new Bill({
        products: array,
        total: total,
        customer: customerId,
        status: "Waiting",
      });
      await newBill.save();
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Interval server error" });
    }
  };

  paypal.payment.execute(paymentID, execute_payment_json, (error, payment) => {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment), "payment----");
      createBill(payment);
      res.redirect("http://localhost:3002/success");
    }
  });
});

module.exports = router;
