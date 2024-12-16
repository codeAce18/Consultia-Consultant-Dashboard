import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', income: 26 },
  { name: 'Feb', income: 32 },
  { name: 'Mar', income: 11 },
  { name: 'Apr', income: 29 },
  { name: 'May', income: 31 },
  { name: 'Jun', income: 12 },
  { name: 'Jul', income: 24 },
  { name: 'Aug', income: 31 },
  { name: 'Sep', income: 33 },
  { name: 'Oct', income: 42 },
  { name: 'Nov', income: 31 },
  { name: 'Dec', income: 25 },
];

const IncomeSummaryChart: React.FC = () => {
  const [year, setYear] = useState(2024);
  const years = [2024, 2023, 2022];

  // Explicitly type the tickFormatter
  const tickFormatter = (value: number): string => `${value}m`;

  return (
    <div className="flex flex-col shadow-custom-light items-start bg-[#FFFFFF] w-[610px] h-[336px] rounded-[8px] border-[1.06px] border-[#F8F9FA]">
      {/* Header with Dropdown */}
      <div className="flex items-center gap-[250px] mb-4 pt-4">
        <h2 className="text-[20px] leading-[32px] tracking-[-2%]  font-bold mr-4 whitespace-nowrap pl-10 text-[#1B2559]">
            Income Summary
        </h2>
        <select
          className="outline-none text-[14px] leading-[24px] tracking-[-2%] font-bold text-[#7B91B0]"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>
      {/* Bar Chart for income summary*/}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis
            domain={[0, 50]}
            tickLine={false}
            axisLine={false}
            ticks={[0, 10, 20, 30, 40, 50]}
            tickFormatter={tickFormatter}
          />
          <Tooltip />
          <Bar dataKey="income" fill="#3A3285" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeSummaryChart;