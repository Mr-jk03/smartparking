import React, { useEffect, useState } from 'react'
import './DetailTickets.css'
import { useParams } from 'react-router-dom'
import { FaCartPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

import { FaMotorcycle } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa";
import { endpoint } from '../../../../config/apiConfig';


const DetailTickets = ({selectedTicket, dispatch}) => {

  const {vehicle, id} = useParams();
  const [ticketData, setTicketData] = useState(null);

  useEffect(() =>{
    const api = vehicle === 'bike'
    ? endpoint.buyTicketBikes.url
    : endpoint.buyTicketCar.url;


    const token = localStorage.getItem('token');
    fetch(api, {
      method: "GET",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.code === 1000){
        const ticket = data.result.find(item =>item.id === id)
        setTicketData(ticket)
      }else{
        console.error('Loi khi lay du lieu')
      }
    })
    .catch(error =>{
      console.log('loi ket noi', error);
    })
  }, [vehicle, id])


  return (
    <div className='wrapper-detail'>
      {ticketData ?(
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className='info-address'>
              <Link to={'/'} className='info-adr-home' onClick={() => dispatch({ type: 'HOME' })}>Trang chủ</Link>
              <Link>Chi tiết vé</Link>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="dt-ticket">
                    {vehicle === 'bike' ? (<FaMotorcycle />):
                     vehicle === 'car' ? (<FaCarSide />): null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="info-ticket">
              <div className='container-info'>
                  <span>Tên vé: {ticketData.name}</span>
                  <span>Giá vé: {ticketData.price} <sup>đ</sup></span>
                  <span>Loại phương tiện: {vehicle}</span>
                  <span>Thời gian: {ticketData.duration}</span>
                  <span>Lưu ý: </span>
                  <textarea className='note-ticket' readOnly name="" id="">
                    {ticketData.note}
                  </textarea>
                  <div className='ft-info'>
                    
                      <div className="row info-btn">
                        <div className="col-xl-5">
                          <button className='info-btn-buy'>đặt mua</button>
                        </div>
                        <div className="col-xl-7">
                          <button className='info-btn-addCart'>
                            <i>
                              <FaCartPlus />
                            </i>
                            thêm vào giỏ hàng</button>
                        </div>
                      </div>
                    
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <span>Không tìm thấy vé</span>
      )}
      
      
        
    </div>
  )
}
export default DetailTickets
