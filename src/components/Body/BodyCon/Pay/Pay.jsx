import React from 'react'
import './Pay.css'
import { Link } from 'react-router-dom'

const Pay = () => {
  return (
    <div className='wrapper-pay-cart'>
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className='adrr-pay-cart'>
                        <Link to={'/'}>Trang chủ</Link>
                        <span>Thanh toán giỏ hàng</span>
                    </div>
                </div>
                <div className="col-xl-8 col-lg-8 col-mg-8">
                    <div className="pay-item">
                        <div className="theader-pay-item">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">STT</div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">Tên vé</div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">Số lượng</div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">Tổng tiền</div>
                                </div>
                            </div>
                        </div>

                        <div className="tbody-pay-item">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">1</div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">Vé lượt</div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">3</div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">30.000 <sup>đ</sup></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-mg-4">
                    <div className="pay-item">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 fw-bold mt-1">Tổng Số lượng: </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 fw-bold mt-1">2</div>
                                <div className="col-xl-6 col-lg-6 col-md-6 fw-bold mt-1">Tổng tiền</div>
                                <div className="col-xl-6 col-lg-6 col-md-6 fw-bold mt-1">20.000 <sup>đ</sup></div>
                                <div className="col-xl-6 col-lg-6 col-md-6 fw-bold mt-1">Thuế</div>
                                <div className="col-xl-6 col-lg-6 col-md-6 fw-bold mt-1">0%</div>

                                <div className="col-xl-12 col-lg-12 col-md-12 text-center fw-bold mt-3 fs-4">Tổng thanh toán: 20.000 <sup>đ</sup></div>
                                <div className='col-xl-12 col-lg-12 col-md-12 mt-5 d-flex justify-content-center'>
                                    <button className='btn-pay-cart'>Thanh toán</button>
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

export default Pay