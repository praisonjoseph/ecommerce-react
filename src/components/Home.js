import React from 'react'
import { useAuth } from '../context/AuthContext'
import NavbarComponent from './Header'

function Home() {
  const {user} = useAuth()
  console.log(user)
  const productsArray = new Array(100).fill(null);
  return (
    <>
    <NavbarComponent/>
    {productsArray.map((_, index) => (
        <div key={index}>
          Product {index + 1}
        </div>
      ))}
    </>
  )
}

export default Home