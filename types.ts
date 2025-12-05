export enum Role {
  ADMIN = 'Admin',
  HR = 'HR',
  FINANCE = 'Finance',
  EMPLOYEE = 'Employee'
}

export enum Department {
  ENGINEERING = 'Engineering',
  SALES = 'Sales',
  MARKETING = 'Marketing',
  HR = 'Human Resources'
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: Department;
  joinDate: string;
  salary: number; // Basic Salary
  status: 'Active' | 'On Leave' | 'Terminated';
  avatar: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string; // ISO String
  clockOut?: string; // ISO String
  locationIn?: { lat: number; lng: number };
  status: 'Present' | 'Late' | 'Absent';
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  month: string; // YYYY-MM
  basicSalary: number;
  allowances: number;
  deductions: number; // BPJS etc
  tax: number; // PPh 21
  netSalary: number;
  status: 'Draft' | 'Processed' | 'Paid';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'Annual' | 'Sick' | 'Unpaid';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}