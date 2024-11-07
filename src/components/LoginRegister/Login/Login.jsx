import React, { useState } from 'react';
import './Login.css';
import Logo from '../../Images/logo.png';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault(); // Ngăn chặn reload trang khi submit form

        if (username === 'kh' && password === '123') {
            onLogin();
        } else if (username !== 'kh') {
            alert('Tài khoản không đúng');
        } else if (password !== '123') {
            alert("Mật khẩu không đúng");
        }
    }

    return (
        <div className='wrapper-login'>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="container">
                            <div className="row container-login">
                                <div className="col-xl-12 col-lg-12 col-md-12">
                                    <div className="login-header">
                                        <img src={Logo} alt="" />
                                        <span>Parking</span>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12">
                                    <form onSubmit={handleLogin}> 
                                        <div className="col-xl-12">
                                            <div className="login-input">
                                                <span>Tên đăng nhập</span>
                                                <div className='ip-relative'>
                                                    <input 
                                                        type="text" 
                                                        placeholder='Tên đăng nhập...'
                                                        value={username}
                                                        onChange={e => setUsername(e.target.value)}
                                                        required
                                                    />
                                                    <i className='login-icon'>
                                                        <FaUserCircle />
                                                    </i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="login-input">
                                                <span>Mật khẩu</span>
                                                <div className='ip-relative'>
                                                    <input 
                                                        type="password" 
                                                        placeholder='Mật khẩu...'
                                                        value={password}
                                                        onChange={e => setPassword(e.target.value)}
                                                        required
                                                    />
                                                    <i className='login-icon'>
                                                        <FaLock />
                                                    </i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <Link className='fogot'>Quên mật khẩu ?</Link>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="btn-login">
                                                <button type="submit">
                                                    Đăng nhập
                                                </button>
                                                <span className='sp-hoac'>Hoặc</span>
                                                <Link to='/register'>ĐĂNG KÝ</Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
