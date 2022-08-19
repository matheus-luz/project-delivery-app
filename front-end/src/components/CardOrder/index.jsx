import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';

export default function CardOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const PADDING = 4;

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`/api/${user.role}/orders`, {
        method: 'GET',
        headers: {
          authorization: user.token,
        },
      }).then((response) => response.json());
      setOrders(data);
    }
    if (user.role) fetchData();
  }, [orders, user.role, user.token]);

  const handleDetails = (id) => {
    navigate(`${id}`);
  };

  const getOrderColor = (status) => {
    switch (status) {
    case 'Entregue':
      return 'bg-[#3bd5b0]';
    case 'Pendente':
      return 'bg-[#d4c63c]';
    default:
      return 'bg-[#87d53c]';
    }
  };

  return (
    <div className="flex m-10 gap-3">
      {
        orders.map((item) => (
          <button
            className={ `border 
            border-1 
            border-gray-300 
            shadow-md 
            flex 
            p-2
            flex-row
            gap-3
            items-center
            justify-center` }
            data-testid={ `${user.role}_orders__element-order-id-${item.id}` }
            key={ item.id }
            type="button"
            onClick={ () => handleDetails(item.id) }
          >
            <p className="flex flex-col text-sm p-4">
              Pedido
              <span className="text-xl">
                {item.id.toString().padStart(PADDING, '0')}
              </span>
            </p>
            <p
              className={
                `${getOrderColor(item.order.status)} 
                h-full 
                font-bold 
                text-center 
                text-xl 
                rounded-md
                flex
                items-center
                justify-center
                px-2`
              }
              data-testid={ `${user.role}_orders__element-delivery-status-${item.id}` }
            >
              { item.order.status }
            </p>
            <div className="flex flex-col gap-3">
              <p
                className="bg-gray-100 text-sm p-2 rounded-md"
                data-testid={ `${user.role}_orders__element-order-date-${item.id}` }
              >
                {item.order.saleDate}
              </p>
              <p
                className="bg-gray-100 text-sm p-2 rounded-md"
                data-testid={ `${user.role}_orders__element-card-price-${item.id}` }
              >
                R$
                {' '}
                {item.order.totalPrice}

              </p>
            </div>
            {
              user.role !== 'customer' && (
                <p
                  data-testid={ `${user.role}_orders__element-card-address-${item.id}` }
                >
                  {`${item.order.address}, ${item.order.adressNumber}`}
                </p>
              )
            }
          </button>
        ))
      }
    </div>
  );
}
