import React from 'react'
import {GoHomeFill, GoHome} from "react-icons/go"
import {PiMessengerLogoFill, PiMessengerLogoLight} from "react-icons/pi"
import {AiTwotoneHeart, AiOutlineHeart} from "react-icons/ai"

import { NavLink } from 'react-router-dom'
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
            href: '/messenger',
            active: PiMessengerLogoFill,
            notActive: PiMessengerLogoLight,
        },
        {
            id: 3,
            href: '/likes',
            active: AiTwotoneHeart,
            notActive: AiOutlineHeart,
        }
    ]
  return (
    <nav className='flex items-center gap-x-4'>
        {itemList.map(item => (
            <NavbarItem  item={item} key={item.id}/>
        ))}
        <p>Profile Image component</p>

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

