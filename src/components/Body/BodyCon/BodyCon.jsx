import React from 'react'
import "./BodyCon.css"
import Home from './Home/Home'
import Deposit from './Deposit/Deposit'
import DepositHistory from './DepositHistory/DepositHistory'
import Balance from './Balance/Balance'
import Buytickets from './Buytickets/Buytickets'
import Mytickets from './Mytickets/Mytickets'


const BodyCon = ({activeComponent}) => {
  return (
    <div className='col-xl-12 warrper-bodycon'>
        {activeComponent === 'HOME' && <Home />}
        {activeComponent === 'DEPOSIT' && <Deposit />}
        {activeComponent === 'DEPOSIT_HISTORY' && <DepositHistory />}
        {activeComponent === 'BALANCE' && <Balance />}
        {activeComponent === 'BUYTICKETS' && <Buytickets />}
        {activeComponent === 'MY_TICKETS' && <Mytickets />}
    </div>
  )
}

export default BodyCon

