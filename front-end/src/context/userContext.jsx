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
    name: '',
    email: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

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
