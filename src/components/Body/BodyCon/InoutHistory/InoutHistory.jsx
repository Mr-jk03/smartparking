import React, { useState } from 'react';
import './InoutHistory.css';
import { IoClose } from "react-icons/io5";
import vao from '../../../Images/vao.jpg'
import ra from '../../../Images/ra.jpg'


const InoutHistory = () => {
  const [isVisiblePlate, setIsVisiblePlate] = useState(false);

  const handleshowImageInOut = () => {
    setIsVisiblePlate((prev) => !prev);
  };

  return (
    <div className='wrapper-in-out'>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <span className='title-inout'>Danh sách lịch sử ra vào</span>
            <div className='inout-htr-th'>
              <div className="col-xl-1 col-lg-1 col-md-1 text-center">STT</div>
              <div className="col-xl-2 col-lg-2 col-md-2 text-center">Lượt</div>
              <div className="col-xl-2 col-lg-2 col-md-2 text-center">Thời gian vào</div>
              <div className="col-xl-2 col-lg-2 col-md-2 text-center">Thời gian ra</div>
              <div className="col-xl-3 col-lg-3 col-md-3 text-center">Nội dung biển số</div>
              <div className="col-xl-2 col-lg-2 col-md-2 text-center">Thao tác</div>
            </div>

            <div className='inout-htr-td'>
              <div className="col-xl-1 col-lg-1 col-md-1 text-center">1</div>
              <div className="col-xl-2 col-lg-2 col-md-2 text-center"><span>1</span> Lượt</div>
              <div className="col-xl-2 col-lg-2 col-md-2 text-center">14:00:40</div>
              <div className="col-xl-2 col-lg-2 col-md-2 text-center">14:59:40</div>
              <div className="col-xl-3 col-lg-3 col-md-3 text-center">35H2 - 5877</div>
              <div className="col-xl-2 col-lg-2 col-md-2 text-center">
                <button className='btn-show-in-out' onClick={handleshowImageInOut}>Xem ảnh</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`popup-inpit-image ${isVisiblePlate ? 'active' : ''}`}>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-end align-items-center">
                  <button className='btn-close-show' onClick={handleshowImageInOut}><IoClose /></button>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 d-flex justify-content-center align-items-center">
                <div className='bg-inout'>
                  <span>Ảnh vào</span>
                  <div className='img-inout'>
                    <img src={vao}/>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 d-flex justify-content-center align-items-center">
                <div className='bg-inout'>
                  <span>Ảnh ra</span>
                  <div className='img-inout'>
                    <img src={ra}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default InoutHistory;
