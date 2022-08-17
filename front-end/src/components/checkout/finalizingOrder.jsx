import React from 'react';
import productsMock from '../../helpers/productsMock';

function FinalizarPedido() {
  const productsData = productsMock; // precisa pegar dadose colocar no lugar do mock
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
                {item.price * item.quantity}
                {/* funcao para somar preços de produtos individuais */}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              >
                <button
                  type="button"
                // onClick={ () => handleClickRemoverItem() } funcao para remover o item
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

export default FinalizarPedido;
