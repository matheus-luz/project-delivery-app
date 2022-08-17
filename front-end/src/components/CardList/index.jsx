import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../context/cartContext';
import { userContext } from '../../context/userContext';
import { getProducts } from '../../utils/localStorage';
import CardProduct from '../CardProduct';

function CardProducts() {
  const { user } = useContext(userContext);
  const { setCart, cart } = useContext(CartContext);

  useEffect(() => {
    async function fetchData() {
      const localProducts = getProducts();

      const response = await fetch('/api/customer/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: user.token,
        },
      });
      const json = await response.json();
      const requestCart = json.map((product) => ({ ...product, quantity: 0 }));
      // compare products from localProducts and request card and return new array with biggest quantity
      const finalCart = requestCart.map((product) => {
        const requestProduct = localProducts.find((item) => item.id === product.id);
        return { ...product, quantity: requestProduct ? requestProduct.quantity : 0 };
      });
      setCart(finalCart);
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
