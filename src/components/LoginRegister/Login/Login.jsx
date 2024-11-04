import React, { useState } from 'react'
import './Login.css'
import Logo from '../../Images/logo.png'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

const Login = ({onLogin}) => {

    const [username, setUsername] = useState('');
    const [password, setPassWord] = useState('');

    const handleLogin = () =>{
        if(username === 'kh' && password === '123'){
            onLogin();
        }else if(username === '' && password === ''){
            alert("Vui lòng điền đẩy đủ thông tin !")
        }else{
            alert("Tài khoản hoặc mật khẩu không đúng")
        }
    }

  return (
    <div className='wrapper-login'>
        <div className="container-login">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="login-header">
                            <img src={Logo} alt="" />
                            <span>Parking</span>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="login-input">
                            <input type="text" placeholder='Tên đăng nhập...'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <i className='login-icon'>
                                <FaUserCircle />
                            </i>
                            <span>Tên đăng nhập</span>
                        </div>
                        <div className="login-input">
                            <input type="password" placeholder='Mật khẩu...'
                                value={password}
                                onChange={e => setPassWord(e.target.value)}
                            />
                            <i className='login-icon'>
                                <FaLock />
                            </i>
                            <span>Mật khẩu</span>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <Link className='fogot'>Quên mật khẩu ?</Link>
                    </div>
                    <div className="col-xl-12">
                        <div className="btn-login">
                            <button
                                onClick={handleLogin}
                            >
                                Đăng nhập
                            </button>
                            <span className='sp-hoac'>Hoặc</span>
                            <Link to='/register'>ĐĂNG KÝ</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
