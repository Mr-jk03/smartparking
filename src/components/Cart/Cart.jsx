import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import { endpoint } from "../../config/apiConfig";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  // Lấy dữ liệu giỏ hàng khi load component
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(endpoint.show_item_cart.url, {
      method: endpoint.show_item_cart.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Dữ liệu giỏ hàng từ API:", data);
        if (data.code === 1000) {
          setCartData(data.result);
        } else {
          console.error("Lỗi khi lấy dữ liệu:", data.message);
        }
      })
      .catch((error) => {
        console.error("Lỗi kết nối:", error);
      });
  }, []);

  // Gửi yêu cầu cập nhật số lượng đến API
  const updateQuantityAPI = (ticketId, quantity) => {
    const token = localStorage.getItem("token");
    return fetch(endpoint.put_quantity.url, {
      method: endpoint.put_quantity.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ticketId, quantity }),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Lỗi khi gọi API cập nhật số lượng:", error);
        return { code: 0, message: "Lỗi kết nối" };
      });
  };

  // Xử lý tăng số lượng
  const handleIncrease = (item) => {
    const newQuantity = item.quantity + 1;
    console.log("Đang gửi API tăng số lượng:", {
      ticketId: item.ticketId,
      quantity: newQuantity,
    });
    updateQuantityAPI(item.ticketId, newQuantity).then((data) => {
      if (data.code === 1000) {
        setCartData((prevCart) =>
          prevCart.map((cartItem) =>
            cartItem.ticketId === item.ticketId
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          )
        );
      } else {
        console.error("Lỗi khi cập nhật số lượng:", data.message);
      }
    });
  };

  // Xử lý giảm số lượng
  const handleDecrease = (item) => {
    const newQuantity = Math.max(item.quantity - 1, 1); // Không cho phép số lượng dưới 1
    console.log("Đang gửi API giảm số lượng:", {
      ticketId: item.ticketId,
      quantity: newQuantity,
    });
    updateQuantityAPI(item.ticketId, newQuantity).then((data) => {
      if (data.code === 1000) {
        setCartData((prevCart) =>
          prevCart.map((cartItem) =>
            cartItem.ticketId === item.ticketId
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          )
        );
      } else {
        console.error("Lỗi khi cập nhật số lượng:", data.message);
      }
    });
  };

  // Xử lý thay đổi số lượng qua ô input
  const handleOnchangeQuantity = (event, item) => {
    const newQuantity = parseInt(event.target.value, 10) || 1; // Đảm bảo số lượng hợp lệ
    updateQuantityAPI(item.ticketId, newQuantity).then((data) => {
      if (data.code === 1000) {
        setCartData((prevCart) =>
          prevCart.map((cartItem) =>
            cartItem.ticketId === item.ticketId
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          )
        );
      } else {
        console.error("Lỗi khi cập nhật số lượng:", data.message);
      }
    });
  };

  return (
    <div className="wrapper-cart">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 cart-title">
            <Link to={"/"} className="cart-a-home">
              Trang chủ
            </Link>
            <Link>Giỏ hàng</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="cart-thead">
              <div className="container">
                <div className="row">
                  <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">
                    Tên vé
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">
                    Giá vé
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">
                    Loại phương tiện
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 d-flex justify-content-center align-items-center">
                    Số lượng
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">
                    Thao tác
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 tbody">
            <div className="cart-tbody">
              <div className="container">
                {cartData.map((item) => (
                  <div className="row trow" key={item.ticketId}>
                    <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">
                      {item.name}
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">
                      {item.price}
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">
                      {item.vehicle}
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 d-flex justify-content-center align-items-center">
                      <div className="quantity">
                        <button
                          className="btn-quantity"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={(event) =>
                            handleOnchangeQuantity(event, item)
                          }
                        />
                        <button
                          className="btn-quantity"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">
                      <button>Xoá</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <span className="span-total-money">
          Tổng số tiền: <span>30.000</span> <sup>đ</sup>
        </span>
      </div>
    </div>
  );
};

export default Cart;
