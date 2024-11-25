import React, { useEffect, useState } from 'react';
import './Mototickets.css';
import { Link } from 'react-router-dom';
import { FaMotorcycle } from "react-icons/fa6";
import { endpoint, refreshToken } from '../../../../../config/apiConfig';
import { toast } from 'react-toastify';

const Mototickets = () => {
    const [motoTicketData, setmotoTicketData] = useState([]);

    const lemitedMototicketdata = motoTicketData.slice(0, 4);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch(endpoint.buyTicketBikes.url, {
            method: endpoint.buyTicketBikes.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 1000) {
                    setmotoTicketData(data.result);
                } else if (data.code === 5010) {
                    refreshToken()
                } else {
                    toast.error(data.message, {
                        position: "top-right"
                    })
                }
            })
            .catch(error => {
                console.log('Lỗi khi kết nối', error);
            });
    }, []);

    return (
        <div className='container'>
            <div className="row">
                {lemitedMototicketdata.map((item) =>
                    <div className="col-xl-6" key={item.id}>
                        <div className="mototicket-cart">
                            <div className='mototicket-cart-icon'>
                                <FaMotorcycle />
                            </div>
                            <div className='mototicket-cart-content'>
                                <h3>{item.name}</h3>
                                <span>Giá vé: {item.price} <sup>đ</sup></span>
                                <span>Thời gian: {item.duration}</span>
                                <span>Số lần: {item.usage}</span>

                                <div className='detail-btn-buy'>
                                    <Link to={`/detail/motorbike/${item.id}`}>Chi tiết vé</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Mototickets;
