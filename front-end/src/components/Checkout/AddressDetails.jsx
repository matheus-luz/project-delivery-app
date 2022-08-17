import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import Button from '../Library/Button';
import getTotalPrice from '../../utils/totalPrice';
import TextInput from '../Library/TextInput';
import { getProducts } from '../../utils/localStorage';

function AddressDetails() {
  const { user } = useContext(userContext);
  // const navigate = useNavigate();

  const [address, setAdress] = useState('');
  const [number, setNumber] = useState('');

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
          sellerId: 2,
          totalPrice: getTotalPrice(productsData),
          deliveryAddress: address,
          deliveryNumber: number,
          products,
        },
      ),
    });
    const data = await response.json();
    console.log(data);
    // Falta implementar o redirecionamente da rota e o trycatch do POST
  };

  return (
    <div>
      <h3>Detalhes e Endereço para Entrega</h3>

      <label htmlFor="responsavel">
        P.Vendedora Responsável:
        <select
          data-testid="customer_checkout__select-seller"
          id="responsavel"
          name="estado"
        >
          <option value="fulana1">fulana1</option>
          <option value="fulana2">fulana2</option>
          <option value="fulana3">fulana3</option>
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
