import React from 'react';
import productsMock from '../../helpers/productsMock';

function CardProducts() {
  // const [products, setProducts] = useState([]);
  const data = productsMock;
  console.log({ data });
  return (
    <div>

      {data.map((product, index) => (
        <div key={ index }>
          {' '}
          {product.name}
        </div>
      ))}
    </div>
  );
}

export default CardProducts;
