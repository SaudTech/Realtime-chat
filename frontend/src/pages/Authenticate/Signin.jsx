import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
  const navigate = useNavigate();
  const [StatusMessage, setStatusMessage] = React.useState("")
  const [User, setUser] = React.useState({
    username: "Saud",
    password: "123"
  });


  const signin = () => {
    if (!User.username) return alert('Username is required');
    if (!User.password) return alert('Password is required');
    axios.post(`/authenticate`, User)
      .then(({ data }) => {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      })
      .catch(({ response }) => {
        setStatusMessage(response.data.error || "Something went wrong, please try again later")
      })
  };

  useEffect(() => localStorage.clear(), [])
  return (
    <>
      <div className='h-screen w-screen grid place-items-center'>

        <div className='bg-white text-black shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col'>
          <h3 className='text-xl w-full text-center'>
            Sign In
          </h3>
          <p>
            Sign In with your username and password.
          </p>
          <div className='mb-4'>
            <input
              className=' text-white appearance-none border rounded w-full py-2 px-3 rounded-b-none leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              value={User.username}
              onChange={(e) => setUser({ ...User, username: e.target.value })}
              placeholder='Username'
            />
            <input
              className=' text-white appearance-none border rounded w-full rounded-t-none py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              value={User.password}
              onChange={(e) => setUser({ ...User, password: e.target.value })}
              placeholder='Password'
            />
          </div>
          <p className='text-red-400'>{StatusMessage}</p>
          <div className='flex items-center justify-between text-white'>
            <button
              type='button'
              onClick={signin}
            >
              Sign In
            </button>
            <Link to='/signup' className='text-black'>
              Don't have an account? Sign Up
            </Link>
          </div>

        </div>

      </div>
    </>
  )
}

export default Signin