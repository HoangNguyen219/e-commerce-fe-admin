import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import React from 'react';
import { capitalize } from '../utils/helpers';

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke="#8884d8"
          allowDecimals={false}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#82ca9d"
          allowDecimals={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value, name, entry) => {
            if (entry.dataKey === 'revenue') {
              return [`$${value}`, capitalize(name)];
            }
            return [value, capitalize(name)];
          }}
        />
        <Legend formatter={(value) => capitalize(value)} />
        <Bar yAxisId="left" dataKey="sold" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
