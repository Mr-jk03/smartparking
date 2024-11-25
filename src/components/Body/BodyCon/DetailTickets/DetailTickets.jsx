import React, { useEffect, useState } from "react";
import "./DetailTickets.css";
import { useParams, Link } from "react-router-dom";
import { FaCartPlus, FaMotorcycle, FaCarSide } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoint, refreshToken } from "../../../../config/apiConfig";

const DetailTickets = ({ dispatch }) => {
  const { vehicle, id } = useParams();
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    const api =
      vehicle === "bike"
        ? endpoint.buyTicketBikes.url
        : endpoint.buyTicketCar.url;

    const token = localStorage.getItem("token");
    fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          const ticket = data.result.find((item) => item.id === id);
          setTicketData(ticket);
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
  }, [vehicle, id]);

  const handleAddCart = () => {
    if (!ticketData) {
      toast.error("Không tìm thấy thông tin vé", { position: "top-right" });
      return;
    }

    const body = {
      ticketId: ticketData.id,
    };
    const token = localStorage.getItem('token');

    fetch(endpoint.add_cart.url, {
      method: endpoint.add_cart.method,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          toast.success("Thêm giỏ hàng thành công", { position: "top-right" });
        } else if (data.code === 5010) {
          refreshToken()
        } else {
          toast.error(data.message, {
            position: "top-right"
          })
        }
      })
      .catch((error) => {
        toast.error("Lỗi kết nối", { position: "top-right" });
      });
  };

  return (
    <div className="wrapper-detail">
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
                      {vehicle === "bike" ? (
                        <FaMotorcycle />
                      ) : vehicle === "car" ? (
                        <FaCarSide />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="info-ticket">
                <div className="container-info">
                  <span>Tên vé: {ticketData.name}</span>
                  <span>
                    Giá vé: {ticketData.price} <sup>đ</sup>
                  </span>
                  <span>Loại phương tiện: {vehicle}</span>
                  <span>Thời gian: {ticketData.duration}</span>
                  <span>Lưu ý: </span>
                  <textarea
                    className="note-ticket"
                    readOnly
                    name=""
                    id=""
                  >
                    {ticketData.note}
                  </textarea>
                  <div className="ft-info">
                    <div className="row info-btn">
                      <div className="col-xl-5">
                        <button className="info-btn-buy">Đặt mua</button>
                      </div>
                      <div className="col-xl-7">
                        <button
                          className="info-btn-addCart"
                          onClick={handleAddCart}
                        >
                          <i>
                            <FaCartPlus />
                          </i>
                          Thêm vào giỏ hàng
                        </button>
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
