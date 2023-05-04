import { useEffect,useState } from 'react';
import './chart.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Chart(props) {

  
  
  return (
    <div className='chart'>
      <h3 className='chartTitle'>Severity plot </h3>
      <span style={{fontWeight:"bold",color:"Red"}}>High : {props.high}</span>
      <span style={{fontWeight:"bold",color:"Orange"}}>Medium : {props.medium}</span>
      <span style={{fontWeight:"bold",color:"Green"}}>Low : {props.low}</span>

      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={props.doctor}>
          <XAxis dataKey="firstName" stroke="#5550bd"/>
          <Line typo="monotone" dataKey="severity" stroke='#5550bd'/>
          {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
          <Tooltip/>
          <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
