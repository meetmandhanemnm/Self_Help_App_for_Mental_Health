import React, { PureComponent } from 'react';
  import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

  const data = [
    {
      name: '',
      uv: 4000,
     
    },
    {
      name: 'Page B',
      uv: 3000,
      
    },
    {
      name: 'Page C',
      uv: 2000,
     
    },
    
  ];

export default function UserBarChart (props) {
  
    return (
      <div className='chart'>
      <h3 className='chartTitle'>Progress plot: </h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <BarChart width={150} height={40} data={props.doctor}>
        <XAxis dataKey="firstName" />
          <Bar dataKey="numActCompleted" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      </div>
      
    );
  }

