import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Mail } from 'lucide-react';
import { MOCK_EMPLOYEES } from '../services/mockData';

const Employees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees] = useState(MOCK_EMPLOYEES);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
        <button className="flex items-center justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </button>
      </div>

      <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search employees..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-medium">Employee</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Department</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img className="w-10 h-10 rounded-full" src={employee.avatar} alt={employee.name} />
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-gray-500 text-xs">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{employee.role}</td>
                  <td className="px-6 py-4 text-gray-500">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
                        {employee.department}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      employee.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;