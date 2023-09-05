import React from 'react'
import { Outlet } from 'react-router-dom'

const SiteLayout = () => {
  return (
    <div>
        <p>SiteLayout</p>
        <Outlet/>
    </div>
  )
}

export default SiteLayout