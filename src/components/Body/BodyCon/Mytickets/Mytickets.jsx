import React, { useEffect, useState } from 'react';
import './Mytickets.css';
// import { myticketData } from '../../../DataLocal/MyticketData';
import { FaEye } from "react-icons/fa";
import { IoQrCodeSharp } from "react-icons/io5";
import QR from '../../../Images/qr.png';
import { FaWindowClose } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { endpoint } from '../../../../config/apiConfig';

const Mytickets = () => {

  const [myticketData, setMyticketData] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectVehical, setSelectVehical] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(null);

  useEffect(() =>{

    const token = localStorage.getItem('token');

    fetch(endpoint.myTicket.url, {
      method: endpoint.myTicket.method,
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data =>{
      if(data.code === 1000){
        setMyticketData(data.result);
      }else{
        console.log('Loi khi lay du lieu');
      }
    })
    .catch(error =>{
      console.log('Loi ket noi', error);
    })
  }, [])


  const filterTickets = myticketData.filter((item) => 
    (selectedStatus ? item.status === selectedStatus : true) &&
    (selectVehical ? item.vehical === selectVehical : true)
  );

  const handleShowqr = (index) => {
    setSelectedTicketIndex(index);
    setIsVisible(true);
  };

  const handleCloseQR = () => {
    setIsVisible(false);
    setSelectedTicketIndex(null);
  };



  return (
    <div className='wrapper-myticket'>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="myticket-title">
              <h2>Vé của tôi</h2>
            </div>
          </div>
          <div className="col-xl-12">
            <div className='myticket-content'>
              <div className='mytk-input'>
                <input type="text" placeholder='Tìm kiếm vé...' />
              </div>
              <div className="mytk-filter">
                <select name="" id="" onChange={(e) => setSelectedStatus(e.target.value)}>
                  <option value="" selected>--Trạng thái--</option>
                  <option value="Đã sử dụng">Đã sử dụng</option>
                  <option value="Chưa sử dụng">Chưa sử dụng</option>
                  <option value="Bị huỷ">Bị huỷ</option>
                </select>
                <select name="" id="" onChange={(e) => setSelectVehical(e.target.value)}>
                  <option value="" selected>--Phương tiện--</option>
                  <option value="Xe máy">Xe máy</option>
                  <option value="Ô tô">Ô tô</option>
                </select>
              </div>
              <div className="mytk-table">
                <div className="mytk-table-th">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-1 col-lg-1 col-md-1 d-flex justify-content-center align-items-center">STT</div>
                      {/* <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">Mã vé</div> */}
                      <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">Tên vé</div>
                      {/* <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">Loại vé</div> */}
                      <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">Loại phương tiện</div>
                      <div className="col-xl-3 col-lg-3 col-md-3 d-flex justify-content-center align-items-center">Trạng thái vé</div>
                      <div className="col-xl-4 col-lg-4 col-md-4 d-flex justify-content-center align-items-center">Thao tác</div>
                    </div>
                  </div>
                </div>

                <div className="mytk-table-tr">
                  {filterTickets.map((item, index) =>
                    <div className="container mytk-row" key={index}>
                      <div className="row">
                        <div className="col-xl-1 col-lg-1 col-md-1 d-flex justify-content-center align-items-center">{index + 1}</div>
                        {/* <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">{item.code}</div> */}
                        <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">{item.nameTicket}</div>
                        {/* <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">{item.type}</div> */}
                        <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">{item.vehical}</div>
                        <div className="col-xl-3 col-lg-3 col-md-3 d-flex justify-content-center align-items-center">{item.status}</div>
                        <div className="col-xl-4 col-lg-4 col-md-4 d-flex justify-content-center align-items-center mytk-btn-active">
                          <button className='btn-myticket-eye'>
                            <Link to={'/ticketdetailbuyed'}>
                              <FaEye />
                            </Link>
                          </button>
                          <button onClick={() => handleShowqr(index)}>
                            <IoQrCodeSharp />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isVisible && selectedTicketIndex !== null && (
        <div className={`popup-qr slide-in`}>
          <div className='myticket-qr'>
            <button onClick={handleCloseQR}>
              <FaWindowClose />
            </button>
            <img src={QR} alt="QR Code" />
            <p>{filterTickets[selectedTicketIndex].code}</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Mytickets;
