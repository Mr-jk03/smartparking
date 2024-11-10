import React from 'react'
import './Ticketdetailsbuyed.css'
import { Link } from 'react-router-dom'

const Ticketdetailsbuyed = () => {
  return (
    <div className='wrapper-ticketdetail-buyed'>
        <div className="container">
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className='btn-filter-ticketbuyed'>
                        <button>
                            <Link to={'/inouthistory'}>Xem danh sách lịch sử ra vào</Link>
                        </button>
                        <button>
                            <Link to={'/listqr'}>Xem danh sách mã QR</Link>
                        </button>
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className='ticked-buyed-th'>
                        <div className="col-xl-1 col-lg-1 col-md-1 text-center">STT</div>
                        <div className="col-xl-2 col-lg-2 col-md-2 text-center">Tên vé</div>
                        <div className="col-xl-1 col-lg-1 col-md-1 text-center">Giá vé</div>
                        <div className="col-xl-2 col-lg-2 col-md-2 text-center">Thời gian</div>
                        <div className="col-xl-2 col-lg-2 col-md-2 text-center">Trạng thái</div>
                        <div className="col-xl-1 col-lg-1 col-md-1 text-center">Thời gian mua</div>
                        <div className="col-xl-1 col-lg-1 col-md-1 text-center">Số lần<br/>sử dụng</div>
                        <div className="col-xl-1 col-lg-1 col-md-1 text-center">Nội dung<br/>biển số</div>
                        <div className="col-xl-1 col-lg-1 col-md-1 text-center">Thời gian<br/>hết hạn</div>
                    </div>
                    <div className='ticked-buyed-td'>
                        <div className="col-xl-1 col-lg-1 col-md-1 text-center">1</div>
                        <div className="col-xl-2 col-lg-2 col-md-2 text-center">Vé lượt</div>
                        <div className="col-xl-1 col-lg-1 col-md-1 text-center">6.000 <sup>đ</sup></div>
                        <div className="col-xl-2 col-lg-2 col-md-2 text-center">--------</div>
                        <div className="col-xl-2 col-lg-2 col-md-2 text-center">Chưa sử dụng</div>
                        <div className="col-xl-1 col-lg-1 col-md-1 text-center">hh:mm:ss</div>
                        <div className="col-xl-1 col-lg-1 col-md-1 text-center">1 <span>Lần</span></div>
                        <div className="col-xl-1 col-lg-1 col-md-1 text-center">19V5-9999</div>
                        <div className="col-xl-1 col-lg-1 col-md-1 text-center">24 giờ</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Ticketdetailsbuyed