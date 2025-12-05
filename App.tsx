import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Employees from './pages/Employees';
import Payroll from './pages/Payroll';
import Reports from './pages/Reports';
import { Role } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUserRole, setCurrentUserRole] = useState<Role>(Role.ADMIN);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'attendance':
        return <Attendance />;
      case 'employees':
        return <Employees />;
      case 'payroll':
        return <Payroll />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      currentUserRole={currentUserRole}
      setCurrentUserRole={setCurrentUserRole}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;