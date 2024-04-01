import React, { useState } from "react";
import axios from "../../api/axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Message({ content }) {
  return <p>{content}</p>;
}

function Checkout({ car, daysDifference, pickUp, dropOff }) {
  const initialOptions = {
    "client-id": "test",
    "enable-funding": "paylater,venmo,card",
    "disable-funding": "",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  const [message, setMessage] = useState("");

  const createOrder = async () => {
    console.log("Creating order for car:", car.id);
    console.log("Days:", daysDifference);
    console.log("Pick-up:", pickUp);
    console.log("Drop-off:", dropOff);
    try {
      const response = await axios.post("/api/orders", {
        cart: [
          {
            car: car,
            // days: daysDifference,
          },
        ],
      });

      const orderData = response.data;

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setMessage(`Could not initiate PayPal Checkout...${error}`);
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const response = await axios.post(`/api/orders/${data.orderID}/capture`);

      const orderData = response.data;

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        const transaction = orderData.purchase_units[0].payments.captures[0];

        setMessage(
          `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
        );

        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
      }
    } catch (error) {
      console.error(error);
      setMessage(`Sorry, your transaction could not be processed...${error}`);
    }
  };

  return (
    <div className="Checkout">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{ shape: "pill", layout: "vertical" }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default Checkout;
