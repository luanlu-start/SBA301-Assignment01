import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './LuanLHCE191099_Header';
import Sidebar from './LuanLHCE191099_Sidebar';

function AdminLayout({ onLogout }) {
  return (
    <div className="d-flex flex-column vh-100">
      <Header onLogout={onLogout} />
      <div className="d-flex flex-grow-1 overflow-hidden">
        <Sidebar />
        <main className="flex-grow-1 p-4 bg-light overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
