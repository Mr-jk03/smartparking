import React, { useState } from 'react';
import './Menu.css';
import { FaHome } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiTicket } from "react-icons/gi";
import { GiExitDoor } from "react-icons/gi";

const Menu = ({dispatch}) => {
   
    const [activeIndex, setActiveIndex] = useState(0);

    
    const handleActive = (index, actionType) => {
        setActiveIndex(index);
        dispatch({type: actionType});
    };
    
    return (
        <div className='warrper-menu'>
            <button 
                className={activeIndex === 0 ? 'active-btn-menu' : 'btn-menu'}
                onClick={() => handleActive(0, 'HOME')}
            >
                <FaHome />
                <span>Trang chủ</span>
            </button>
            <button 
                className={activeIndex === 1 ? 'active-btn-menu' : 'btn-menu'}
                onClick={() => handleActive(1, 'DEPOSIT')}
            >
                <RiMoneyDollarCircleFill />
                <span>nạp Tiền</span>
            </button>
            <button 
                className={activeIndex === 2 ? 'active-btn-menu' : 'btn-menu'}
                onClick={() => handleActive(2, 'DEPOSIT_HISTORY')}
            >
                <RiMoneyDollarCircleFill />
                <span>lịch sử nạp</span>
            </button>
            <button 
                className={activeIndex === 3 ? 'active-btn-menu' : 'btn-menu'}
                onClick={() => handleActive(3, 'BALANCE')}
            >
                <FaChartLine />
                <span>biến động số dư</span>
            </button>
            <button 
                className={activeIndex === 4 ? 'active-btn-menu' : 'btn-menu'}
                onClick={() => handleActive(4, 'BUYTICKETS')}
            >
                <GiTakeMyMoney />
                <span>mua vé</span>
            </button>
            <button 
                className={activeIndex === 5 ? 'active-btn-menu' : 'btn-menu'}
                onClick={() => handleActive(5, 'MY_TICKETS')}
            >
                <GiTicket />
                <span>vé của tôi</span>
            </button>
            <button 
                className={activeIndex === 6 ? 'active-btn-menu' : 'btn-menu'}
                onClick={() => handleActive(6)}
            >
                <GiExitDoor />
                <span>đăng xuất</span>
            </button>
        </div>
    );
};

export default Menu;

