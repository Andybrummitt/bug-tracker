import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import useLogout from '../../hooks/useLogout'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  console.log(JSON.stringify(auth))

  return (
    <>
      <Navbar />
     <div>Dashboard</div>
    </>
  )
}

export default Dashboard