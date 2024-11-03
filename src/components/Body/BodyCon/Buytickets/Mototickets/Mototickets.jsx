import React from 'react'
import './Mototickets.css'
import { Link } from 'react-router-dom';

import { FaMotorcycle } from "react-icons/fa6";


const Mototickets = () => {

    const motoTicketData = [
        {id: 'XML', nameTicket: 'XML01', price: '6.000', duration: '1 giờ sau khi sử dụng', usage: 'Vô hạn'},
        {id: 'XMN', nameTicket: 'XMN01', price: '6.000', duration: '1 ngày sau khi sử dụng', usage: 'Vô hạn'},
        {id: 'XMT', nameTicket: 'XMT01', price: '6.000', duration: '7 ngày sau khi sử dụng', usage: 'Vô hạn'},
        {id: 'XMTG', nameTicket: 'XMTG01', price: '6.000', duration: '30 ngày sau khi sử dụng', usage: 'Vô hạn'},
    ]

    const lemitedMototicketdata = motoTicketData.slice(0, 4);



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
                            <h3>{item.nameTicket}</h3>
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

export default Mototickets