import React, { useState } from 'react';
import { Table, Button, Form, InputGroup, Modal, Badge, Card } from 'react-bootstrap';
import { getUsers, saveUsers, getCurrentUser } from '../services/LuanLHCE191099_dataService';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

function UserManagement() {
  const [users, setUsers] = useState(() => getUsers());
  const [searchKw, setSearchKw] = useState('');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({ username: '', password: '', role: 2, status: 1 });
  const [formError, setFormError] = useState('');

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setFormError('');
  };

  const handleShowAdd = () => {
    setIsEdit(false);
    setFormData({ username: '', password: '', role: 2, status: 1 });
    setCurrentId(null);
    setShowModal(true);
  };

  const handleShowEdit = (user) => {
    setIsEdit(true);
    setFormData({ 
      username: user.username, 
      password: user.password, 
      role: user.role, 
      status: user.status 
    });
    setCurrentId(user.id);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      setFormError('Username and password are required');
      return;
    }

    let updatedUsers = [...users];
    
    // Check for duplicate username
    const isDuplicate = updatedUsers.some(u => u.username === formData.username && u.id !== currentId);
    if (isDuplicate) {
      setFormError('Username already exists');
      return;
    }

    if (isEdit) {
      updatedUsers = updatedUsers.map(u => u.id === currentId ? { 
        ...u, 
        ...formData,
        role: Number(formData.role),
        status: Number(formData.status) 
      } : u);
    } else {
      const newId = updatedUsers.length > 0 ? Math.max(...updatedUsers.map(u => u.id)) + 1 : 1;
      updatedUsers.push({ 
        id: newId, 
        ...formData,
        role: Number(formData.role),
        status: Number(formData.status) 
      });
    }
    
    saveUsers(updatedUsers);
    setUsers(updatedUsers);
    handleCloseModal();
  };

  const confirmDelete = (id) => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === id) {
      alert("You cannot delete your own account while logged in.");
      return;
    }
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    const updatedUsers = users.filter(u => u.id !== deleteId);
    saveUsers(updatedUsers);
    setUsers(updatedUsers);
    setShowDeleteModal(false);
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchKw.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Management</h2>
        <Button variant="primary" onClick={handleShowAdd}>
          <Plus size={18} className="me-1" /> Add User
        </Button>
      </div>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <InputGroup className="w-50">
            <InputGroup.Text><Search size={18} /></InputGroup.Text>
            <Form.Control
              placeholder="Search by username..."
              value={searchKw}
              onChange={(e) => setSearchKw(e.target.value)}
            />
          </InputGroup>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>
                      {u.role === 1 ? <Badge bg="primary">Admin</Badge> : <Badge bg="info">Staff</Badge>}
                    </td>
                    <td>
                      {u.status === 1 ? <Badge bg="success">Active</Badge> : <Badge bg="secondary">Inactive</Badge>}
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowEdit(u)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => confirmDelete(u.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">No users found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError && <div className="alert alert-danger p-2">{formError}</div>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value={1}>Admin</option>
                <option value={2}>Staff</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserManagement;
