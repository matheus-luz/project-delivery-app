import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../context/userContext';
import CardProduct from '../CardProduct';

function CardProducts() {
  const [products, setProducts] = useState();
  const { user } = useContext(userContext);

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
    }
    fetchData();
  }, [user]);

  return (
    <div className="flex flex-wrap gap-3 m-3">
      {products && products.map((product) => (
        <CardProduct key={ product.id } product={ product } />
      ))}
    </div>
  );
}

export default CardProducts;
