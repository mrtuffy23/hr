import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Users, Clock, DollarSign, Calendar } from 'lucide-react';

const dataAttendance = [
  { name: 'Mon', present: 45, absent: 2, late: 3 },
  { name: 'Tue', present: 48, absent: 1, late: 1 },
  { name: 'Wed', present: 47, absent: 3, late: 0 },
  { name: 'Thu', present: 46, absent: 2, late: 2 },
  { name: 'Fri', present: 44, absent: 1, late: 5 },
];

const dataDepartment = [
  { name: 'Engineering', value: 12 },
  { name: 'Sales', value: 8 },
  { name: 'Marketing', value: 5 },
  { name: 'HR', value: 3 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Employees</p>
              <p className="text-2xl font-semibold text-gray-800">28</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">On Time Today</p>
              <p className="text-2xl font-semibold text-gray-800">92%</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">On Leave</p>
              <p className="text-2xl font-semibold text-gray-800">3</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Next Payroll</p>
              <p className="text-2xl font-semibold text-gray-800">Oct 30</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Weekly Attendance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataAttendance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="late" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Employee Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataDepartment}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataDepartment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            {dataDepartment.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;