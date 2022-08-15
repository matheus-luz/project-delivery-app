import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext({
  user: [],
  setUser: () => {},
});

function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const value = useMemo(() => ({ cart, setCart }), [cart, setCart]);

  return (
    <CartContext.Provider value={ value }>
      {children}
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContextProvider;
export { CartContext };
