import React, { useState } from 'react';
import './Register.css';
import Logo from '../../Images/logo.png';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { endpoint } from '../../../config/apiConfig';

const Register = () => {
    const [emailFomat, setEmailFomat] = useState('');
    const [passwordRes, setPasswordRes] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');




    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailBlur = () => {
        if (emailFomat && !validateEmail(emailFomat)) {
            toast.error('Email không đúng định dạng', { position: 'top-right' });
        }
    };

    const handleSubmit = () => {
        if (emailFomat === '') {
            toast.error('Vui lòng nhập email', { position: 'top-right' })
        } else if (passwordRes === '') {
            toast.error('Vui lòng nhập mật khẩu', { position: 'top-right' })
        } else if (confirmPassword === '') {
            toast.error('Vui lòng xác nhận mật khẩu', { position: 'top-right' })
        } else if (passwordRes !== confirmPassword) {
            toast.error('Mật khẩu không khớp', { position: 'top-right' });
            return;
        } else {
            const body = {
                email: emailFomat,
                password: passwordRes
            }
            fetch(endpoint.register.url, {
                method: endpoint.register.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 1000) {
                        toast.success('Đăng ký thành công', { position: 'top-right' });
                    } else {
                        toast.error(data.message, { position: 'top-right' });
                    }
                })
                .catch(error => {
                    toast.error('Lỗi kết nối', { position: 'top-right' });
                })
        }
    }

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
                                            <input type="password" placeholder='Mật khẩu...' maxLength={16}
                                                value={passwordRes}
                                                onChange={(e) => setPasswordRes(e.target.value)}
                                            />
                                            <i className='register-icon'>
                                                <FaLock />
                                            </i>
                                        </div>
                                        <span>Mật khẩu</span>
                                    </div>
                                    <div className="register-input">
                                        <div className='ip-relative'>
                                            <input type="password" placeholder='Xác nhận mật khẩu...' maxLength={16}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            <i className='register-icon'>
                                                <FaLock />
                                            </i>
                                        </div>
                                        <span>Xác nhận mật khẩu</span>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="btn-register">
                                        <button onClick={handleSubmit}>Đăng ký</button>
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
