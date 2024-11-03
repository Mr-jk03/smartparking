import React from 'react'
import './Cartickets.css'
import { Link } from 'react-router-dom'

import { FaCarSide } from "react-icons/fa";

const Cartickets = () => {

    const cartTicketData = [
        {id: 'OTL', nameTicket: 'OTL01', price: '20.000', duration: '1 giờ sau khi sử dụng', usage: 'Vô hạn'},
        {id: 'OTN', nameTicket: 'OTN01', price: '40.000', duration: '1 ngày sau khi sử dụng', usage: 'Vô hạn'},
        {id: 'OTT', nameTicket: 'OTT01', price: '240.000', duration: '7 ngày sau khi sử dụng', usage: 'Vô hạn'},
        {id: 'OTTG', nameTicket: 'OTTG01', price: '860.000', duration: '30 ngày sau khi sử dụng', usage: 'Vô hạn'},
    ]

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
                            <Link to=''>Chi tiết vé</Link>
                            <button>Mua ngay</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
    </div>
  )
}
export default Cartickets