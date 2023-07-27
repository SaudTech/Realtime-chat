import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [User, setUser] = React.useState({})
  const [StatusMessage, setStatusMessage] = React.useState("")

  const signup = () => {
    if (!User.username) return alert('Username is required');
    if (!User.password) return alert('Password is required');
    if (!User.confirmpassword) return alert('Confirm password is required');
    if (User.password !== User.confirmpassword) return alert('Password and confirm password must be same');
    let user = User;
    axios.post(`/users`, user)
      .then(({ data }) => {
        if (data.message) {
          localStorage.setItem('user', JSON.stringify(data));
          navigate('/');
        } else {
          setStatusMessage(data.message)
        }
      })
      .catch((error) => setStatusMessage(error.message))
  }
  return (
    <>
      <div className='h-screen w-screen grid place-items-center'>

        <div className='bg-white text-black shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col'>
          <h3 className='text-xl w-full text-center'>
            Sign Up
          </h3>
          <p>
            Create a new account.
          </p>
          <div className='mb-4'>
            <input
              className='shadow text-white appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              value={User.username}
              onChange={(e) => setUser({ ...User, username: e.target.value })}
              placeholder='Username'
            />
            <input
              className='shadow text-white appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline'
              type='password'
              value={User.password}
              onChange={(e) => setUser({ ...User, password: e.target.value })}
              placeholder='Password'
            />
            <input
              className='shadow text-white appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline'
              type='password'
              value={User.confirmpassword}
              onChange={(e) => setUser({ ...User, confirmpassword: e.target.value })}
              placeholder='Confirm password'
            />
          </div>
          <p>{StatusMessage}</p>
          <div className='flex items-center justify-between text-white'>
            <button
              type='button'
              onClick={signup}
            >
              Sign Up
            </button>
            <Link to='/' className='text-black'>
              Already have an account? Sign In
            </Link>
          </div>

        </div>

      </div>
    </>
  )
}

export default Signup