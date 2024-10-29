import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import useAuth from './hooks/useAuth';
import Contact from './pages/Contact';
import Content from './pages/Contents';
import ContentPage from './pages/Contents';
import Courses from './pages/Courses';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Users from './pages/Users';
import { AuthRoute, PrivateRoute } from './Route';
import authService from './services/AuthService';

export default function App() {
  const { authenticatedUser, setAuthenticatedUser } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  const authenticate = async () => {
    try {
      const authResponse = await authService.refresh();
      setAuthenticatedUser(authResponse.user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (!authenticatedUser) {
      authenticate();
    } else {
      setIsLoaded(true);
    }
  }, []);

  return isLoaded ? (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/users" component={Users} roles={['admin']} />
        <PrivateRoute exact path="/courses" component={Courses} />
        <PrivateRoute exact path="/courses/:id" component={Content} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/contact" component={Contact} />
        <AuthRoute exact path="/login" component={Login} />
      </Switch>
    </Router>
  ) : null;
}
