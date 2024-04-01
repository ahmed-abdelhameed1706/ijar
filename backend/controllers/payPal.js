import axios from "axios";

const base = "https://api-m.sandbox.paypal.com";

const clientID = process.env.PAYPAL_ID;
const clientSecret = process.env.PAYPAL_SECRET;

export default class PayPal {
  static async handleResponse(response) {
    try {
      const jsonResponse = response.data;

      return {
        jsonResponse,
        httpStatusCode: response.status,
      };
    } catch (err) {
      const errorMessage = err.response.data;

      throw new Error(errorMessage);
    }
  }

  static generateAccessToken = async () => {
    try {
      if (!clientID || !clientSecret) {
        throw new Error("MISSING_API_CREDENTIALS");
      }

      const auth = Buffer.from(clientID + ":" + clientSecret).toString(
        "base64"
      );

      const response = await axios.post(
        `${base}/v1/oauth2/token`,
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const data = response.data;

      return data.access_token;
    } catch (error) {
      console.error("Failed to generate Access Token:", error.message);
    }
  };

  static createOrder = async (cart) => {
    try {
      // use the cart information passed from the front-end to calculate the purchase unit details
      console.log("----------------");
      console.log("--------CREATE ORDER SERVICE--------");
      console.log("----------------");

      console.log(
        "shopping cart information passed from the frontend createOrder() callback:",
        cart
      );

      console.log("car Id is " + cart[0].car.id);

      const accessToken = await PayPal.generateAccessToken();
      console.log("Access Token:", accessToken);

      const url = `${base}/v2/checkout/orders`;

      const payload = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: cart[0].car.price,
            },
          },
        ],
      };

      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return PayPal.handleResponse(response);
    } catch (error) {
      console.error("Failed to create order:", error.message);
      throw new Error("Failed to create order.");
    }
  };

  static captureOrder = async (orderID) => {
    try {
      const accessToken = await PayPal.generateAccessToken();

      const url = `${base}/v2/checkout/orders/${orderID}/capture`;

      const response = await axios.post(url, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return PayPal.handleResponse(response);
    } catch (error) {
      console.error("Failed to capture order:", error);
      throw new Error("Failed to capture order.");
    }
  };
}
