import React, { useEffect, useState } from 'react';
import './Mytickets.css';
import { FaEye } from "react-icons/fa";
import { IoQrCodeSharp } from "react-icons/io5";
import QR from '../../../Images/qr.png';
import { FaWindowClose } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { endpoint, refreshToken } from '../../../../config/apiConfig';
import { toast, ToastContainer } from 'react-toastify';
import { QRCodeCanvas } from 'qrcode.react';

const Mytickets = () => {
  const [maxPage, setMaxPage] = useState(false)
  const [concat, setConcat] = useState(false)
  const [myticketData, setMyticketData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const [page, setPage] = useState(1)
  const [vehicle, setVehicle] = useState("all")
  const [containQr, setContainQr] = useState({})

  const getParam = () => {
    return `?page=${page}&vehicle=${vehicle}`
  }

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight <= e.target.scrollTop + e.target.clientHeight + 5;
    if (bottom) {
      if (!maxPage)
        setPage(prevPage => prevPage + 1);
    }
  };

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
          if (data.result.length > 0)
            if (concat) {
              setMyticketData([...myticketData, ...data.result]);
            } else {
              setMyticketData(data.result)
              setConcat(true);
            }
          else {
            setMaxPage(true)
          }
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
  }, [page, vehicle]);

  const handleShowqr = (index) => {
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

  const handleChangeVehicle = (event) => {
    setConcat(false);
    setPage(1)
    setMaxPage(false)
    setVehicle(event.target.value)
  }

  return (
    <div className='wrapper-myticket'>
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="myticket-title">
              <h2>Vé của tôi</h2>
            </div>
          </div>
          <div className="col-xl-12">
            <div className='myticket-content'>

              <div className="mytk-filter">
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
                      <div className="col-xl-2 col-lg-2 col-md-2">Id</div>
                      <div className="col-xl-2 col-lg-2 col-md-2">Tên vé</div>
                      <div className="col-xl-2 col-lg-2 col-md-2">Loại phương tiện</div>
                      <div className="col-xl-3 col-lg-3 col-md-3">Ngày sử dụng</div>
                      <div className="col-xl-2 col-lg-2 col-md-2">Thao tác</div>
                    </div>
                  </div>
                </div>

                <div className="mytk-table-tr" onScroll={handleScroll}>
                  {myticketData.length > 0 ? (
                    myticketData.map((item, index) => (
                      <div className="container mytk-row" key={index}>
                        <div className="row">
                          <div className="col-xl-1 col-lg-1 col-md-1" style={{ textAlign: "right" }}>{index + 1}</div>
                          <div className="col-xl-2 col-lg-2 col-md-2">{item.ticketId}</div>
                          <div className="col-xl-2 col-lg-2 col-md-2">{item.name}</div>
                          <div className="col-xl-2 col-lg-2 col-md-2">{item.vehicle === "CAR" ? "Ô tô" : "Xe máy"}</div>
                          <div className="col-xl-3 col-lg-3 col-md-3">{item.startTime}</div>
                          <div className="col-xl-2 col-lg-2 col-md-2 mytk-btn-active" style={{ display: "flex" }}>
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
            <QRCodeCanvas
              value={containQr.contain} // Nội dung được chuyển thành mã QR
              size={350} // Kích thước mã QR
              level="H" // Cấp độ sửa lỗi: L, M, Q, H
              marginSize="5" // Thêm khoảng trắng xung quanh
            />
            <p>{containQr.ticketId}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mytickets;
