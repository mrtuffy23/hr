import { Employee, Role, Department, AttendanceRecord, PayrollRecord, LeaveRequest } from '../types';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'EMP001',
    name: 'Andi Pratama',
    email: 'andi@hrpulse.com',
    role: Role.ADMIN,
    department: Department.ENGINEERING,
    joinDate: '2022-01-15',
    salary: 15000000,
    status: 'Active',
    avatar: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: 'EMP002',
    name: 'Siti Aminah',
    email: 'siti@hrpulse.com',
    role: Role.HR,
    department: Department.HR,
    joinDate: '2022-03-10',
    salary: 12000000,
    status: 'Active',
    avatar: 'https://picsum.photos/100/100?random=2'
  },
  {
    id: 'EMP003',
    name: 'Budi Santoso',
    email: 'budi@hrpulse.com',
    role: Role.EMPLOYEE,
    department: Department.SALES,
    joinDate: '2023-06-01',
    salary: 8000000,
    status: 'Active',
    avatar: 'https://picsum.photos/100/100?random=3'
  },
  {
    id: 'EMP004',
    name: 'Dewi Lestari',
    email: 'dewi@hrpulse.com',
    role: Role.FINANCE,
    department: Department.MARKETING,
    joinDate: '2023-08-20',
    salary: 9500000,
    status: 'On Leave',
    avatar: 'https://picsum.photos/100/100?random=4'
  }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'ATT001',
    employeeId: 'EMP001',
    date: '2023-10-25',
    clockIn: '2023-10-25T08:55:00',
    clockOut: '2023-10-25T17:05:00',
    status: 'Present'
  },
  {
    id: 'ATT002',
    employeeId: 'EMP001',
    date: '2023-10-26',
    clockIn: '2023-10-26T09:15:00', // Late
    status: 'Late'
  },
   {
    id: 'ATT003',
    employeeId: 'EMP003',
    date: '2023-10-26',
    clockIn: '2023-10-26T08:30:00',
    status: 'Present'
  }
];

export const MOCK_PAYROLL: PayrollRecord[] = [
  {
    id: 'PAY001',
    employeeId: 'EMP001',
    month: '2023-09',
    basicSalary: 15000000,
    allowances: 1000000,
    deductions: 500000,
    tax: 750000,
    netSalary: 14750000,
    status: 'Paid'
  },
  {
    id: 'PAY002',
    employeeId: 'EMP003',
    month: '2023-09',
    basicSalary: 8000000,
    allowances: 500000,
    deductions: 200000,
    tax: 150000,
    netSalary: 8150000,
    status: 'Paid'
  }
];

export const MOCK_LEAVES: LeaveRequest[] = [
    {
        id: 'L001',
        employeeId: 'EMP004',
        type: 'Annual',
        startDate: '2023-10-25',
        endDate: '2023-10-27',
        reason: 'Family Vacation',
        status: 'Approved'
    }
];