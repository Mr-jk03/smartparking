import React, { useEffect } from 'react'
import './Balance.css'
import { useState } from 'react';
// import { BalanceData } from '../../../DataLocal/BalanceData';
import { endpoint, refreshToken } from '../../../../config/apiConfig';
import { toast } from 'react-toastify';

const getDate = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Tháng bắt đầu từ 0, cần
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
}

const convertDate = (date) => {
  console.log(date)
  let split = date.split('-');
  console.log(split)
  return `${split[2]}/${split[1]}/${split[0]}`;
}

const Balance = () => {


  const [selectedTransaction, setSelectedTransaction] = useState('credit');
  const [reson, setReson] = useState('APPROVE');
  const [filterDate, setFilterDate] = useState(getDate);
  const [baLance, setBalance] = useState([]);
  const [reload, seReload] = useState(true);

  useEffect(() => {
    if (!reload) {
      return;
    }
    seReload(false);
    const token = localStorage.getItem('token');
    fetch(endpoint.balance.url + `?date=${convertDate(filterDate)}&type=${reson ? reson : ""}`, {
      method: endpoint.balance.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.code === 1000) {
          setBalance(data.result);
        } else if (data.code === 5010) {
          refreshToken()
        } else {
          toast.error(data.message, {
            position: "top-right"
          })
        }
      })
      .catch(error => {
        console.log('Loi ket noi', error)
      })
  }, [reload])


  const handleDateChange = (event) => {
    setFilterDate(event.target.value)
    seReload(true);
  }


  const handleTransactionChange = (event, value) => {
    setSelectedTransaction(value)
    seReload(true);
  };

  const handleChangeReson = (event, value) => {
    setReson(value)
    seReload(true);
  };

  const convertContant = (contain) => {
    console.log(contain)
    if (contain.toUpperCase() === "APPROVE")
      return "Nạp tiền"
    else
      return contain
  }

  return (
    <div className='wrapper-banlance'>
      <div className="col-xl-12">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="balance-title">Biến động số dư</div>
            </div>
            <div className="col-xl-12">
              <div className="balance-radio">
                <div className="group-radio">
                  {/* <label>
                    <input type="radio" name="transactionType" value="all"
                      checked={selectedTransaction === 'all'}
                      onChange={handleTransactionChange}
                    />
                    <span>Tất cả</span>
                  </label> */}
                  {/* <div>
                    <label>
                      <input type="radio" name="transactionType" value="addMoney"
                        checked={selectedTransaction === 'credit'}
                        onChange={(e) => { handleTransactionChange(e, "credit") }}
                      />
                      <span>Cộng tiền</span>
                    </label>
                    <label>
                      <input type="radio" name="transactionType" value="subtractMoney"
                        checked={selectedTransaction === 'debit'}
                        onChange={(e) => { handleTransactionChange(e, "debit") }}
                      />
                      <span>Trừ tiền</span>
                    </label>
                  </div> */}
                  <div>
                    <label>
                      <input type="radio" name="reasonTYpe" value="deposit"
                        checked={reson === 'APPROVE'}
                        onClick={(e) => { handleChangeReson(e, "APPROVE") }}
                      />
                      <span>Nạp tiền</span>
                    </label>
                    <label>
                      <input type="radio" name="reasonTYpe" value="buyTicket"
                        checked={reson === 'BUY_TICKET'}
                        onClick={(e) => { handleChangeReson(e, "BUY_TICKET") }}
                      />
                      <span>Mua vé</span>
                    </label>
                    <label>
                      <input type="radio" name="reasonTYpe" value="extendTicket"
                        checked={reson === 'EXTEND_TICKET'}
                        onClick={(e) => { handleChangeReson(e, "EXTEND_TICKET") }}
                      />
                      <span>Gia hạn vé</span>
                    </label>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-xl-12">
              <div className="balance-filter">
                <input type="date"
                  value={filterDate}
                  onChange={handleDateChange}
                />
              </div>
              {/* <div className="balance-filter">
                <input type="text" placeholder='Tìm kiếm theo trạng thái'
                  value={reson}
                // onChange={(e) => handleDateChange(e.target.value)}
                />
              </div> */}
            </div>
            <div className="col-xl-12 balance-table">
              <div className="container">
                <div className="row balance-table-th">
                  <div className="col-xl-1 col-lg-1 col-md-1 balance-th">STT</div>
                  <div className="col-xl-5 col-lg-5 col-md-5 balance-th">Thời gian</div>
                  <div className="col-xl-2 col-lg-2 col-md-2 balance-th">Số tiền</div>
                  <div className="col-xl-4 col-lg-4 col-md-4 balance-th">Nội dung</div>
                </div>
                {baLance.length > 0 ? (
                  baLance.map((item, index) => (
                    <div className="row balance-table-td" key={index}>
                      <div className="col-xl-1 col-lg-1 col-md-1 balance-td">{index + 1}</div>
                      <div className="col-xl-5 col-lg-5 col-md-5 balance-td">
                        {item.time}
                      </div>
                      <div className="col-xl-2 col-lg-2 col-md-2 balance-td">
                        {item.amount.toLocaleString('vi-VN')}
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 balance-td">{convertContant(item.contain)}</div>
                    </div>
                  ))
                ) : (
                  <div className="row">
                    <div className="col-xl-12 text-center">Không có dữ liệu</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Balance