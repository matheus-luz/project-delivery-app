import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

const userContext = React.createContext(
  {
    user: {
      name: '',
      email: '',
      password: '',
      role: '',
    },
    setUser: () => {},
  },
);

function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    name: '',
    role: '',
    token: '',
  });

  const value = useMemo(() => ({
    user,
    setUser,
  }), [user]);

  return (
    <userContext.Provider value={ value }>
      {children}
    </userContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
export { userContext };
