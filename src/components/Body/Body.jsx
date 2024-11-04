import React, { useState, useReducer, useEffect  } from 'react'
import './Body.css'
import Menu from './Menu/Menu'
import BodyCon from './BodyCon/BodyCon'
import { useParams } from 'react-router-dom'


const Body = ({onLogOut}) => {

    const {id} = useParams();

    const initialState = {activeComponent:"HOME", selectedTicketID: null}

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
        <div className="container">
            <div className="row">
                <div className='col-xl-2'>
                    <Menu dispatch={dispatch} onLogOut={onLogOut}/>
                </div>
                <div className='col-xl-10'>
                    <BodyCon activeComponent={state.activeComponent} selectedTicketId={state.selectedTicketID} dispatch={dispatch}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Body