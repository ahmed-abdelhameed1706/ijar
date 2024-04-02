import axios from "axios";
import e from "express";

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
              value: cart[0].price,
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

      const orderData = PayPal.handleResponse(response);
      console.log("Response from PayPal.js:", orderData);

      return orderData;
    } catch (error) {
      console.error("Failed to create order from paypal.js:", error.message);
    }
  };

  static async getApprovalLink(orderID) {
    return `https://www.sandbox.paypal.com/checkoutnow?token=${orderID}`;
  }

  static captureOrder = async (orderID) => {
    console.log("----------------");
    console.log("--------CAPTURE ORDER SERVICE--------");
    console.log("----------------");
    try {
      const accessToken = await PayPal.generateAccessToken();
      console.log("Access Token from capture:", accessToken);

      const url = `${base}/v2/checkout/orders/${orderID}/capture`;

      console.log("url is " + url);

      const response = await axios.post(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Response from captureOrder:", response.data);
      console.log("HTTPResponse from captureOrder:", response.status);

      const data = PayPal.handleResponse(response);

      return data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Failed to capture order from paypal.js:",
          error.response.data,
          error.response.status
        );
      } else if (error.request) {
        console.error("Failed to capture order from paypal.js:", error.request);
      } else {
        console.error("Failed to capture order from paypal.js:", error.message);
      }

      throw error;
    }
  };
}
