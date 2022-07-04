import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Navbar = () => {

  const cart=useSelector(state=>state.cart)
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link to="/">
        <h1 className="btn btn-ghost normal-case text-xl">Ekart</h1>
    </Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal p-0">
      <li><a>Item 1</a></li>
      <li tabIndex="0">
        <Link to="/cart">
            <AiOutlineShoppingCart/>
          <span>{cart.cartTotalQuantity}</span>
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </Link>
      </li>
      <div className="avatar">
        <div className="w-12 rounded-full">
        <img src="https://placeimg.com/192/192/people" />
    </div>
</div>
    </ul>
  </div>
</div>
  )
}

export default Navbar