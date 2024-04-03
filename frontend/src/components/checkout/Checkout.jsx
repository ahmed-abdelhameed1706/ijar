/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import axios from "../../api/axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Message({ content }) {
  return <p>{content}</p>;
}

function Checkout({ car, daysDifference, onPaymentSuccess }) {
  const [message, setMessage] = useState("");
  const daysDifferenceRef = useRef(daysDifference);
  const initialOptions = {
    "client-id":
      "AQM4fXAlk83lZM50hiUDMHFRqfmlZ01wzLKrQ-62-QxxoQZ9i2P-gcxLgqExcFd9C9Lcptgd1Il8WqLl",
    "enable-funding": "paylater,venmo,card",
    "disable-funding": "",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };
  console.log("daysDifference-out", daysDifference);

  useEffect(() => {
    daysDifferenceRef.current = daysDifference;
  }, [daysDifference]);
  const createOrder = async () => {
    const currentDaysDifference = daysDifferenceRef.current;
    console.log("Creating order for car:", car.id);
    console.log("daysDifference:", currentDaysDifference);
    try {
      const response = await axios.post("/api/orders", {
        cart: [
          {
            car: car,
            price: car.price * currentDaysDifference,
          },
        ],
      });

      const orderData = response.data;

      if (orderData.id) {
        console.log(orderData.id);
        console.log(orderData);
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
    console.log("onApprove Order ID", data.orderID);
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

        onPaymentSuccess && onPaymentSuccess();

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
          createOrder={() => createOrder()}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default Checkout;
