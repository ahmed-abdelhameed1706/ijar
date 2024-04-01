import PayPal from "../controllers/payPal";
import express from "express";

const payPalRouter = express.Router();

payPalRouter.post("/orders", async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals

    const { cart } = req.body;

    const { jsonResponse, httpStatusCode } = await PayPal.createOrder(cart);

    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);

    res.status(500).json({ error: "Failed to create order." });
  }
});

payPalRouter.post("/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;

    const { jsonResponse, httpStatusCode } = await PayPal.captureOrder(orderID);

    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);

    res.status(500).json({ error: "Failed to capture order." });
  }
});

export default payPalRouter;
