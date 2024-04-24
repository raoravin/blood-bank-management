import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import "../../../styles/Layout.css"
import Footer from "./Footer"

const Layout = ({children}) => {
  return (
    <>
    <div className='header'><Header /></div>
    <div className=" d-flex">
        <div className="col-md-3 w-72">
          <Sidebar />
        </div>
        <div className="content ms-10 w-3/4">{children}</div>
      </div>
      <div className=' mt-96'><Footer /></div>
    </>
  )
}

export default Layout