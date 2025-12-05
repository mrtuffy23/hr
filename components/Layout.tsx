import React, { useState } from 'react';
import { 
  Users, 
  LayoutDashboard, 
  Clock, 
  DollarSign, 
  PieChart, 
  Menu, 
  X, 
  LogOut,
  UserCircle
} from 'lucide-react';
import { Role } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUserRole: Role;
  setCurrentUserRole: (role: Role) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  currentUserRole,
  setCurrentUserRole
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: [Role.ADMIN, Role.HR, Role.FINANCE, Role.EMPLOYEE] },
    { id: 'attendance', label: 'Attendance', icon: Clock, roles: [Role.ADMIN, Role.HR, Role.EMPLOYEE] },
    { id: 'employees', label: 'Employees', icon: Users, roles: [Role.ADMIN, Role.HR] },
    { id: 'payroll', label: 'Payroll', icon: DollarSign, roles: [Role.ADMIN, Role.FINANCE, Role.EMPLOYEE] },
    { id: 'reports', label: 'Reports & AI', icon: PieChart, roles: [Role.ADMIN, Role.HR, Role.FINANCE] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(currentUserRole));

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <span className="text-2xl font-bold text-blue-600">HRPulse</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {filteredMenu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
            <div className="mb-4">
                <label className="text-xs font-semibold text-gray-400 uppercase">View As</label>
                <select 
                    value={currentUserRole}
                    onChange={(e) => setCurrentUserRole(e.target.value as Role)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-50"
                >
                    {Object.values(Role).map((role) => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>
          <div className="flex items-center p-2 mt-2 space-x-3 rounded-lg bg-gray-50">
            <UserCircle className="w-8 h-8 text-gray-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Demo User</p>
              <p className="text-xs text-gray-500 truncate">{currentUserRole}</p>
            </div>
            <LogOut className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 lg:hidden">
          <span className="text-xl font-bold text-blue-600">HRPulse</span>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;