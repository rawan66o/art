import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const checkLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/check-auth');
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  return isLoggedIn;
};

const PrivateRoute = ({ component: Component,...rest }) => {
  const isLoggedIn = checkLoginStatus();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;