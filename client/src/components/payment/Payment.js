import React from 'react';
import ReactDOM from 'react-dom';
import './payment.sass';

function Payment(props) {
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

    const createOrder = (data, actions) =>{
      console.log('order object', {
        purchase_units: [
          {
            amount: {
              value: `${props.amount}`,
            },
            description: props.description,
            payee: {
              email_address: props.email
            }
          },
        ],
      });
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: `${props.amount}`,
            },
            description: props.description,
            payee: {
              email_address: props.email
            }
          },
        ],
      });
    };
  
    const onApprove = (data, actions) => {
      props.onApprove();
      return actions.order.capture();
    };

    return (
        <div className='Payment'>
            <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />
        </div>
    );
}

export default Payment;

//4032039844977274