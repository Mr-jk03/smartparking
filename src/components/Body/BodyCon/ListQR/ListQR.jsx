import React, { useEffect, useRef } from 'react'
import './ListQR.css'
import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import qr from '../../../Images/qr.png'
import { useParams } from 'react-router-dom';
import { endpoint, refreshToken } from '../../../../config/apiConfig';
import { toast, ToastContainer } from 'react-toastify';
import { QRCodeCanvas } from 'qrcode.react';


const ListQR = () => {

  const qrRef = useRef(null); // Tạo ref để truy cập QRCodeCanvas

  const downloadQRCode = (ticketId) => {
    const canvas = qrRef.current.querySelector("canvas"); // Lấy canvas từ QRCodeCanvas
    const url = canvas.toDataURL("image/png"); // Chuyển canvas thành URL ảnh PNG
    const link = document.createElement("a");
    link.href = url;
    link.download = `${ticketId}.png`;
    link.click();
  };

  const [data, setData] = useState([])
  const [showQr, setShowQr] = useState(false)
  const [indexQr, setIndexQr] = useState(null)

  const { ticketId } = useParams()

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(endpoint.allQR.url + `?ticket=${ticketId}`, {
      method: endpoint.allQR.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

    })
      .then(response => response.json())
      .then(data => {
        if (data.code === 1000) {
          setData(data.result);
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
  }, [])
  const [isVisibleQR, setIsVisibleQR] = useState(false);

  const handleshowQRInOut = (index) => {
    setIndexQr(index)
    setIsVisibleQR(true);
  };

  const handleCloseQr = () => {
    setIsVisibleQR(false);
  }

  const handleClickCreateQr = () => {
    const token = localStorage.getItem('token');
    fetch(endpoint.createQr.url, {
      method: endpoint.createQr.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ticketId: ticketId })
    })
      .then(response => response.json())
      .then(data => {
        if (data.code === 1000) {
          setData(pre => [data.result, ...pre]);
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
  }


  return (
    <div className='wrapper-listQR'>
      <ToastContainer />
      <div className="container">

        <div className="row">

          <span className='list-qr-title'>Danh sách QR</span>
          <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center align-items-center">
            <div className='table-list-qr'>
              <div className="container">
                <div className="row">
                  <div style={{ display: "flex", justifyContent: "right" }}>
                    <button type="button" class="btn btn-primary" onClick={handleClickCreateQr} style={{ width: "200px", marginBottom: '15px' }}>Tạo mã</button>
                  </div>
                  <div className='t-head-qr'>
                    <div className="container">
                      <div className="row">
                        <div className="col-xl-1 col-lg-1 col-md-1 text-center">STT</div>
                        <div className="col-xl-8 col-lg-8 col-md-8">Thời gian tạo</div>
                        <div className="col-xl-3 col-lg-3 col-md-3 text-center">Thao tác</div>
                      </div>
                    </div>
                  </div>

                  <div className='t-body-qr'>
                    <div className="container" style={{ overflowY: "scroll", maxHeight: "400px" }}>
                      {data.map((item, index) => {
                        return (
                          <div className="row" style={{ marginTop: '5px', padding: "10px" }}>
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">{index + 1}</div>
                            <div className="col-xl-8 col-lg-8 col-md-8">{item.createTime}</div>
                            <div className="col-xl-3 col-lg-3 col-md-3 d-flex justify-content-center align-items-center">
                              {index === 0 && <button className='btn-qr-listqr' onClick={() => { handleshowQRInOut(index) }}>Xem mã</button>}
                            </div>
                          </div>

                        )
                      })}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        isVisibleQR && (<div className='popup-qr-listqr active'>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-end align-items-center">
                <button className='btn-close-qr' onClick={handleCloseQr}><IoClose /></button>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center align-items-center">
                <div className='bg-qr-listqr'>
                  <div className='qr-img' ref={qrRef}>
                    <QRCodeCanvas
                      value={data[indexQr].contain} // Nội dung được chuyển thành mã QR
                      size={350} // Kích thước mã QR
                      level="H" // Cấp độ sửa lỗi: L, M, Q, H
                      marginSize="5" // Thêm khoảng trắng xung quanh
                    />
                  </div>
                  <a href={qr} download="qr-code.png" className='a-btn'>
                    <button className='download-qr' onClick={() => downloadQRCode(data[indexQr].ticketId)}>Tải xuống</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>)
      }
    </div >
  )
}

export default ListQR
