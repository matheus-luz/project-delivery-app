import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getItem } from '../../utils/localStorage';

export default function CardOrders() {
  const [orders, setOrders] = useState([]);
  const [renderOrders, setRenderOrders] = useState(false);
  const [userData, setUserData] = useState();
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

  useEffect(() => {
    setRenderOrders(true);
  }, [userData]);

  useEffect(() => {
    async function fetchData() {
      const user = getItem('user');
      setUserData(user);
      const data = await fetch(URL, {
        method: 'GET',
        headers: {
          authorization: user.token,
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
    <div className="flex justify-center">
      {
        orders.map((order) => (
          <button
            data-testid={ `${route}_orders__element-order-id-${order.id}` }
            className="
            rounded-xl
            bg-slate-200
            p-8
            mx-4
            mt-12
            "
            key={ order.id }
            type="button"
            onClick={ () => handleDetails(order.id) }
          >
            <p
              className="flex
              mb-7
              bg-white
              justify-center
              rounded-lg
              py-4
              justify-items-start"
            >
              Pedido 000
              {order.id}
            </p>
            <p
              className="bg-blue-300
              mb-4
              rounded-lg
              py-3
              text-black"
              data-testid={ `${route}_orders__element-delivery-status-${order.id}` }
            >
              { order.order.status }
            </p>
            <p
              className="bg-white
              rounded-lg
              py-2
              mb-4"
              data-testid={ `${route}_orders__element-order-date-${order.id}` }
            >
              {order.order.saleDate}
            </p>
            <p
              className="bg-white
            rounded-lg
            py-2
            mb-4"
              data-testid={ `${route}_orders__element-card-price-${order.id}` }
            >
              R$
              {' '}
              {order.order.totalPrice}

            </p>
            <p
              className="bg-slate-300
              py-4
              rounded-lg
              p-4"
              data-testid={ `${route}_orders__element-card-address-${order.id}` }
            >
              {`${order.order.address}, ${order.order.adressNumber}`}
            </p>
          </button>
        ))
      }
    </div>
  );
}
