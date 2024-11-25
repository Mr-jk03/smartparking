import React from 'react'
import './Buytickets.css'
import { useState } from 'react';
import Mototickets from './Mototickets/Mototickets';
import Cartickets from './Cartickets/Cartickets';

import { FaMotorcycle } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa";

const Buytickets = () => {

  const [activeMoto, setActiveMoto] = useState(true);
  const [activeCar, setActiveCar] = useState(false);
  const [formType, setFormType] = useState('moto');


  const handleActiveMoto = () => {
    setActiveMoto(true);
    setActiveCar(false);
    setFormType('moto');
  }
  const handleActiveCar = () => {
    setActiveMoto(false);
    setActiveCar(true);
    setFormType('car');
  }




  return (
    <div className='wrapper-buyticket'>
      <div className="container">
        <div className="row">
          <div className="col-xl-2 col-lg-2 col-md-2">
            <div className="menu-vehicle">
              <button className='ticket-icon'
                onClick={handleActiveMoto}
              >
                <i className={activeMoto ? 'active' : ''}>
                  <FaMotorcycle />
                </i>
                Xe máy
              </button>
              <button className='ticket-icon'
                onClick={handleActiveCar}
              >
                <i className={activeCar ? 'active' : ''}>
                  <FaCarSide />
                </i>
                Ô tô
              </button>
            </div>
          </div>
          <div className="col-xl-10 col-lg-10 col-md-10">
            <div className="body-vehicle">
              {formType === 'moto' && <Mototickets />}
              {formType === 'car' && <Cartickets />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Buytickets
