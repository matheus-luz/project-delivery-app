import React, { useEffect, useState } from 'react';
import { getProducts, setProducts } from '../../utils/localStorage';
import getTotalPrice from '../../utils/totalPrice';

function Orders() {
  const [productsData, setProductsData] = useState([]);
  const [render, setRender] = useState([]);

  useEffect(() => {
    const retrieveProducts = async () => {
      const products = await getProducts();
      setProductsData(products);
      setRender(false);
    };
    if (render) retrieveProducts();
  }, [render]);

  const handleClickRemoverItem = ({ target: { value } }) => {
    const filteredProducts = productsData.filter((e) => Number(e.id) !== Number(value));
    setProducts(filteredProducts);
    setRender(true);
  };

  return (
    <div className="p-3 border border-1 border-gray-300 shadow-md flex flex-col">
      <table
        className={ `border 
        border-none 
        table-auto
        gap-3
        border-separate 
        border-spacing-y-1` }
      >
        <thead>
          <tr className="text-sm text-gray-700">
            <th className="font-normal">Item</th>
            <th className="font-normal">Descrição</th>
            <th className="font-normal">Quantidade</th>
            <th className="font-normal">Valor Unitário</th>
            <th className="font-normal">Sub-total</th>
            <th className="font-normal">Remover Item</th>
          </tr>
        </thead>
        <tbody>
          { productsData.map((item, index) => (
            <tr key={ item.name }>
              <td
                className={ `bg-trybe-primary-light 
                px-2 
                text-center 
                rounded-l-md
                text-lg
                font-bold
                text-trybe-primary-dark` }
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                className={ `bg-gray-100
                font-bold
                text-trybe-primary-dark
                px-2
                pr-20` }
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                {item.name}
              </td>
              <td
                className={ `bg-trybe-primary
                text-center
                px-2
                  text-medium
                  text-white
                ` }
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                {item.quantity}
              </td>
              <td
                className={ `bg-trybe-purple
                px-10
                text-medium
                text-white
              ` }
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {item.price.replace(/\./, ',')}
              </td>
              <td
                className={ `bg-trybe-blue
                px-10
                text-medium
                text-white` }
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {(item.price * item.quantity).toFixed(2).replace(/\./, ',')}
              </td>
              <td
                className="bg-trybe-primary-light px-2 py-1 text-white rounded-r-md"
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              >
                <button
                  onClick={ handleClickRemoverItem }
                  type="button"
                  value={ item.id }
                >
                  Remover
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      <h3
        className={ `self-end 
        bg-trybe-primary 
        text-end 
        text-white 
        text-xl
        font-bold
        py-1 
        px-2
        mt-5
        rounded-lg` }
      >
        Total: R$
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          { getTotalPrice(productsData).replace(/\./, ',') }
        </span>
      </h3>
    </div>

  );
}

export default Orders;
