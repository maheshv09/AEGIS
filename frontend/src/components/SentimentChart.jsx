import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the sentiment trend chart for the MVP
const data = [
  { time: '10:00', positive: 65, negative: 35 },
  { time: '10:15', positive: 59, negative: 41 },
  { time: '10:30', positive: 80, negative: 20 },
  { time: '10:45', positive: 81, negative: 19 },
  { time: '11:00', positive: 56, negative: 44 },
  { time: '11:15', positive: 45, negative: 55 }, // Spike in adverse events
  { time: '11:30', positive: 60, negative: 40 },
];

export function SentimentChart() {
  return (
    <div className="w-full h-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              borderColor: '#e2e8f0',
              borderRadius: '8px',
              color: '#1e293b',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Area 
            type="monotone" 
            dataKey="positive" 
            stroke="#8b5cf6" 
            fillOpacity={1} 
            fill="url(#colorPositive)" 
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="negative" 
            stroke="#e11d48" 
            fillOpacity={1} 
            fill="url(#colorNegative)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
