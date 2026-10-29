import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Folder, FileText, Users, Settings } from 'lucide-react';

function Sidebar() {
  return (
    <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
      <Nav className="flex-column nav-pills">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/" end className="text-white">
            <LayoutDashboard size={18} className="me-2" />
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/category" className="text-white">
            <Folder size={18} className="me-2" />
            Category
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/news" className="text-white">
            <FileText size={18} className="me-2" />
            News
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/users" className="text-white">
            <Users size={18} className="me-2" />
            Users
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/settings" className="text-white">
            <Settings size={18} className="me-2" />
            Settings
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Sidebar;
