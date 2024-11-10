import React, { useState } from 'react';
import './Register.css';
import Logo from '../../Images/logo.png';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [emailFomat, setEmailFomat] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailBlur = () => {
        if (emailFomat && !validateEmail(emailFomat)) {
            toast.error('Email không đúng định dạng', { position: 'top-right' });
        }
    };

    return (
        <div className='wrapper-register'>
            <ToastContainer style={{ zIndex: 9999 }} />
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-xl-6 col-lg-6 col-md-6"> 
                        <div className="container">
                            <div className="row container-register">
                                <div className="col-xl-12">
                                    <div className="register-header">
                                        <img src={Logo} alt="" />
                                        <span>Parking</span>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="register-input">
                                        <div className='ip-relative'>
                                            <input 
                                                type="text" 
                                                placeholder='Nhập email của bạn...'
                                                value={emailFomat}
                                                onChange={(e) => setEmailFomat(e.target.value)}
                                                onBlur={handleEmailBlur}
                                            />
                                            <i className='register-icon'>
                                                <FaUserCircle />
                                            </i>
                                        </div>
                                        <span>Tên đăng nhập</span>
                                    </div>
                                    <div className="register-input">
                                        <div className='ip-relative'>
                                            <input type="password" placeholder='Mật khẩu...' maxLength={16}/>
                                            <i className='register-icon'>
                                                <FaLock />
                                            </i>
                                        </div>
                                        <span>Mật khẩu</span>
                                    </div>
                                    <div className="register-input">
                                        <div className='ip-relative'>
                                            <input type="password" placeholder='Xác nhận mật khẩu...' maxLength={16}/>
                                            <i className='register-icon'>
                                                <FaLock />
                                            </i>
                                        </div>
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
            </div>
        </div>
    );
}

export default Register;
