import React from 'react';
import './Cartickets.css';
import { Link } from 'react-router-dom';
import { cartTicketData } from '../../../../DataLocal/TicketsData';
import { FaCarSide } from "react-icons/fa";

const Cartickets = () => {
    const lemitedCartticketdata = cartTicketData.slice(0, 4);

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
                                <h3>Tên vé: {item.nameTicket}</h3>
                                <span>Giá vé: {item.price} <sup>đ</sup></span>
                                <span>Thời gian: {item.duration}</span>
                                <span>Số lần: {item.usage}</span>

                                <div className='detail-btn-buy'>
                                    <Link to={`/detail/${item.id}`}>Chi tiết vé</Link>
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
