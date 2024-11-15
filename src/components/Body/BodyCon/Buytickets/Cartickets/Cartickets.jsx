import React, { useEffect, useState } from 'react';
import './Cartickets.css';
import { Link } from 'react-router-dom';
// import { cartTicketData } from '../../../../DataLocal/TicketsData';
import { FaCarSide } from "react-icons/fa";
import { endpoint } from '../../../../../config/apiConfig';

const Cartickets = () => {

    const [dataCar, setDataCar] = useState([]);
    useEffect(() =>{
        const token = localStorage.getItem('token');
        fetch(endpoint.buyTicketCar.url, {
            method: endpoint.buyTicketCar.method,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            if(data.code === 1000){
                setDataCar(data.result);
            }else{
                console.error('Loi khi lay du lieu')
            }
        })
        .catch(error =>{
            console.log("Loi ket noi", error)
        })
    },[])


    const lemitedCartticketdata = dataCar.slice(0, 4);

    return (
        <div className='container'>
            <div className="row">
                {lemitedCartticketdata.map((item) =>
                    <div className="col-xl-6" key={item.id}>
                        <div className="Cartticket-cart">
                            <div className='Cartticket-cart-icon'>
                                <FaCarSide />
                            </div>
                            <div className='Cartticket-cart-content'>
                                <h3>{item.name}</h3>
                                <span>Giá vé: {item.price} <sup>đ</sup></span>
                                <span>Thời gian: {item.duration}</span>
                                <span>Số lần: {item.usage}</span>

                                <div className='detail-btn-buy'>
                                    <Link to={`/detail/car/${item.id}`}>Chi tiết vé</Link>
                                    <button>Mua ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cartickets;
