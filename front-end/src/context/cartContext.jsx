import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';

const CartContext = createContext({
  user: [],
  setUser: () => {},
});

function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

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
