import React, { useEffect, useState } from "react";
import "./DetailTickets.css";
import { useParams, Link } from "react-router-dom";
import { FaCartPlus, FaMotorcycle, FaCarSide } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoint, refreshToken } from "../../../../config/apiConfig";
const getDate = () => {
  const today = new Date();
  let day = today.getDate();
  if (day.toString().length === 1) {
    day = "0" + day
  }
  const month = today.getMonth() + 1; // Tháng bắt đầu từ 0, cần
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
}

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

const DetailTickets = ({ dispatch }) => {
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [emptyPosition, setEmptyPosition] = useState([]);

  const [startDate, setStartDate] = useState(minStart)
  const [endDate, setEndDate] = useState(minStart)

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(endpoint.infoCategory.url + `/${id}`, {
      method: endpoint.infoCategory.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          setTicketData(data.result);
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
    getPositionEmpty()
  }, [id]);

  const getPositionEmpty = () => {
    const token = localStorage.getItem("token");
    fetch(endpoint.getEmptyPosition.url + `?start=${convertDate(startDate)}&ticket=${id}`, {
      method: endpoint.getEmptyPosition.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          setEmptyPosition(data.result)
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

  const handleChangeStartDate = (event) => {
    getPositionEmpty()
    setStartDate(event.target.value)
    setEndDate(event.target.value)
  }

  const handleChangeEndDate = (event) => {
    setEndDate(event.target.value)
  }

  const handleBuyTicket = (event) => {
    const token = localStorage.getItem("token");
    console.log(endpoint.buyTicket)
    fetch(endpoint.buyTicket.url, {
      method: endpoint.buyTicket.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        category: id,
        startDate: convertDate(startDate),
        endDate: convertDate(endDate)
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          toast.success("Mua vé thành công", { position: "top-right" })
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
  return (
    <div className="wrapper-detail">
      <ToastContainer />
      {ticketData ? (
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="info-address">
                <Link
                  to={"/"}
                  className="info-adr-home"
                  onClick={() => dispatch({ type: "HOME" })}
                >
                  Trang chủ
                </Link>
                <Link>Chi tiết vé</Link>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="dt-ticket">
                      {ticketData.vehicle.toUpperCase() === "CAR" ?
                        <FaCarSide /> :
                        <FaMotorcycle />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="info-ticket">
                <div className="container-info" style={{ height: "100%" }}>
                  <span>Tên vé: {ticketData.name}</span>
                  <span>
                    Giá vé: {ticketData.price.toLocaleString('vi-VN')} <sup>đ</sup>
                  </span>
                  {/* <span>Loại phương tiện: {vehicle}</span> */}
                  <span>Thời gian: {ticketData.duration}</span>
                  <div>
                    <div className="filter-1">
                      <span>
                        Ngày bắt đầu
                      </span>
                      <input type="date" min={minStart} max={maxStart} value={startDate} onChange={handleChangeStartDate} />
                    </div>
                    <div className="filter-1">
                      <span>
                        Ngày kết thúc
                      </span>
                      <input type="date" min={startDate} max={addDays(startDate, 30)} value={endDate} onChange={handleChangeEndDate} />
                    </div>
                    <span>Số vị trí trống</span>
                    <div style={{ display: "block", overflowY: "scroll", height: "200px", background: "#ececec", padding: "5px" }}>
                      {emptyPosition.map((item) => {
                        return <span>{item.date}: {item.quantity}</span>
                      })}
                    </div>
                  </div>
                  <div className="ft-info">
                    <div className="row info-btn">
                      <div className="col-xl-5">
                        <button className="info-btn-buy" onClick={handleBuyTicket} >Đặt mua</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span>Không tìm thấy vé</span>
      )}
    </div>
  );
};

export default DetailTickets;
