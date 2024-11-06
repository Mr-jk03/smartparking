import React, { useState } from 'react'
import './Mytickets.css'
import { myticketData } from '../../../DataLocal/MyticketData'
import { FaEye } from "react-icons/fa";
import { IoQrCodeSharp } from "react-icons/io5";

const Mytickets = () => {

  const limittedMyticketData = myticketData.slice(0, 10);

  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectVehical, setSelectVehical] = useState('');

  const filterTickets = limittedMyticketData.filter((item) => 
    (selectedStatus ? item.status === selectedStatus:true) &&
    (selectVehical ? item.vehical === selectVehical: true)
  );
  

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
                <input type="text" placeholder='Tìm kiếm vé...'/>
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
                        <div className="col-xl-1 d-flex justify-content-center align-items-center">STT</div>
                        <div className="col-xl-2 d-flex justify-content-center align-items-center">Mã vé</div>
                        <div className="col-xl-1 d-flex justify-content-center align-items-center">Tên vé</div>
                        <div className="col-xl-2 d-flex justify-content-center align-items-center">Loại vé</div>
                        <div className="col-xl-2 d-flex justify-content-center align-items-center">Loại phương tiện</div>
                        <div className="col-xl-2 d-flex justify-content-center align-items-center">Trạng thái vé</div>
                        <div className="col-xl-2 d-flex justify-content-center align-items-center">Thao tác</div>
                      </div>
                    </div>
                  </div>

                  <div className="mytk-table-tr">
                    {filterTickets.map((item, index) =>
                    <div className="container  mytk-row" key={index}>
                      <div className="row" >
                        <div className="col-xl-1 d-flex justify-content-center align-items-center">{item.stt}</div>
                        <div className="col-xl-2 d-flex justify-content-center align-items-center">{item.code}</div>
                        <div className="col-xl-1 d-flex justify-content-center align-items-center">{item.nameTicket}</div>
                        <div className="col-xl-2 d-flex justify-content-center align-items-center">{item.type}</div>
                        <div className="col-xl-2 d-flex justify-content-center align-items-center">{item.vehical}</div>
                        <div className="col-xl-2 d-flex justify-content-center align-items-center">{item.status}</div>
                        <div className="col-xl-2 d-flex justify-content-center align-items-center mytk-btn-active">
                          <button>
                            <FaEye />
                          </button>
                          <button>
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
    </div>
  )
}
export default Mytickets