import React from 'react';
import ReactDOM from 'react-dom';

function Payment(props) {
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

    const createOrder = (data, actions) =>{
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "500.00",
            },
          },
        ],
      });
    };
  
    const onApprove = (data, actions) => {
      return actions.order.capture();
    };

    return (
        <div>
            Payment Works!
            <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />
        </div>
    );
}

export default Payment;