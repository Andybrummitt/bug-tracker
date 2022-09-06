import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import useLogout from '../../hooks/useLogout'
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const signOut = async () => {
    await logout();
    navigate('/team/login')
  } 

  return (
    <>
      <button onClick={signOut}>Logout</button>
     <div>Dashboard</div>
    </>
  )
}

export default Dashboard