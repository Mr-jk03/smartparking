import React, { useState } from 'react'
import './Home.css'
import { data } from '../../../DataLocal/HomeData'
import { dataDeposit } from '../../../DataLocal/HomeData'
import { ticket_activity } from '../../../DataLocal/HomeData'

import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Scatter } from 'recharts';

const Home = () => {

  const [bougth, setBougth] = useState(255);
  const [month, setMonth] = useState(255000);
  const [used, setUsed] = useState(15);

  const formatDay = (tick) => new Date(tick).toLocaleDateString("vi-VN");
  const formatHour = (tick) => `${tick}h`;

  return (
    <div className='container'>
          <div className='row'>
            <div className="col-xl-4 col-lg-4 col-md-4 box-hd">
              <div className='home-header home-bougth'>
                <span className='title'>Số vé đã mua</span>
                <span className='home-value'>{bougth}</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 box-hd">
              <div className='home-header home-month'>
                <span className='title'>Tiêu dùng trong tháng</span>
                <span className='home-value'>
                  {month} <sup>đ</sup>
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 box-hd">
              <div className='home-header home-used'>
                <span className='title'>Số lượt sử dụng</span>
                <span className='home-value'>
                  {used} lượt
                </span>
              </div>
            </div>
          </div>
          <div className="row home-body">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className='body-table'>
                <span className='home-bd-title'>Nạp tiền gần đây</span>
                <div className="home-bd-data">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-4">
                        <span className='data-th'>Ngày nạp</span>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4">
                        <span className='data-th'>Giờ nạp</span>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4">
                        <span className='data-th'>Số tiền</span>
                      </div>

                      <div className="container">
                      {dataDeposit.map((transaction, index) => 
                        <div className="row" key={index}>
                          <div className="col-xl-4 col-lg-4 col-md-4">
                            <span className='data-td'>{transaction.day}</span>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-4">
                            <span className='data-td'>{transaction.hour}</span>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-4">
                            <span className='data-td'>{transaction.amount.toLocaleString()}</span>
                          </div>
                        </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className='body-table'>
                <span className='home-bd-title'>Hoạt động vé</span>
                <div className="home-bd-data">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-4">
                        <span className='data-th'>Ngày nạp</span>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4">
                        <span className='data-th'>Giờ vào</span>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4">
                        <span className='data-th'>Giờ ra</span>
                      </div>

                      <div className="container">
                        {ticket_activity.map((activity, index) => 
                          <div className="row" key={index}>
                            <div className="col-xl-4 col-lg-4 col-md-4">
                            <span className='data-td'>{activity.day}</span>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4">
                              <span className='data-td'>{activity.hour_in}</span>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4">
                              <span className='data-td'>{activity.hour_out}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 chars">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="day" 
                  name="Ngày nạp" 
                  tickFormatter={formatDay} 
                />
                <YAxis 
                  dataKey="amount" 
                  name="Số tiền (VND)" 
                  unit="đ" 
                />

                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  name="Số tiền (VND)" 
                  stroke="#8884d8" 
                />
                <Scatter 
                  dataKey="hour" 
                  name="Giờ nạp" 
                  fill="#82ca9d" 
                  shape="circle"
                />

              </ComposedChart>
            </ResponsiveContainer>
            </div>
          </div>
    </div>
  )
}
export default Home
