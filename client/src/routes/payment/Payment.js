import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

function Payment(props) {
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

    const createOrder = (data, actions) =>{
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "500.00",
            },
            description: 'location 26',
            payee: {
              email_address: 'sb-ekrqr6182949@business.example.com'
            }
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

//4032039844977274