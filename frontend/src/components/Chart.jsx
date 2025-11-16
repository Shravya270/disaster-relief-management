import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#2563eb', '#f97316', '#22c55e', '#eab308', '#8b5cf6', '#ec4899'];

export const PieChartComponent = ({ data, dataKey = 'count', nameKey = 'category' }) => {
  const total = data.reduce((sum, item) => sum + (item[dataKey] || 0), 0);
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(entry) => {
            const name = entry[nameKey] || entry.category || 'Unknown';
            const percent = total > 0 ? ((entry[dataKey] || 0) / total * 100).toFixed(1) : '0.0';
            return `${name}: ${percent}%`;
          }}
          outerRadius={80}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value, name, props) => {
            const categoryName = props.payload[nameKey] || props.payload.category || 'Unknown';
            const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
            return [`${value} (${percent}%)`, categoryName];
          }}
        />
        <Legend 
          formatter={(value, entry) => {
            return entry.payload[nameKey] || entry.payload.category || 'Unknown';
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const BarChartComponent = ({ data, dataKey = 'count', nameKey = 'status' }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={nameKey} 
          tick={{ fill: '#64748b' }}
        />
        <YAxis 
          tick={{ fill: '#64748b' }}
        />
        <Tooltip 
          formatter={(value) => [`${value} requests`, 'Count']}
        />
        <Legend formatter={() => 'Number of Requests'} />
        <Bar 
          dataKey={dataKey} 
          fill="#2563eb" 
          name="Count"
          label={{ position: 'top', formatter: (value) => value }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default { PieChartComponent, BarChartComponent };

