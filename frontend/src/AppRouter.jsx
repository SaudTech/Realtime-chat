import React, { useEffect } from 'react';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Chat from './pages/RealtimeChat/Base';
import Signin from './pages/Authenticate/Signin';
import Signup from './pages/Authenticate/Signup';
import Logout from './pages/Authenticate/Logout';

const AppRouter = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Chat />} />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

      </Routes>
    </Router>
  );
};

const Layout = () => {
  return (
    <div className="container w-screen h-screen">
      <Outlet />
    </div>
  );
};
const AuthLayout = () => {
  useEffect(() => localStorage.clear(), [])
  return (
    <div className="container w-screen h-screen">
      <Outlet />
    </div>
  );
};

export default AppRouter;
