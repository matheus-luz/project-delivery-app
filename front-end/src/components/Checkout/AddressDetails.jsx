import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import Button from '../Library/Button';
import getTotalPrice from '../../utils/totalPrice';
import TextInput from '../Library/TextInput';
import { getProducts } from '../../utils/localStorage';

function AddressDetails() {
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  const [address, setAdress] = useState('');
  const [number, setNumber] = useState('');
  const [allSellers, setAllSellers] = useState([]);
  const [seller, setSeller] = useState('');

  const getSellers = useCallback(
    async () => {
      const data = await fetch('/api/customer/sellers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: user.token,
        },
      }).then((response) => response.json());
      setAllSellers(data);
      setSeller(data[0].id);
    },
    [user.token],
  );

  useEffect(() => {
    if (user.token) getSellers();
  }, [user.token, getSellers]);

  const handleClick = async () => {
    const productsData = await getProducts();
    const products = productsData
      .map(({ id, quantity }) => ({ productId: id, quantity }));
    const response = await fetch('/api/customer/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: user.token,
      },
      body: JSON.stringify(
        {
          sellerId: seller,
          totalPrice: getTotalPrice(productsData),
          deliveryAddress: address,
          deliveryNumber: number,
          products,
        },
      ),
    });
    const { id } = await response.json();
    navigate(`/customer/orders/${id}`);
    // Falta implementar o trycatch do POST
  };

  return (
    <div>
      <h3>Detalhes e Endereço para Entrega</h3>

      <label htmlFor="responsible">
        P.Vendedora Responsável:
        <select
          data-testid="customer_checkout__select-seller"
          id="responsible"
          onChange={ (({ target: { value } }) => setSeller(value)) }
          value={ seller }
        >
          { allSellers.map((e) => (
            <option
              key={ `seller-${e.id}` }
              value={ e.id }
            >
              { e.name }
            </option>
          ))}
        </select>
      </label>
      <TextInput
        placeholder="Digite o endereço"
        data-testid="customer_checkout__input-address"
        type="text"
        id="user-name"
        label="Endereço"
        value={ address }
        onChange={ (e) => setAdress(e.target.value) }
      />
      <TextInput
        data-testid="customer_checkout__input-addressNumber"
        id="user-numero"
        label="Número"
        onChange={ (e) => setNumber(e.target.value) }
        placeholder="Numero"
        type="number"
        value={ number }
      />
      <Button
        onClick={ handleClick }
        testid="customer_checkout__button-submit-order"
        type="button"
      >
        Finalizar Pedido
      </Button>

    </div>
  );
}

export default AddressDetails;
