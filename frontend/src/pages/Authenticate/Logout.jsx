import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate('/signin');
  }, []);
  return (
    <>
      <div>
        Logging out...
      </div>
    </>
  )
}

export default Logout