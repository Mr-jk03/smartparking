import React from 'react'
import './ListQR.css'
import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import qr from '../../../Images/qr.png'

const ListQR = () => {  

  const [isVisibleQR, setIsVisibleQR] = useState(false);

  const handleshowQRInOut = () => {
    setIsVisibleQR((prev) => !prev);
  };


  return (
    <div className='wrapper-listQR'>
      <div className="container">
        <div className="row">
          <span className='list-qr-title'>Danh sách QR</span>
          <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center align-items-center">
            <div className='table-list-qr'>
              <div className="container">
                <div className="row">
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
                      <div className="container">
                        <div className="row">
                          <div className="col-xl-1 col-lg-1 col-md-1 text-center">1</div>
                          <div className="col-xl-8 col-lg-8 col-md-8">----------------</div>
                          <div className="col-xl-3 col-lg-3 col-md-3 d-flex justify-content-center align-items-center">
                            <button className='btn-qr-listqr' onClick={handleshowQRInOut}>Xem mã</button>
                          </div>
                        </div>
                      </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`popup-qr-listqr ${isVisibleQR ? 'active' :''}`}>
        <div className="container">
          <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-end align-items-center">
                  <button className='btn-close-qr' onClick={handleshowQRInOut}><IoClose /></button>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center align-items-center">
                  <div className='bg-qr-listqr'>
                    <div className='qr-img'>
                        <img src={qr}/>
                    </div>
                    <a href={qr} download="qr-code.png" className='a-btn'>
                      <button className='download-qr'>Tải xuống</button>
                    </a>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListQR
