import React, { useEffect, useState, useContext } from 'react'
import './Deposit.css'
import { TbAlertTriangleFilled } from "react-icons/tb";
import { endpoint, refreshToken } from '../../../../config/apiConfig';
import { WalletContext } from '../../../WalletContext/WalletContext';
import { toast } from 'react-toastify';


const Deposit = () => {
  const [deposit, setDeposit] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const { updateWalletBalance } = useContext(WalletContext);

  const checkTransactionStatus = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const responseCode = queryParams.get("vnp_ResponseCode");
    const transactionStatus = queryParams.get("vnp_TransactionStatus");

    if (responseCode === '00' && transactionStatus === '00') {
      setIsSuccess(true);

      const token = localStorage.getItem('token');
      fetch(endpoint.wallet.url, {
        method: endpoint.wallet.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 1000) {
            updateWalletBalance(data.result.balence.toLocaleString('vi-VN'));
          } else if (data.code === 5010) {
            refreshToken()
          } else {
            toast.error(data.message, {
              position: "top-right"
            })
          }
        })
        .catch((error) => console.error('Lỗi khi cập nhật số dư', error));
    }
  };
  useEffect(() => {
    checkTransactionStatus();
  }, [])

  const handleChooseAmount = (amount) => {
    setDeposit(amount.toLocaleString('vi-VN'))
  }
  const handleSubmitDeposit = () => {
    if (!deposit) {
      alert('Vui lòng chọn số tiền cần nạp');
      return;
    }

    const token = localStorage.getItem('token');
    const body = {
      amount: parseInt(deposit.replace(/\./g, ""), 10),
    };
    fetch(endpoint.deposit.url, {
      method: endpoint.deposit.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => {
        if (data.code === 1000) {
          const { linkPayment } = data.result;

          window.location.href = linkPayment;
        } else if (data.code === 5010) {
          refreshToken()
        } else {
          toast.error(data.message, {
            position: "top-right"
          })
        }
      })
      .catch(error => {
        toast.error("Lỗi kết nối", { position: "top-right" });
      })
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
                <div className="col-xl-12 col-lg-12 col-md-12">
                  {isSuccess && (
                    <div className="alert alert-success">
                      Nạp tiền thành công! Cảm ơn bạn đã sử dụng dịch vụ.
                    </div>
                  )}
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
                    <button className='dp-cart' onClick={() => handleChooseAmount(10000)}>10.000</button>
                    <button className='dp-cart' onClick={() => handleChooseAmount(20000)}>20.000</button>
                    <button className='dp-cart' onClick={() => handleChooseAmount(50000)}>50.000</button>
                    <button className='dp-cart' onClick={() => handleChooseAmount(100000)}>100.000</button>
                    <button className='dp-cart' onClick={() => handleChooseAmount(500000)}>500.000</button>
                    <div className='fomr-transferred'>
                      <span>Số tiền nạp: {deposit}</span>
                      <button className='btn-transferred'
                        onClick={handleSubmitDeposit}
                      >Gửi yêu cầu</button>
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
export default Deposit
