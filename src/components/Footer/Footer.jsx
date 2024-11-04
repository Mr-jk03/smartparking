import React from 'react'
import './Footer.css'


const Footer = () => {
  return (
    <div className='wrapper-footer'>
      <div className="container">
        <div className="row">
          <div className="col-xl-3">
            <div className='ttlh'>
              <p>thông tin liên hệ</p>
              <span>Liên hệ CSKH: 0365 555 555</span>
              <span>Email: nguyenvana@gmail.com</span>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="addr">
                <p>địa chỉ</p>
                <span>73 Lý Tự Trọng, Quận 1, Tp. HCM</span>
                <span>13 Nguyễn Thiện Thuật, Quận 3, TP. HCM</span>
                <span>210B Hồ Văn Huê, Quận Phú Nhuận, TP. HCM</span>
                <span>261 Phố Huế, Quận Hai Bà Trưng, Hà Nội</span>
                <span>371 Lê Duẩn, Quận Thanh Khê, Đà Nẵng</span>
            </div>
          </div>
          <div className="col-xl-3">
            <div className='addr'>
                <p>Kết nối MXH</p>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="addr">
                <p>Tải app quyét ngay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer