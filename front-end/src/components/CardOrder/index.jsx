import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CardOrders() {
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState();
  const [renderOrders, setRenderOrders] = useState(false);
  const navigate = useNavigate();

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
      const data = await fetch('http://localhost:3001/seller/orders', {
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
  }, [renderOrders, userData, orders]);

  const handleDetails = () => {
    navigate(`/${route}/orders/${id}`);
  };

  return (
    <div>
      {
        orders.map((order) => (
          <button key={ order.order.id } type="button" onClick={ handleDetails }>
            <p>
              {order}
            </p>
            <p>
              {date}
            </p>
            <p>
              R$
              {totalPrice}
            </p>
            <p>
              {`${deliveryAddress}, ${deliveryNumber}`}
            </p>
          </button>
        ))
      }
    </div>
  );
}

// CardOrders.propTypes = {
//   route: PropTypes.string.isRequired,
// };
