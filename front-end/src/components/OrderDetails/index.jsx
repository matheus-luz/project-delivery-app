import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

export default function OrderDetails({ userRole }) {
  const [order, setOrder] = useState({ seller: {}, products: [{ salesProducts: {} }] });
  const [userData, setUserData] = useState();
  const [renderOrder, setRenderOrder] = useState(false);
  const location = useLocation();

  const getItem = (key) => JSON.parse(localStorage.getItem(key)) || [];

  useEffect(() => {
    (async () => {
      const user = await getItem('user');
      setUserData(user);
      setRenderOrder(true);
    })();
  }, []);

  async function fetchData() {
    fetch(`http://localhost:3001${location.pathname}`, {
      method: 'GET',
      headers: {
        authorization: userData.token,
      },
    }).then((response) => response.json())
      .then((data) => setOrder(data));
  }

  useEffect(() => {
    if (renderOrder) {
      fetchData();
      setRenderOrder(false);
    }
  }, [renderOrder]);

  const setAsDelivered = (id) => {
    fetch(`http://localhost:3001/customer/orders/update/${id}`, {
      method: 'PATCH',
      headers: {
        authorization: userData.token,
      },
    }).then(setRenderOrder(true));
  };

  const updateStatus = (id, status) => {
    fetch(`http://localhost:3001/seller/orders/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: userData.token,
      },
      body: JSON.stringify({ status }),
    }).then(setRenderOrder(true));
  };

  return (
    <div>
      <h2>Detalhes do Pedido</h2>
      <p
        data-testid={ `${userRole}_order_details__element-order-details-label-order-id` }
      >
        PEDIDO
        {' '}
        {order.id}
      </p>
      {userRole === 'customer' ? (
        <p
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          P. VEND:
          {' '}
          {order.seller.name}
        </p>) : null}
      <p
        data-testid={
          `${userRole}_order_details__element-order-details-label-order-date`
        }
      >
        {order.saleDate}
      </p>
      <span
        data-testid={
          `${userRole}_order_details__element-order-details-label-delivery-status`
        }
      >
        {order.status}
      </span>
      {userRole === 'customer' ? (
        <button
          onClick={ () => setAsDelivered(order.id) }
          type="button"
          data-testid="customer_order_details__button-delivery-check"
        >
          Marcar como entregue
        </button>)
        : (
          <div>
            <button
              onClick={ () => updateStatus(order.id, 'Preparando') }
              type="button"
              data-testid="seller_order_details__button-preparing-check"
            >
              PREPARAR PEDIDO
            </button>
            <button
              onClick={ () => updateStatus(order.id, 'Em Trânsito') }
              type="button"
              data-testid="seller_order_details__button-dispatch-check"
            >
              SAIU PARA ENTREGA
            </button>
          </div>)}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map(({ id, name, salesProducts, price }, index) => (
            <tr
              key={ id }
            >
              <td
                data-testid={
                  `${userRole}_order_details__element-order-table-item-number${id}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `${userRole}_order_details__element-order-table-name-${id}`
                }
              >
                {name}
              </td>
              <td
                data-testid={
                  `${userRole}_order_details__element-order-table-quantity-${id}`
                }
              >
                {salesProducts.quantity}
              </td>
              <td
                data-testid={
                  `${userRole}_order_details__element-order-table-unit-price-${id}`
                }
              >
                {`R$ ${price}`}
              </td>
              <td
                data-testid={
                  `${userRole}_order_details__element-order-table-sub-total-${id}`
                }
              >
                {`R$ ${(Number(price) * salesProducts.quantity).toFixed(2)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p data-testid={ `${userRole}_order_details__element-order-total-price` }>
        TOTAL:
        {' '}
        {order.totalPrice}
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  userRole: PropTypes.string.isRequired,
};
