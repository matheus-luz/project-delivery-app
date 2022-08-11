import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';

const UserContext = createContext(
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

  useEffect(() => {
    const localStorageUser = localStorage.getItem('user');
    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const value = useMemo(() => ({
    user,
    setUser,
  }), [user]);

  return (
    <UserContext.Provider value={ value }>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
export { UserContext as userContext };
