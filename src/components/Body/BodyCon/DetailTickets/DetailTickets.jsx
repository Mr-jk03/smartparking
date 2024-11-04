import React from 'react'
import './DetailTickets.css'
import { motoTicketData, cartTicketData } from '../../../DataLocal/TicketsData'
import { useParams } from 'react-router-dom'
import { FaCartPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';


const DetailTickets = ({selectedTicket, dispatch}) => {

  const {id} = useParams();
  const motoTicket = motoTicketData.find((item) => item.id === selectedTicket);
  const carTicket = cartTicketData.find((item) => item.id === selectedTicket);

  const item = motoTicket || carTicket

  return (
    <div className='wrapper-detail'>
      {item ?(
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className='info-address'>
              <Link to={'/'} className='info-adr-home' onClick={() => dispatch({ type: 'HOME' })}>Trang chủ</Link>
              <Link>Chi tiết vé</Link>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="info-ticket">
              <div className="info-ticket-type">
                <h1>LOẠI VÉ</h1>
                <span className="info-ticket-type">
                  {item.type}
                </span>
              </div>
              <div className='container-info'>
                  <span>Tên vé: {item.nameTicket}</span>
                  <span>Giá vé: {item.price} <sup>đ</sup></span>
                  <span>Loại phương tiện: {item.vehical}</span>
                  <span>Thời gian: {item.duration}</span>
                  <span>Lưu ý: </span>
                  <textarea className='note-ticket' readOnly name="" id="">
                    abcxyz
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
