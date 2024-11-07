import React, { useState } from 'react'
import './Deposit.css'
import { TbAlertTriangleFilled } from "react-icons/tb";
import  QR  from '../../../Images/qr.png'


const Deposit = () => {
  const [deposit, setDeposit] = useState()

  const handleChooseAmount = (amount) =>{
    setDeposit(amount.toLocaleString('vi-VN'))
  }

  return (
    <div className='wrapper-deposit'>
        <div className='container'>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 dp-title-head">
                <h1>nạp tiền</h1>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 dp-body">
              <div className="container">
                <div className="row">
                  <div className="col-xl-7 col-lg-7 col-md-7">
                    <div className="note">
                      <h3>hướng dẫn</h3>
                      <span>Bước 1: Chọn mệnh giá nạp</span>
                      <span>Bước 2: Quyét mã QR chuyển khoản với nội dung điền sẵn</span>
                      <span>Bước 3: Chọn nút đã chuyển khoản phía dưới</span>
                      <span>Bước 4: Bạn sẽ được cộng tiền chỉ sau vài phút, cố gắng đợi nhé</span>
                      <div className='alert-note'>
                        <TbAlertTriangleFilled />
                        <span>Lưu ý</span>
                      </div>
                      <span>- Không thay đổi mệnh giá, sau khi đã chuyển khoản thành công</span>
                      <span>- Nếu có vấn đề phát sinh hãy liên hệ với chúng tôi</span>
                      <span>- Mọi vấn đề phát sinh do bạn không tuân thủ các bước trên sẽ không được giải quyết</span>
                      <span>- Các trường hợp cố tình gian lận sẽ bị khoá tài khoản vĩnh viễn</span>
                    </div>
                    <div className="select-denomination">
                      <h4>Chọn mệnh giá</h4>
                      <button className='dp-cart' onClick={() =>handleChooseAmount(10000)}>10.000</button>
                      <button className='dp-cart' onClick={() =>handleChooseAmount(20000)}>20.000</button>
                      <button className='dp-cart' onClick={() =>handleChooseAmount(50000)}>50.000</button>
                      <button className='dp-cart' onClick={() =>handleChooseAmount(100000)}>100.000</button>
                      <button className='dp-cart' onClick={() =>handleChooseAmount(500000)}>500.000</button>
                      <div className='fomr-transferred'>
                        <span>Số tiền nạp: {deposit}</span>
                        <button className='btn-transferred'>Đã chuyển khoản</button>
                      </div>
                    </div>

                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5">
                    <div className='qr'>
                        <img src={QR} alt="qr" />
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
export default Deposit
