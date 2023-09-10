import React from 'react'
import {GoHomeFill, GoHome} from "react-icons/go"

import {FaUserCircle, FaRegUserCircle} from "react-icons/fa"

import { NavLink } from 'react-router-dom'
import store from '../../store'
import { logOut } from '../../store/authSlice'
const Navbar = () => {

    const itemList = [
        {
            id: 1,
            href: '/',
            active: GoHomeFill,
            notActive: GoHome,
        },
        {
          id: 2,
          href: '/user',
          active: FaUserCircle,
          notActive: FaRegUserCircle
        }
    ]
  return (
    <nav className='flex items-center gap-x-4'>
        {itemList.map(item => (
            <NavbarItem  item={item} key={item.id}/>
        ))}
 


          <button onClick={() => store.dispatch(logOut())}>Logout for now</button>
    </nav>
  )
}


export default Navbar


const NavbarItem = ({ item }) => {
 
    return (
      <NavLink to={item.href}>
        {({ isActive }) => {
          return isActive ? <item.active size={30} /> : <item.notActive size={30} />;
        }}
      </NavLink>
    );
  };

