import React from 'react'
import './DepositHistory.css'
import { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { deponsitHistory } from "../../../DataLocal/DeponsitHistoryData"

const DepositHistory = () => {
  
  const [loaded, setLoaded] = useState((1200000).toLocaleString('vi-VN'))
  const [successfully, setSuccessfully] = useState((1200000).toLocaleString('vi-VN'))
  const [pending, setPending] = useState((1200000).toLocaleString('vi-VN'))

  const [filterStatus, setFilterStatus] = useState('');

  const lemitedDeponsitHistory = deponsitHistory.slice(0, 10);

  const filterDeponsitHistory = lemitedDeponsitHistory.filter(item =>
    item.status.toLowerCase().includes(filterStatus.toLowerCase())
  )

  return (
    <div className='wrapper-dp-history'>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 dp-htr">
                  <div className="dp-history-cart bg-htr-c1">
                    <span className='cart-htr-title'>Tổng số tiền đã nạp</span>
                    <span className='loaded'>{loaded} <sup>đ</sup></span>
                  </div>
                </div>
                <div className="col-xl-4 dp-htr">
                  <div className="dp-history-cart bg-htr-c2">
                    <span className='cart-htr-title'>Số tiền đã duyệt thành công</span>
                    <span className='loaded'>{successfully} <sup>đ</sup></span>
                  </div>
                </div>
                <div className="col-xl-4 dp-htr">
                  <div className="dp-history-cart bg-htr-c3">
                    <span className='cart-htr-title'>Số tiền đang chờ duyệt</span>
                    <span className='loaded'>{pending} <sup>đ</sup></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 body-dp-htr">
            <div className="container">
              <div className="row">
                <div className='filter-1'>
                  <input type="date"/>
                  <button>
                    <IoIosSearch />
                  </button>
                </div>
                <div className='filter-1'>
                  <input type="text" placeholder='Trạng thái'
                    value={filterStatus}
                    onChange={e =>{setFilterStatus(e.target.value)}}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 deposit-history-table">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="table-header">
                    <div className="container">
                      <div className="row">
                        <div className="col-xl-1 dps-history-th">
                          <span>STT</span>
                        </div>
                        <div className="col-xl-3 dps-history-th">
                          <span>Ngày nạp</span>
                        </div>
                        <div className="col-xl-2 dps-history-th">
                          <span>Số tiền</span>
                        </div>
                        <div className="col-xl-3 dps-history-th">
                          <span>Trạng thái</span>
                        </div>
                        <div className="col-xl-3 dps-history-th">
                          <span>Xem chi tiết</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-body">
                    <div className="container">
                      {filterDeponsitHistory.map((item, index) =>
                        <div className="row mg-row" key={index}>
                          <div className="col-xl-1 dps-history-td">
                            <span>{item.stt}</span>
                          </div>
                          <div className="col-xl-3 dps-history-td">
                            <span>{item.date}</span>
                          </div>
                          <div className="col-xl-2 dps-history-td">
                            <span>{item.amount}</span>
                          </div>
                          <div className="col-xl-3 dps-history-td">
                            <span className={item.statusClass}>{item.status}</span>
                          </div>
                          <div className="col-xl-3 dps-history-td">
                            <button className='btn-history-dp'>
                              <FaEye />
                            </button>
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
      </div>
    </div>
  )
}
export default DepositHistory
