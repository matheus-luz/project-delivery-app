import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CardOrders() {
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState();
  const [renderOrders, setRenderOrders] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const URL = `http://localhost:3001${location.pathname}`;
  let route;

  const getRoute = () => {
    if (URL.includes('seller')) {
      route = 'seller';
    } if (URL.includes('customer')) {
      route = 'customer';
    }
    return route;
  };
  route = getRoute();

  const getItem = (key) => JSON.parse(localStorage.getItem(key)) || [];

  useEffect(() => {
    (async () => {
      const user = await getItem('user');
      setUserData(user);
      setRenderOrders(true);
    })();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(URL, {
        method: 'GET',
        headers: {
          authorization: userData.token,
        },
      }).then((response) => response.json());
      setOrders(data);
    }
    if (renderOrders) {
      fetchData();
      setRenderOrders(false);
    }
  }, [renderOrders, userData, orders, URL]);

  const handleDetails = (id) => {
    navigate(`${id}`);
  };

  return (
    <div>
      {
        orders.map((order) => (
          <button
            key={ order.id }
            type="button"
            onClick={ () => handleDetails(order.id) }
          >
            <p data-testid={ `${route}_orders__element-order-${order.id}` }>
              000
              {order.id}
            </p>
            <p data-testid={ `${route}_orders__element-delivery-status-${order.id}` }>
              {order.order.satus}
            </p>
            <p data-testid={ `${route}_orders__element-order-date-${order.id}` }>
              {order.order.saleDate}
            </p>
            <p data-testid={ `${route}_orders__element-card-price-${order.id}` }>
              R$
              {order.order.totalPrice}

            </p>
            <p data-testid={ `${route}_orders__element-card-address-${order.id}` }>
              {`${order.order.address}, ${order.order.adressNumber}`}
            </p>
          </button>
        ))
      }
    </div>
  );
}
