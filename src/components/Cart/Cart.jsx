import React, { useState } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';
import { cartData } from '../DataLocal/CartData';

const Cart = () => {
  const [quantities, setQuantities] = useState(
    cartData.reduce((acc, item) => {
      acc[item.id] = 1; // Đặt số lượng mặc định là 1 cho mỗi sản phẩm
      return acc;
    }, {})
  );

  const handleIncrease = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(prevQuantities[id] - 1, 1), // Đảm bảo số lượng không nhỏ hơn 1
    }));
  };

  return (
    <div className='wrapper-cart'>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 cart-title">
            <Link to={'/'} className='cart-a-home'>Trang chủ</Link>
            <Link>Giỏ hàng</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="cart-thead">
              <div className="container">
                <div className="row">
                  <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">Tên vé</div>
                  <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">Giá vé</div>
                  <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">Loại phương tiện</div>
                  <div className="col-xl-4 col-lg-4 col-md-4 d-flex justify-content-center align-items-center">Số lượng</div>
                  <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">Thao tác</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 tbody">
            <div className="cart-tbody">
              <div className="container">
                {cartData.map((item) => (
                  <div className="row trow" key={item.id}>
                    <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">{item.type}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">{item.price}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2 d-flex justify-content-center align-items-center">{item.vehical}</div>
                    <div className="col-xl-4 col-lg-4 col-md-4 d-flex justify-content-center align-items-center">
                      <div className='quantity'>
                        <button className='btn-quantity' onClick={() => handleIncrease(item.id)}>+</button>
                        <input
                          type="text"
                          value={quantities[item.id]}
                          onChange={(e) => setQuantities({
                            ...quantities,
                            [item.id]: parseInt(e.target.value) || 1
                          })}
                        />
                        <button className='btn-quantity' onClick={() => handleDecrease(item.id)}>-</button>
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
      </div>
    </div>
  );
};

export default Cart;
