import React, { useState, useReducer } from 'react'
import './Body.css'
import Menu from './Menu/Menu'
import BodyCon from './BodyCon/BodyCon'

const Body = () => {


    const initialState = {activeComponent:"HOME"}

    const reducer = (state, action) =>{
        switch(action.type){
            case "HOME":
                return {activeComponent: "HOME"};
            case "DEPOSIT":
                return {activeComponent: "DEPOSIT"};
            case "DEPOSIT_HISTORY":
                return {activeComponent: "DEPOSIT_HISTORY"};
            case "BALANCE":
                return {activeComponent: "BALANCE"};
            case "BUYTICKETS":
                return {activeComponent: "BUYTICKETS"};
            case "MY_TICKETS":
                return {activeComponent: "MY_TICKETS"}
            default:
                return state
        }
    }
    

    const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <div className='body-wraaper'>
        <div className="container">
            <div className="row">
                <div className='col-xl-2'>
                    <Menu dispatch={dispatch}/>
                </div>
                <div className='col-xl-10'>
                    <BodyCon activeComponent={state.activeComponent} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Body