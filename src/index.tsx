import { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

import ForgetPass from './components/forget-pass';
import ResetPass from './components/reset-pass';
import Protected from './components/protected';
import NotFound from './components/not-found';
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home';

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forget-pass",
    element: <ForgetPass />,
  },
  {
    path: "/reset-pass",
    element: <ResetPass />,
  },
  {
    path: "/",
    element: <Protected />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]

function App() {
  const routeList = useRoutes(routes)
  const navigate = useNavigate()

  useEffect(() => {
    const path = window.location.pathname
    navigate(path)
  }, [])

  return routeList
}

export default App
