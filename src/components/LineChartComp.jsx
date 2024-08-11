/* eslint-disable react/prop-types */

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChartComp = ({ data, xAxisKey }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xAxisKey} />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="value" stroke="#C23631" fill="#C23631" />
    </AreaChart>
  </ResponsiveContainer>
);

export default AreaChartComp;
