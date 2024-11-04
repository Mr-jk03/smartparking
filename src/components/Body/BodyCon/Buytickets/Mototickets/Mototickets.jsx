import React from 'react'
import './Mototickets.css'
import { Link } from 'react-router-dom';
import { motoTicketData } from '../../../../DataLocal/TicketsData'

import { FaMotorcycle } from "react-icons/fa6";


const Mototickets = () => {

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
                                <Link to={`/detail/${item.id}`}>Chi tiết vé</Link>
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