import React, { useEffect, useState } from 'react';
import './DepositHistory.css';
import { endpoint, refreshToken } from '../../../../config/apiConfig';
import { toast, ToastContainer } from 'react-toastify';
import { FaTrash } from 'react-icons/fa6';
const convertDate = (date) => {
  let split = date.split('-');
  return `${split[2]}/${split[1]}/${split[0]}`;
}

const getDate = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Tháng bắt đầu từ 0, cần
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
}

const DepositHistory = () => {
  const [deponsitHistory, setDepositHistory] = useState([]);
  const [approved, setApproved] = useState(0)
  const [waiting, setWaiting] = useState(0)
  const [date, setDate] = useState(getDate())

  const [status, setStatus] = useState(null)

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(false)
  const [concat, setConcat] = useState(false)

  const getParam = () => {
    let param = `?page=${page}&date=${convertDate(date)}`
    if (status)
      param += `&status=${status}`
    return param
  }


  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight <= e.target.scrollTop + e.target.clientHeight + 5;;
    if (bottom) {
      if (!maxPage) {
        setPage(prevPage => prevPage + 1);
      }
    }
  };


  const callHistory = () => {
    const token = localStorage.getItem('token');

    fetch(endpoint.depositHistory.url + `${getParam()}`, {
      method: endpoint.depositHistory.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(responsive => responsive.json())
      .then(data => {
        if (data.code === 1000) {
          if (data.result.length > 0) {
            if (concat) {
              setDepositHistory(pre => [...pre, ...data.result])
            } else {
              setDepositHistory(data.result)
              setConcat(true);
            }

          } else {
            setMaxPage(true)
          }
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
  }

  useEffect(() => {
    callHistory()
  }, [date, page, status])

  useEffect(() => {
    getWait()
  }, [])

  const getWait = () => {
    const token = localStorage.getItem('token');

    fetch(endpoint.depositWaiting.url, {
      method: endpoint.depositWaiting.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(responsive => responsive.json())
      .then(data => {
        if (data.code === 1000) {
          setWaiting(data.result)
        } else if (data.code === 5010) {
          refreshToken()
        } else {
          toast.error(data.message, {
            position: "top-right"
          })
        }
      })
      .catch(error => {
        toast.error("Lỗi kết nối", { position: "top-right" })
      })
  }

  useEffect(() => {

    const token = localStorage.getItem('token');

    fetch(endpoint.depositApproved.url, {
      method: endpoint.depositApproved.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(responsive => responsive.json())
      .then(data => {
        if (data.code === 1000) {
          setApproved(data.result)
        } else if (data.code === 5010) {
          refreshToken()
        } else {
          toast.error(data.message, {
            position: "top-right"
          })
        }
      })
      .catch(error => {
        toast.error("Lỗi kết nối", { position: "top-right" })
      })
  }, [])

  const handleCancle = (id) => {
    const token = localStorage.getItem('token');

    fetch(endpoint.cancleDeposit.url + "/" + id, {
      method: endpoint.cancleDeposit.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(responsive => responsive.json())
      .then(data => {
        if (data.code === 1000) {

          const newHistory = deponsitHistory.map(item => {
            if (item.id === id) {
              item.status = "Đã huỷ"
            }

            return item;
          })
          getWait()
          setDepositHistory(newHistory)
        } else if (data.code === 5010) {
          refreshToken()
        } else {
          toast.error(data.message, {
            position: "top-right"
          })
        }
      })
      .catch(error => {
        toast.error("Lỗi kết nối", { position: "top-right" })
      })
  }

  const handleChaneDate = (event) => {
    setMaxPage(false)
    setPage(1)
    setDepositHistory([])
    setDate(event.target.value)
  }

  const handleChangeStatus = (event) => {
    if (event.target.value === "all")
      setStatus(null)
    else
      setStatus(event.target.value)

    setMaxPage(false)
    setPage(1)
    setDepositHistory([])
  }

  return (
    <div className='wrapper-dp-history'>
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 dp-htr">
                  <div className="dp-history-cart bg-htr-c2">
                    <span className='cart-htr-title'>Số tiền đã duyệt thành công</span>
                    <span className='loaded'>{approved.toLocaleString('vi-VN')} <sup>đ</sup></span>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 dp-htr">
                  <div className="dp-history-cart bg-htr-c3">
                    <span className='cart-htr-title'>Số tiền đang chờ duyệt</span>
                    <span className='loaded'>{waiting.toLocaleString('vi-VN')} <sup>đ</sup></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 body-dp-htr">
            <div className="container">
              <div className="row">
                <div className='filter-1'>
                  <input
                    type="date"
                    value={date}
                    onChange={handleChaneDate}
                  />
                  {/* <button>
                    <IoIosSearch />
                  </button> */}
                </div>
                <div className='filter-1'>
                  <select name="status" id="status" onChange={handleChangeStatus}>
                    <option value="all">Tất cả</option>
                    <option value="approved">Đã duyệt</option>
                    <option value="canceled">Đã huỷ</option>
                    <option value="wait">Chờ duyệt</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 deposit-history-table">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="table-header">
                    <div className="container">
                      <div className="row">
                        <div className="col-xl-1 col-lg-1 col-md-1 dps-history-th">
                          <span>STT</span>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 dps-history-th">
                          <span>Ngày nạp</span>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 dps-history-th">
                          <span>Số tiền</span>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 dps-history-th">
                          <span>Trạng thái</span>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 dps-history-th">
                          <span>Hành động</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-body" onScroll={handleScroll}>
                    <div className="container "  >
                      {deponsitHistory.length > 0 ? (
                        deponsitHistory.map((item, index) => (
                          <div className="row mg-row" key={index}>
                            <div className="col-xl-1 col-lg-1 col-md-1 dps-history-td">
                              <span>{index + 1}</span>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-3 dps-history-td">
                              <span>{item.time}</span>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-2 dps-history-td">
                              <span>{item.amount.toLocaleString('vi-VN')}</span>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-3 dps-history-td">
                              <span className={item.statusClass}>{item.status}</span>
                            </div>
                            {item.status === "Chờ duyệt" && <div className="col-xl-3 col-lg-3 col-md-3 dps-history-td">
                              <button className='btn-history-dp' onClick={() => handleCancle(item.id)}>
                                <FaTrash />
                              </button>
                            </div>}
                          </div>
                        ))
                      ) : (
                        <div className="row">
                          <div className="col-12 text-center">
                            <span>Không có dữ liệu</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
export default DepositHistory;
