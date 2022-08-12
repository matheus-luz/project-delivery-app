import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Library/Button';
import TextInput from '../Library/TextInput';

function AdressDetails() {
  const navigate = useNavigate();

  const [address, setAdress] = useState('');
  const [number, setNumber] = useState('');

  const handleClick = () => {
    navigate('/customer/orders/:1', { replace: true });
  }; // id é retornado da requisição da venda; precisa pega-lo ainda
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
        placeholder="Numero"
        data-testid="customer_checkout__input-addressNumber"
        type="number"
        id="user-numero"
        label="Numero"
        value={ number }
        onChange={ (e) => setNumber(e.target.value) }
      />
      <TextInput
        placeholder="Digite o endereço"
        data-testid="customer_checkout__input-address"
        type="text"
        id="user-name"
        label="Name"
        value={ address }
        onChange={ (e) => setAdress(e.target.value) }
      />
      <Button
        onClick={ handleClick }
        type="button"
        testid="customer_checkout__button-submit-order"
      >
        Finalizar Pedido
      </Button>

    </div>
  );
}

export default AdressDetails;
