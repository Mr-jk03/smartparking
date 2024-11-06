import React from 'react'
import './Cart.css'
import { Link } from 'react-router-dom'

const Cart = () => {
  return (
    <div className='wrapper-cart'>
        <div className="container">
            <div className="row">
                <div className="col-xl-12 cart-title">
                    <Link to={'/'} className='cart-a-home'>Trang chủ</Link>
                    <Link>Giỏ hàng</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart
