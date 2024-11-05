import React from 'react'
import './Balance.css'
import { useState } from 'react';
import { BalanceData } from '../../../DataLocal/BalanceData';

const Balance = () => {
  const [selectedTransaction, setSelectedTransaction] = useState('all');

  const handleTransactionChange = (event) => {
    setSelectedTransaction(event.target.value);
  };

  const limitedBalanceData = BalanceData.slice(0, 10);



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
                    <input type="radio" name="transactionType" value="revoke" 
                      checked = {selectedTransaction === 'revoke'}
                      onChange = {handleTransactionChange}
                    />
                    <span>Thu hồi</span>
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
                  <input type="text" placeholder='Tìm kiếm theo Email hoặc số điện thoại'/>
                </div>
              </div>
              <div className="col-xl-12 balance-table">
                <div className="container">
                  <div className="row balance-table-th">
                    <div className="col-xl-1 balance-th">STT</div>
                    <div className="col-xl-3 balance-th">Thời gian</div>
                    <div className="col-xl-2 balance-th">Số tiền</div>
                    <div className="col-xl-3 balance-th">Cộng / Trừ tiền</div>
                    <div className="col-xl-3 balance-th">Nội dung</div>
                  </div>
                  {limitedBalanceData.map((item) =>
                    <div className="row balance-table-td">
                      <div className="col-xl-1 balance-td">{item.stt}</div>
                      <div className="col-xl-3 balance-td">{item.day}</div>
                      <div className="col-xl-2 balance-td">{item.amount.toLocaleString('vi-VN')}</div>
                      <div className="col-xl-3 balance-td">{item.sttamount.toLocaleString('vi-VN')}</div>
                      <div className="col-xl-3 balance-td">{item.content}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-xl-12">

        </div>
        <div className="col-xl-12"></div> */}
    </div>
  )
}

export default Balance