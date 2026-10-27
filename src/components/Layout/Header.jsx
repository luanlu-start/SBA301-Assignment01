import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { logout, getCurrentUser } from '../../services/dataService';
import { LogOut } from 'lucide-react';

function Header({ onLogout }) {
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="flex-shrink-0">
      <Container fluid>
        <Navbar.Brand href="/">
          <img 
            src="/logo.jpg" 
            alt="FUNews Logo" 
            style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '5px', marginRight: '10px' }} 
          />
          FUNewsManagementSystem
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="me-3">
            Signed in as: <a href="#login">{user?.username}</a>
          </Navbar.Text>
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            <LogOut size={16} className="me-1" /> Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
