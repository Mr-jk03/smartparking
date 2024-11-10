import React from 'react'
import './Balance.css'
import { useState } from 'react';
import { BalanceData } from '../../../DataLocal/BalanceData';

const Balance = () => {
  

  const [selectedTransaction, setSelectedTransaction] = useState('all');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const handleTransactionChange = (event) => {
    setSelectedTransaction(event.target.value);
  };


  const handleFilterItem = BalanceData.filter(item =>{

    const matchesTransaction = 
      selectedTransaction === 'all' ||
      (selectedTransaction === 'deposit' && item.content.includes('Nạp tiền')) ||
      (selectedTransaction === 'buyTicket' && item.content.includes('Mua vé')) ||
      (selectedTransaction === 'extendTicket' && item.content.includes('Gia hạn vé'));


    const matchesStatus = item.content.toLowerCase().includes(filterStatus.toLowerCase()); 
    const formattedDate = filterDate ? filterDate.split('-').reverse().join('-') : '';
    const matchesDay = !filterDate || item.day === formattedDate;

    return matchesTransaction && matchesStatus && matchesDay
  })


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
                  <label>
                    <input type="radio" name="transactionType" value="all" 
                      checked ={selectedTransaction === 'all'}
                      onChange={handleTransactionChange}
                    />
                    <span>Tất cả</span>
                  </label>
                  <label>
                    <input type="radio" name="transactionType" value="addMoney" 
                      checked = {selectedTransaction === 'addMoney'}
                      onChange={handleTransactionChange}
                    />
                    <span>Cộng tiền</span>
                  </label>
                  <label>
                    <input type="radio" name="transactionType" value="subtractMoney" 
                      checked = {selectedTransaction === 'subtractMoney'}
                      onChange = {handleTransactionChange}
                    />
                    <span>Trừ tiền</span>
                  </label>
                  <label>
                    <input type="radio" name="transactionType" value="deposit" 
                      checked = {selectedTransaction === 'deposit'}
                      onChange = {handleTransactionChange}
                    />
                    <span>Nạp tiền</span>
                  </label>
                  <label>
                    <input type="radio" name="transactionType" value="buyTicket" 
                      checked = {selectedTransaction === 'buyTicket'}
                      onChange = {handleTransactionChange}
                    />
                    <span>Mua vé</span>
                  </label>
                  <label>
                    <input type="radio" name="transactionType" value="extendTicket" 
                      checked = {selectedTransaction === 'extendTicket'}
                      onChange = {handleTransactionChange}
                    />
                    <span>Gia hạn vé</span>
                  </label>
                </div>

                </div>
              </div>
              <div className="col-xl-12">
                <div className="balance-filter">
                  <input type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                  />
                </div>
                <div className="balance-filter">
                  <input type="text" placeholder='Tìm kiếm theo trạng thái'
                    value={filterStatus}
                    onChange={(e)=> setFilterStatus(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xl-12 balance-table">
                <div className="container">
                  <div className="row balance-table-th">
                    <div className="col-xl-1 col-lg-1 col-md-1 balance-th">STT</div>
                    <div className="col-xl-5 col-lg-5 col-md-5 balance-th">Thời gian</div>
                    <div className="col-xl-2 col-lg-2 col-md-2 balance-th">Số tiền</div>
                    <div className="col-xl-4 col-lg-4 col-md-4 balance-th">Nội dung</div>
                  </div>
                  {handleFilterItem.map((item, index) =>
                    <div className="row balance-table-td" key={index}>
                      <div className="col-xl-1 col-lg-1 col-md-1 balance-td">{index + 1}</div>
                      <div className="col-xl-5 col-lg-5 col-md-5 balance-td">{item.day} | {item.times}</div>
                      <div className="col-xl-2 col-lg-2 col-md-2 balance-td">{item.amount.toLocaleString('vi-VN')}</div>
                      <div className="col-xl-4 col-lg-4 col-md-4 balance-td">{item.content}</div>
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