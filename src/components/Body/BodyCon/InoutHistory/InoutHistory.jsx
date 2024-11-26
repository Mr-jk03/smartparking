import React, { useEffect, useState } from 'react';
import './InoutHistory.css';
import { IoClose } from "react-icons/io5";
import vao from '../../../Images/vao.jpg'
import ra from '../../../Images/ra.jpg'
import { endpoint, refreshToken } from '../../../../config/apiConfig';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


const InoutHistory = () => {
  const [isVisiblePlate, setIsVisiblePlate] = useState(false);
  const [indexSelect, setIndexSelect] = useState(0);
  const handleshowImageInOut = (index) => {
    setIndexSelect(index)
    setIsVisiblePlate((prev) => !prev);
  };

  const [data, setData] = useState([])
  const { ticketId } = useParams()
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(endpoint.getListPlateForTicket.url + "?ticket=" + ticketId, {
      method: endpoint.getListPlateForTicket.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          setData(data.result)
        } else if (data.code === 5010) {
          refreshToken()
        } else {
          toast.error(data.message, {
            position: "top-right"
          })
        }
      })
      .catch((error) => {
        console.log("Lỗi kết nối", error);
      });
  }, [])

  return (
    <div className='wrapper-in-out'>
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <span className='title-inout'>Danh sách lịch sử ra vào</span>
            <div className='inout-htr-th'>
              <div className="col-xl-2 col-lg-2 col-md-2 text-center">Lượt</div>
              <div className="col-xl-2 col-lg-2 col-md-2 text-center">Thời gian vào</div>
              <div className="col-xl-2 col-lg-2 col-md-2 text-center">Thời gian ra</div>
              <div className="col-xl-3 col-lg-3 col-md-3 text-center">Nội dung biển số</div>
              <div className="col-xl-2 col-lg-2 col-md-2 text-center">Thao tác</div>
            </div>

            {
              data.map((item, index) => {
                return (
                  <div className='inout-htr-td'>
                    <div className="col-xl-2 col-lg-2 col-md-2 text-center"><span>Lượt </span>{item.turn}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2 text-center">{item.checkinTime}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2 text-center">{item.checkoutAt ? item.checkoutTime : "---"}</div>
                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">{item.contentPlate}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2 text-center">
                      <button className='btn-show-in-out' onClick={() => { handleshowImageInOut(index) }}>Xem ảnh</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      {isVisiblePlate && (<div className="popup-inpit-image active">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-end align-items-center">
              <button className='btn-close-show' onClick={handleshowImageInOut}><IoClose /></button>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 d-flex justify-content-center align-items-center">
              <div className='bg-inout'>
                <span>Ảnh vào</span>
                <div className='img-inout'>
                  <img src={`${data[indexSelect].urlPrefixCode}/${data[indexSelect].imageIn}`} alt='in' />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 d-flex justify-content-center align-items-center">
              <div className='bg-inout'>
                <span>Ảnh ra</span>
                <div className='img-inout'>
                  <img src={`${data[indexSelect].urlPrefixCode}/${data[indexSelect].imageOut}`} alt='out' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}

    </div>
  );
};

export default InoutHistory;
