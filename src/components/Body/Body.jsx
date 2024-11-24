import React, { useState, useReducer, useEffect, useContext } from 'react'
import './Body.css'
import Menu from './Menu/Menu'
import BodyCon from './BodyCon/BodyCon'
import { useParams } from 'react-router-dom'
import { WalletContext } from '../WalletContext/WalletContext';
import { endpoint } from '../../config/apiConfig'
import { toast, ToastContainer } from 'react-toastify'


const Body = ({ onLogOut }) => {
    const { id } = useParams();

    const { updateWalletBalance } = useContext(WalletContext);
    const checkTransactionStatus = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const responseCode = queryParams.get("vnp_ResponseCode");
        const transactionStatus = queryParams.get("vnp_TransactionStatus");
        if (!responseCode && !responseCode) {
            return
        }
        else if (responseCode === '00' && transactionStatus === '00') {
            toast.success("Nạp tiền thành công", { position: "top-right" });

            const token = localStorage.getItem('token');
            fetch(endpoint.wallet.url, {
                method: endpoint.wallet.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.code === 1000) {
                        updateWalletBalance(data.result.balence.toLocaleString('vi-VN'));
                    }
                })
                .catch((error) => console.error('Lỗi khi cập nhật số dư', error));
        } else if (responseCode !== '00' || transactionStatus !== '00') {
            toast.error("Nạp tiền thất bại", { position: "top-right" });
        }
    };
    useEffect(() => {
        checkTransactionStatus();
    }, [])


    const initialState = { activeComponent: "HOME", selectedTicketID: null }

    const reducer = (state, action) => {
        switch (action.type) {
            case "HOME":
                return { activeComponent: "HOME", selectedTicketID: null };
            case "DEPOSIT":
                return { activeComponent: "DEPOSIT", selectedTicketID: null };
            case "DEPOSIT_HISTORY":
                return { activeComponent: "DEPOSIT_HISTORY", selectedTicketID: null };
            case "BALANCE":
                return { activeComponent: "BALANCE", selectedTicketID: null };
            case "BUYTICKETS":
                return { activeComponent: "BUYTICKETS", selectedTicketID: null };
            case "MY_TICKETS":
                return { activeComponent: "MY_TICKETS", selectedTicketID: null };
            case "DETAIL":
                return { activeComponent: "DETAIL", selectedTicketID: id };
            default:
                return state;
        }
    };

    useEffect(() => {
        if (id) {
            dispatch({ type: "DETAIL" });
        }
    }, [id]);


    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className='body-wraaper'>
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className='col-xl-2 col-lg-2 col-md-2'>
                        <Menu dispatch={dispatch} onLogOut={onLogOut} />
                    </div>
                    <div className='col-xl-10 col-lg-10 col-md-10'>
                        <BodyCon activeComponent={state.activeComponent} selectedTicketId={state.selectedTicketID} dispatch={dispatch} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body