import React, { useEffect, useState } from 'react'
import './Account.css'
import { Link } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa";
import { endpoint, refreshToken } from '../../config/apiConfig';
import { toast } from 'react-toastify';

const Account = () => {

    const [usernameUser, setUsernameUser] = useState(null);
    const [nameUser, setNameUser] = useState(null);
    const [phoneUser, setPhoneUser] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem('token');

        fetch(endpoint.account.url, {
            method: endpoint.account.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 1000) {
                    setUsernameUser(data.result.email);
                    setNameUser(data.result.name);
                    setPhoneUser(data.result.phone);
                } else if (data.code === 5010) {
                    refreshToken()
                } else {
                    toast.error(data.message, {
                        position: "top-right"
                    })
                }
            })
            .catch(error => {
                console.log('Loi ket noi', error);
            })
    }, [])


    return (
        <div className='wrapper-account'>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className='account-title'>
                            <Link to={'/'} className='a-acount-home'>Trang chủ</Link>
                            <Link>Thông tin tài khoản</Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-3">
                        <div className='menu-account'>
                            <div className="menu-acount-item">
                                <FaUserAlt />
                                <button>Tài khoản của tôi</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-9">
                        <div className="display-account">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <span className='hsct'>Hồ sơ của tôi</span>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-xl-6">
                                                    <div className='box-info'>
                                                        <span>Tên đăng nhập</span>
                                                        <input type="text"
                                                            value={usernameUser}
                                                            onChange={(e) => setUsernameUser(e.target.value)}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6">
                                                    <div className='box-info'>
                                                        <span>Số điện thoại</span>
                                                        <input type="text"
                                                            value={phoneUser}
                                                            onChange={(e) => setPhoneUser(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6">
                                                    <div className='box-info'>
                                                        <span>Tên</span>
                                                        <input type="text"
                                                            value={nameUser}
                                                            onChange={(e) => setNameUser(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <button className='btn-save-account'>Lưu</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Account