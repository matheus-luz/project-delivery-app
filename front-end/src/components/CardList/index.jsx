import React from 'react';
import productsMock from '../../helpers/productsMock';
import CardProduct from '../CardProduct';

function CardProducts() {
  // const [products, setProducts] = useState([]);
  const data = productsMock;
  console.log({ data });
  return (
    <>

      {
        data.map((product) => <CardProduct key={ product.id } product={ product } />)
      }
    </>
  );
}

export default CardProducts;
