import React, { useEffect, useState } from 'react'
import './Ticketdetailsbuyed.css'
import { Link, useParams } from 'react-router-dom'
import { endpoint, refreshToken } from '../../../../config/apiConfig'
import { toast, ToastContainer } from 'react-toastify'
import { FaPen, FaSave } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'



const getDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Tháng bắt đầu từ 0, cần
    const year = today.getFullYear();

    return `${year}-${month}-${day}`;
}

const date = new Date().getTime()

const convertDate = (date) => {
    console.log(date)
    let split = date.split('-');
    console.log(split)
    return `${split[2]}/${split[1]}/${split[0]}`;
}

function addDays(dateString, days) {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    date.setDate(date.getDate() + days);

    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    const newDay = String(date.getDate()).padStart(2, '0');

    return `${newYear}-${newMonth}-${newDay}`;
}

const minStart = getDate();
const maxStart = addDays(minStart, 7)


const Ticketdetailsbuyed = () => {
    const { ticketId } = useParams()
    const [newExpire, setNewExpire] = useState(null)
    const [info, setInfo] = useState({})
    const [changePlate, setChangePlate] = useState(false)
    const [plateContain, setPlateContain] = useState("")
    const [firstPlate, setFirstPlate] = useState(null)
    const loadInfo = () => {
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
                    setPlateContain(data.result.contentPlate != null ? data.result.contentPlate : "")
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
    }
    useEffect(() => {
        loadInfo()
    }, [])

    const genStatus = (info) => {

        const date = new Date().getTime()
        if (info.startAt > date) {
            return "Chờ sử dụng"
        } else if (info.expireAt < date) {
            return "Hết hạn sử dụng"
        } else {
            return "Đang sử dụng"
        }
    }

    const handleChangePlate = (e) => {
        setPlateContain(e.target.value)
    }

    const handleSavePlate = () => {
        const token = localStorage.getItem("token");
        fetch(endpoint.updatePlate.url, {
            method: endpoint.updatePlate.method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                plate: plateContain,
                ticketId: ticketId
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.code === 1000) {
                    setInfo(data.result)
                    toast.success("Thanh đổi biển số thành công", { position: "top-right" })
                } else if (data.code === 5010) {
                    refreshToken()
                } else {
                    toast.error(data.message, {
                        position: "top-right"
                    })
                }
            })
            .catch((error) => {
                setPlateContain(info.plateContain)
            }).finally(() => {
                setChangePlate(false)
            })
    }

    const handleCanclePlate = () => {
        setChangePlate(false)
        setPlateContain(info.contentPlate)
    }


    const handleChangeNewExpire = (e) => {
        setNewExpire(e.target.value)
    }

    useEffect(() => {
        if (!info || info.expireAt > new Date().getTime()) {
            return
        }

        const token = localStorage.getItem("token");
        fetch(endpoint.getFirstPlateHistory.url + `?ticket=${ticketId}`, {
            method: endpoint.getFirstPlateHistory.method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.code === 1000) {
                    setFirstPlate(data.result)
                } else if (data.code === 5010) {
                    refreshToken()
                } else {
                    toast.error(data.message, {
                        position: "top-right"
                    })
                }
            })
            .catch(() => {
                toast.error("Có lỗi xảy ra", {
                    position: "top-right"
                })
            })
    }, [info])

    const handleClickExtend = () => {
        if (newExpire == null) {
            toast.error("Điền thông tin gia hạn", { position: "top-right" })
            return
        }
        const token = localStorage.getItem("token");
        fetch(endpoint.extendTicket.url + `/${ticketId}?date=${convertDate(newExpire)}`, {
            method: endpoint.extendTicket.method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.code === 1000) {
                    setNewExpire(null)
                    setFirstPlate(null)
                    loadInfo()
                    toast.success("Gia hạn thành công", { position: "top-right" })
                } else if (data.code === 5010) {
                    refreshToken()
                } else {
                    toast.error(data.message, {
                        position: "top-right"
                    })
                }
            })
            .catch(() => {
                toast.error("Có lỗi xảy ra", {
                    position: "top-right"
                })
            })
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
                            {changePlate ?
                                <div className="col-xl-1 col-lg-1 col-md-1 text-center">
                                    <input type="text" style={{ padding: "0 5px", maxWidth: "100%" }} onChange={handleChangePlate} value={plateContain} />
                                    <span style={{ paddingLeft: "5px", marginRight: "5px" }} onClick={handleSavePlate} ><FaSave /></span>
                                    <span style={{ paddingLeft: "5px" }} onClick={handleCanclePlate} ><FaX /></span>
                                </div> :
                                <div className="col-xl-1 col-lg-1 col-md-1 text-center">{info.contentPlate ? info.contentPlate : "---"}
                                    <span style={{ paddingLeft: "5px" }} onClick={() => setChangePlate(true)} ><FaPen /></span></div>}
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">{info.startTime}</div>
                            <div className="col-xl-1 col-lg-1 col-md-1 text-center">{info.expireTime}</div>
                        </div>
                        {firstPlate != null && firstPlate.checkoutAt === 0 ?
                            (<div>
                                <div>
                                    <div style={{ textAlign: "right" }}>Vé của bạn đã hết thời gian sử dụng. Cần gia hạn để tiếp tục.
                                        <br />
                                        Lưu ý: giá vé tăng gấp đôi so với giá vé hiện tại
                                    </div>
                                </div>
                                <div className="filter-1" style={{ display: "flex", justifyContent: "right" }}>
                                    <span style={{ paddingRight: "10px" }}>
                                        Chọn hạn sử dụng mới:
                                    </span>
                                    <input type="date" min={getDate()} max={maxStart} value={newExpire} onChange={handleChangeNewExpire} />
                                    <span onClick={handleClickExtend}><FaSave /></span>
                                </div>
                            </div>) :
                            ""}
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Ticketdetailsbuyed