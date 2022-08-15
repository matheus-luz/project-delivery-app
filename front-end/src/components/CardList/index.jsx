import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import { userContext } from '../../context/userContext';
import CardProduct from '../CardProduct';

function CardProducts() {
  const [products, setProducts] = useState();
  const { user } = useContext(userContext);
  const { setCart } = useContext(CartContext);

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
      setProducts(json);
      setCart(json.map((product) => ({ ...product, quantity: 0 })));
    }
    fetchData();
  }, [user, setCart]);

  return (
    <div className="flex flex-wrap gap-3 m-3">
      {products && products.map((product) => (
        <CardProduct key={ product.id } product={ product } />
      ))}
    </div>
  );
}

export default CardProducts;
