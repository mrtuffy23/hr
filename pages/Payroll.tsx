import React, { useState } from 'react';
import { Download, FileText, CheckCircle } from 'lucide-react';
import { MOCK_PAYROLL, MOCK_EMPLOYEES } from '../services/mockData';
import { PayrollRecord } from '../types';

const Payroll: React.FC = () => {
  const [payrollData] = useState<PayrollRecord[]>(MOCK_PAYROLL);

  const getEmployeeName = (id: string) => {
    return MOCK_EMPLOYEES.find(e => e.id === id)?.name || 'Unknown';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">Payroll</h1>
        <button className="px-4 py-2 mt-4 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 sm:mt-0">
          Run Payroll (Sep 2023)
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Total Disbursed</p>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(payrollData.reduce((a, b) => a + b.netSalary, 0))}</p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Total Tax (PPh21)</p>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(payrollData.reduce((a, b) => a + b.tax, 0))}</p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Pending Status</p>
            <p className="text-2xl font-bold text-gray-800">0</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-medium">Employee</th>
                <th className="px-6 py-3 font-medium">Period</th>
                <th className="px-6 py-3 font-medium">Basic Salary</th>
                <th className="px-6 py-3 font-medium">Net Salary</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payrollData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{getEmployeeName(record.employeeId)}</td>
                  <td className="px-6 py-4 text-gray-500">{record.month}</td>
                  <td className="px-6 py-4 text-gray-500">{formatCurrency(record.basicSalary)}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">{formatCurrency(record.netSalary)}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Download PDF">
                      <FileText className="w-5 h-5" />
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

export default Payroll;