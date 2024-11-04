import React from 'react'
import './Register.css'
import Logo from '../../Images/logo.png'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

const Register = () => {
  return (
    <div className='wrapper-register'>
        <div className="container-register">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="register-header">
                            <img src={Logo} alt="" />
                            <span>Parking</span>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="register-input">
                            <input type="text" placeholder='Tên đăng nhập...'/>
                            <i className='register-icon'>
                                <FaUserCircle />
                            </i>
                            <span>Tên đăng nhập</span>
                        </div>
                        <div className="register-input">
                            <input type="text" placeholder='Mật khẩu...'/>
                            <i className='login-icon'>
                                <FaLock />
                            </i>
                            <span>Mật khẩu</span>
                        </div>
                        <div className="register-input">
                            <input type="text" placeholder='Xác nhận mật khẩu...'/>
                            <i className='login-icon'>
                                <FaLock />
                            </i>
                            <span>Xác nhận mật khẩu</span>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="btn-register">
                            <button>Đăng ký</button>
                            <Link to='/login'>Đăng nhập</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register