import fetch from "node-fetch";

const base = "https://api-m.sandbox.paypal.com";

const clientID = process.env.PAYPAL_ID;
const clientSecret = process.env.PAYPAL_SECRET;

const generateAccessToken = async () => {
  try {
    if (!clientID || !clientSecret) {
      throw new Error("MISSING_API_CREDENTIALS");
    }

    const auth = Buffer.from(clientID + ":" + clientSecret).toString("base64");

    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",

      body: "grant_type=client_credentials",

      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error.message);
  }
};
export default class PayPal {
  static createOrder = async (cart) => {
    // use the cart information passed from the front-end to calculate the purchase unit details

    console.log(
      "shopping cart information passed from the frontend createOrder() callback:",

      cart
    );

    const accessToken = await generateAccessToken();

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

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${accessToken}`,

        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:

        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/

        // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'

        // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'

        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      },

      method: "POST",

      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  };

  static captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();

    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${accessToken}`,

        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:

        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/

        // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'

        // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'

        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      },
    });

    return handleResponse(response);
  };
}

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();

    return {
      jsonResponse,

      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();

    throw new Error(errorMessage);
  }
}
