import React from 'react';
import AdressDetails from '../../components/checkout/AdressDetails';
import FinalizarPedido from '../../components/checkout/FinalizarPedido';

function Checkout() {
  return (
    <div>
      <FinalizarPedido />
      <AdressDetails />
    </div>
  );
}

export default Checkout;
