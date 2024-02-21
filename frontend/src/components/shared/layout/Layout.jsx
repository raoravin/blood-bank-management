import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import "../../../styles/Layout.css"

const Layout = ({children}) => {
  return (
    <>
    <div className='header'><Header /></div>
    <div className=" d-flex g-0">
      <div className="col-md-3">
        <Sidebar />
      </div>
      <div className="content">{children}</div>
    </div>
    </>
  )
}

export default Layout