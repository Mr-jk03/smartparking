import React, { useEffect, useState } from 'react'
import './Ticketdetailsbuyed.css'
import { Link, useParams } from 'react-router-dom'
import { endpoint, refreshToken } from '../../../../config/apiConfig'
import { toast, ToastContainer } from 'react-toastify'

const Ticketdetailsbuyed = () => {

    const { ticketId } = useParams()
    const [info, setInfo] = useState({})

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(endpoint.detailTicket.url + "/" + ticketId, {
            method: endpoint.detailTicket.method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.code === 1000) {
                    setInfo(data.result)
                } else if (data.code === 5010) {
                    refreshToken()
                } else {
                    toast.error(data.message, {
                        position: "top-right"
                    })
                }
            })
            .catch((error) => {
                console.log("Lỗi kết nối", error);
            });
    }, [])

    const genStatus = (info) => {

        const date = new Date().getTime();
        console.log(date)
        console.log(info.startAt)
        if (info.startAt > date) {
            return "Chờ sử dụng"
        } else if (info.expireAt < date) {
            return "Hết hạn sử dụng"
        } else {
            return "Đang sử dụng"
        }
    }
    return (
        <div className='wrapper-ticketdetail-buyed'>
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className='btn-filter-ticketbuyed'>
                            <button>
                                <Link to={'/inouthistory/' + ticketId}>Xem danh sách lịch sử ra vào</Link>
                            </button>
                            <button>
                                <Link to={'/listqr/' + ticketId}>Xem danh sách mã QR</Link>
                            </button>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className='ticked-buyed-th'>
                            <div className="col-xl-2 col-lg-2 col-md-2 text-center">Tên vé</div>
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">Giá vé</div>
                            <div className="col-xl-2 col-lg-2 col-md-2 text-center">Sử dụng gần nhất</div>
                            <div className="col-xl-2 col-lg-2 col-md-2 text-center">Trạng thái</div>
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">Thời gian mua</div>
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">Số lần<br />sử dụng</div>
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">Nội dung<br />biển số</div>
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">Thời gian<br />Bắt đầu</div>
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">Thời gian<br />hết hạn</div>
                        </div>
                        <div className='ticked-buyed-td'>
                            <div className="col-xl-2 col-lg-2 col-md-2 text-center">{info.name}</div>
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">{info.price?.toLocaleString('vi-VN')} <sup>đ</sup></div>
                            <div className="col-xl-2 col-lg-2 col-md-2 text-center">{info.usedAt ? info.usedTime : "---"}</div>
                            <div className="col-xl-2 col-lg-2 col-md-2 text-center">{genStatus(info)}</div>
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">{info.buyTime}</div>
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">{info.turnTotal} <span>Lần</span></div>
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">{info.contentPlate ? info.contentPlate : "---"}</div>
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">{info.startTime}</div>
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">{info.expireTime}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Ticketdetailsbuyed