import React, { useEffect, useState } from 'react';
import './Mytickets.css';
import { FaEye } from "react-icons/fa";
import { IoQrCodeSharp } from "react-icons/io5";
import QR from '../../../Images/qr.png';
import { FaWindowClose } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { endpoint, refreshToken } from '../../../../config/apiConfig';
import { toast } from 'react-toastify';

const Mytickets = () => {
  const [myticketData, setMyticketData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectVehical, setSelectVehical] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const [page, setPage] = useState(1)
  const [vehicle, setVehicle] = useState("all")
  const [status, setStatus] = useState("all")
  const [containQr, setContainQr] = useState({})

  const getParam = () => {
    return `?page=${page}&vehicle=${vehicle}&status=${status}`
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(endpoint.myTicket.url + getParam(), {
      method: endpoint.myTicket.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

    })
      .then(response => response.json())
      .then(data => {
        if (data.code === 1000) {
          setMyticketData(data.result);
        } else if (data.code === 5010) {
          refreshToken()
        } else {
          toast.error(data.message, {
            position: "top-right"
          })
        }
      })
      .catch(error => {
        console.log('Lỗi kết nối', error);
      });
  }, [page, vehicle, status]);

  const filterTickets = myticketData.filter((item) =>
    (selectedStatus ? item.status === selectedStatus : true) &&
    (selectVehical ? item.vehical === selectVehical : true)
  );

  const handleShowqr = (index) => {
    console.log(index)
    console.log(myticketData[index])
    const token = localStorage.getItem('token');
    fetch(endpoint.getFirstQr.url + `?ticket=${myticketData[index].ticketId}`, {
      method: endpoint.getFirstQr.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

    })
      .then(response => response.json())
      .then(data => {
        if (data.code === 1000) {
          setContainQr(data.result)
          setIsVisible(true);
        } else if (data.code === 5010) {
          refreshToken()
        } else {
          toast.error(data.message, {
            position: "top-right"
          })
        }
      })
      .catch(error => {
        console.log('Lỗi kết nối', error);
      });

  };

  const handleCloseQR = () => {
    setIsVisible(false);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value)
  }
  const handleChangeVehicle = (event) => {
    setVehicle(event.target.value)
  }

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
                <select onChange={handleChangeStatus}>
                  <option value="all">--Trạng thái--</option>
                  <option value="using">Đang sử dụng</option>
                  <option value="expired">Đã hết hạn</option>
                </select>
                <select onChange={handleChangeVehicle}>
                  <option value="all">--Phương tiện--</option>
                  <option value="motorbike">Xe máy</option>
                  <option value="car">Ô tô</option>
                </select>
              </div>

              <div className="mytk-table">
                <div className="mytk-table-th">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-1 col-lg-1 col-md-1">STT</div>
                      <div className="col-xl-2 col-lg-2 col-md-2">Tên vé</div>
                      <div className="col-xl-2 col-lg-2 col-md-2">Loại phương tiện</div>
                      <div className="col-xl-3 col-lg-3 col-md-3">Trạng thái vé</div>
                      <div className="col-xl-4 col-lg-4 col-md-4">Thao tác</div>
                    </div>
                  </div>
                </div>

                <div className="mytk-table-tr">
                  {filterTickets.length > 0 ? (
                    filterTickets.map((item, index) => (
                      <div className="container mytk-row" key={index}>
                        <div className="row">
                          <div className="col-xl-1 col-lg-1 col-md-1">{index + 1}</div>
                          <div className="col-xl-2 col-lg-2 col-md-2">{item.name}</div>
                          <div className="col-xl-2 col-lg-2 col-md-2">{item.vehicle}</div>
                          <div className="col-xl-3 col-lg-3 col-md-3">{item.status}</div>
                          <div className="col-xl-4 col-lg-4 col-md-4 mytk-btn-active" style={{ display: "flex" }}>
                            <Link to={'/ticketdetailbuyed/' + item.ticketId}>
                              <button className='btn-myticket-eye'>
                                <FaEye />
                              </button>
                            </Link>
                            <button onClick={() => handleShowqr(index)}>
                              <IoQrCodeSharp />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="row">
                      <div className="col-12 text-center">
                        <span>Không có dữ liệu</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isVisible && (
        <div className={`popup-qr slide-in`}>
          <div className='myticket-qr'>
            <button onClick={handleCloseQR}>
              <FaWindowClose />
            </button>
            <img src={QR} alt="QR Code" />
            <p>{containQr.ticketId}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mytickets;
