import React from 'react';
// import productsMock from '../../helpers/productsMock';
import './finalizingOrder.css';

function Orders() {
  const CART = 'cart';

  const getItem = (key) => JSON.parse(localStorage
    .getItem(key)) || [];

  const productsData = getItem(CART);

  const handleClickRemoverItem = () => {
    // const product = products.filter((e) => Number(e.id) === Number(value));
    // product[0].quantity = 0;
    // console.log(products);
    // console.log(productsData);
    // console.log(product);
    // setItem(CART, );
    console.log('hello');
  };

  return (
    <div className="tabela">
      <table border="1" cellPadding="20px">
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((item, index) => (
            <tr key={ item.name }>
              <td
                data-testid={ `customer_checkout__element-
                order-table-item-number-${index}` }
              >
                {item.id}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                {item.name}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                {item.quantity}
              </td>
              <td
                data-testid={ `customer_checkout__element-order
                -table-unit-price-${index}` }
              >
                {item.price}
              </td>
              <td
                data-testid={ `customer_checkout__element-order
                -table-sub-total-${index}` }
              >
                {(item.price * item.quantity).toFixed(2)}
              </td>
              <td
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
          ))}
        </tbody>
      </table>
      <h3 data-testid="customer_checkout__element-order-total-price">
        TOTAL
        {/* funcao para somar todos os produtos */}
      </h3>
    </div>

  );
}

export default Orders;
