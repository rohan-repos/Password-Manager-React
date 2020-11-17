import React from 'react'
import {Link} from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa'
import {MdFingerprint} from 'react-icons/md'

function Navbar() {
    return (
        <>
           <div className="navbar">
               <div className="navbar-container container">
                   <Link to="/" className="navbar-logo">
                       OneId
                   </Link>
               </div>
           </div>
        </>
    )
}

export default Navbar
