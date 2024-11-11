import React, { useEffect, useState } from 'react';
import './DepositHistory.css';
import { IoIosSearch } from "react-icons/io";
import { FaEye } from "react-icons/fa";
// import { deponsitHistory } from "../../../DataLocal/DeponsitHistoryData";
import { endpoint } from '../../../../config/apiConfig';

const DepositHistory = () => {
  const [deponsitHistory, setDepositHistory] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');


  useEffect(() =>{

    const token = localStorage.getItem('token');

    fetch(endpoint.depositHistory.url, {
      method:endpoint.depositHistory.method,
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(responsive => responsive.json())
    .then(data => {
      if(data.code === 1000){
        setDepositHistory(data.result)
      }else{
        console.error('Loi khi lay su lieu')
      }
    })
    .catch(error =>{
      console.log('Loi ket noi', error)
    })
  }, [])


  // const totalLoaded = deponsitHistory
  //   .filter((item) => item.statusClass === 'success')
  //   .reduce((total, item) => total + item.amount, 0);
  
  const totalSuccess = deponsitHistory
    .filter((item) => item.statusClass === 'dp-history-loaded')
    .reduce((total, item) => total + item.amount, 0);
  
  const totalPending = deponsitHistory
    .filter((item) => item.statusClass === 'pending')
    .reduce((total, item) => total + item.amount, 0);

  // const [loaded] = useState(totalLoaded.toLocaleString('vi-VN'));
  const [successfully] = useState(totalSuccess.toLocaleString('vi-VN'));
  const [pending] = useState(totalPending.toLocaleString('vi-VN'));


  // Lọc dữ liệu theo trạng thái và ngày
  const filterDeponsitHistory = deponsitHistory.filter(item =>
    item.status.toLowerCase().includes(filterStatus.toLowerCase()) &&
    (!filterDate || item.date === filterDate.split('-').reverse().join('-')) // đổi định dạng ngày để so sánh
  );

  return (
    <div className='wrapper-dp-history'>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="container">
              <div className="row">
                {/* <div className="col-xl-4 col-lg-4 col-md-4 dp-htr">
                  <div className="dp-history-cart bg-htr-c1">
                    <span className='cart-htr-title'>Tổng số tiền đã nạp</span>
                    <span className='loaded'>{loaded} <sup>đ</sup></span>
                  </div>
                </div> */}
                <div className="col-xl-4 col-lg-4 col-md-4 dp-htr">
                  <div className="dp-history-cart bg-htr-c2">
                    <span className='cart-htr-title'>Số tiền đã duyệt thành công</span>
                    <span className='loaded'>{successfully} <sup>đ</sup></span>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 dp-htr">
                  <div className="dp-history-cart bg-htr-c3">
                    <span className='cart-htr-title'>Số tiền đang chờ duyệt</span>
                    <span className='loaded'>{pending} <sup>đ</sup></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 body-dp-htr">
            <div className="container">
              <div className="row">
                <div className='filter-1'>
                  <input 
                    type="date" 
                    value={filterDate} 
                    onChange={e => setFilterDate(e.target.value)} 
                  />
                  {/* <button>
                    <IoIosSearch />
                  </button> */}
                </div>
                <div className='filter-1'>
                  <input 
                    type="text" 
                    placeholder='Trạng thái'
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 deposit-history-table">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="table-header">
                    <div className="container">
                      <div className="row">
                        <div className="col-xl-1 col-lg-1 col-md-1 dps-history-th">
                          <span>STT</span>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 dps-history-th">
                          <span>Ngày nạp</span>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 dps-history-th">
                          <span>Số tiền</span>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 dps-history-th">
                          <span>Trạng thái</span>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 dps-history-th">
                          <span>Xem chi tiết</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-body">
                    <div className="container">
                      {filterDeponsitHistory.map((item, index) =>
                        <div className="row mg-row" key={index}>
                          <div className="col-xl-1 col-lg-1 col-md-1 dps-history-td">
                            <span>{item.stt}</span>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 dps-history-td">
                            <span>{item.date}</span>
                          </div>
                          <div className="col-xl-2 col-lg-2 col-md-2 dps-history-td">
                            <span>{item.amount.toLocaleString('vi-VN')}</span>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 dps-history-td">
                            <span className={item.statusClass}>{item.status}</span>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 dps-history-td">
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
  );
}
export default DepositHistory;
