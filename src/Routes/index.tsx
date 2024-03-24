import { Navigate, useRoutes } from 'react-router-dom';
import OwnNotFound from '../Pages/OwnNotFound/OwnNotFound';
import Home from '../Pages/Home/Home';
import OwnLayout from '../Components/AppLayout/OwnLayout';
import LogIn from '../Pages/auth/LogIn/LogIn';
import { getStoredUser } from '../services/user-storage';
import ForgotPassword from '../Pages/auth/forgot-password/ForgotPassword';
import SignUp from '../Pages/auth/SignUp/SignUp';
import Blogs from '../Pages/Blogs/Blogs';
import Contact from '../Pages/Contact/Contact';
import Profile from '../Pages/Profile/Profile';
import { ITranslation } from '../types';

const RoutesWrapper = ({ t }: ITranslation) => {
  const routes = useRoutes([
    {
      path: '*',
      element: <OwnNotFound t={t} />
    },
    {
      path: '/',
      element: <OwnLayout t={t} />,
      children: [
        {
          index: true,
          element: <Home t={t} />
        },
        {
          path: 'about',
          element: <h1> about </h1>
        },
        {
          path: 'blogs',
          element:
            getStoredUser() ?
              <Blogs t={t} />
            : <Navigate to='/login' replace />
        },
        {
          path: 'contact',
          element: <Contact t={t} />
        },
        {
          path: 'profile',
          element: <Profile t={t} />
        },
        {
          path: '/login',
          element: <LogIn t={t} />
        },
        {
          path: '/forgot-password',
          element: <ForgotPassword t={t} />
        },
        {
          path: '/register',
          element: <SignUp t={t} />
        }
      ]
    }
  ]);
  return routes;
};

export default RoutesWrapper;
