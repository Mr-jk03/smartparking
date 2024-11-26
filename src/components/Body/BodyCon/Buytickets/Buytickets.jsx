import React from 'react'
import './Buytickets.css'
import { useState } from 'react';
import Mototickets from './Mototickets/Mototickets';
import Cartickets from './Cartickets/Cartickets';

import { FaMotorcycle } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa";

const Buytickets = () => {
  return (
    <div className='wrapper-buyticket'>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-10 col-md-10">
            <div className="body-vehicle">
              <Mototickets />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Buytickets
