import React, { useState } from 'react'
import './Header.css'
import Logo from '../Images/logo.png'
import { FaCircleUser } from "react-icons/fa6";
import { IoNotificationsCircle } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa6";
import {Link} from 'react-router-dom';


const Header = () => {

    const [inputValues, setInputValues] = useState((1500000).toLocaleString('vi-VN'));


  return (
    <div className='head-wrapper'>
        <div className="container">
            <div className="row">
                <div className='col-xl-1 col-lg-1 col-md-1 logo'>
                    <Link to={'/'}>
                        <img src={Logo} alt="logo" />
                    </Link>
                </div>
                <div className='col-xl-2 col-lg-2 col-md-2 parking-hd'>
                    <span>
                        <Link to={'/'}>Parking</Link>
                    </span>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 input-hd'>
                    <div className='main-input'>
                        <FaWallet  className='wallet'/>
                        <input type="text" 
                            value={inputValues}
                            onChange={e => setInputValues(e.target.value)}
                            readOnly
                        />
                        <span>VND</span>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-1 col-md-1 hd-ritgh'>
                    <Link>
                        <FaCircleUser />
                    </Link>
                    <Link className='i-chil2'>
                        <IoNotificationsCircle />
                    </Link>
                    <Link to={'/cart'}>
                        <FaCartShopping />
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header
