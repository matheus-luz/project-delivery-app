import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../context/cartContext';
import { userContext } from '../../context/userContext';
import CardProduct from '../CardProduct';

function CardProducts() {
  const { user } = useContext(userContext);
  const { setCart, cart } = useContext(CartContext);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/customer/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: user.token,
        },
      });
      const json = await response.json();
      setCart(json.map((product) => ({ ...product, quantity: 0 })));
    }
    if (user.token) fetchData();
  }, [user, setCart]);

  return (
    <div className="flex flex-wrap gap-3 m-3">
      {cart && cart.map((product) => (
        <CardProduct key={ product.id } product={ product } />
      ))}
    </div>
  );
}

export default CardProducts;
