import React, { useState } from 'react';
import Button from '../Library/Button';
import TextInput from '../Library/TextInput';

function AdressDetails() {
  const [address, setAdress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
        email,
        password,
      }),
    });
    if (!response.ok) {
      setError(true);
    } else {
      setError(false);
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data));
      if (data.role === 'customer') {
        navigate('/customer/orders/<id>');
      }
    }
  };
  return (
    <div>
      <h3>Detalhes e Endereço para Entrega</h3>
      <form onSubmit={ handleSubmit }>
        <TextInput
          placeholder="Digite o endereço"
          data-testid=""
          type="text"
          id="user-name"
          label="Name"
          value={ address }
          onChange={ (e) => setAdress(e.target.value) }
        />
        <Button
          type="submit"
          testid=""
        >
          Finalizar Pedido
        </Button>
      </form>

    </div>
  );
}

export default AdressDetails;
