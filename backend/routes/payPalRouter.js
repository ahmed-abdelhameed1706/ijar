import PayPal from "../controllers/PayPal";
import express from "express";

const payPalRouter = express.Router();

payPalRouter.post("/orders", async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals

    const { cart } = req.body;

    const { jsonResponse, httpStatusCode } = await PayPal.createOrder(cart);

    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order from /orders:", error.message);

    res.status(500).json({ error: "Failed to create order." });
  }
});

payPalRouter.post("/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    console.log("Order ID to capture:", orderID);

    const { jsonResponse, httpStatusCode } = await PayPal.captureOrder(orderID);

    console.log("Response from /orders/capture:", jsonResponse);
    console.log("HTTP Status Code from /orders/capture:", httpStatusCode);

    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error(
      "Failed to create order from /orders/capture:",
      error.message
    );

    res.status(500).json({ error: "Failed to capture order." });
  }
});

export default payPalRouter;
