import React, { useState } from 'react';
import { Table, Button, Form, InputGroup, Modal, Badge, Card } from 'react-bootstrap';
import { getCategories, saveCategories, getNews } from '../services/dataService';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

function CategoryManagement() {
  const [categories, setCategories] = useState(() => getCategories());
  const [searchKw, setSearchKw] = useState('');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({ name: '', status: 1 });
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
    setFormData({ name: '', status: 1 });
    setCurrentId(null);
    setShowModal(true);
  };

  const handleShowEdit = (category) => {
    setIsEdit(true);
    setFormData({ name: category.name, status: category.status });
    setCurrentId(category.id);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      setFormError('Name is required');
      return;
    }

    let updatedCats = [...categories];
    if (isEdit) {
      updatedCats = updatedCats.map(c => c.id === currentId ? { ...c, ...formData, status: Number(formData.status) } : c);
    } else {
      const newId = updatedCats.length > 0 ? Math.max(...updatedCats.map(c => c.id)) + 1 : 1;
      updatedCats.push({ id: newId, ...formData, status: Number(formData.status) });
    }
    
    saveCategories(updatedCats);
    setCategories(updatedCats);
    handleCloseModal();
  };

  const confirmDelete = (id) => {
    const categoryIsUsed = getNews().some(newsItem => Number(newsItem.categoryId) === Number(id));
    if (categoryIsUsed) {
      window.alert('This category is used by news articles and cannot be deleted.');
      return;
    }
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    const updatedCats = categories.filter(c => c.id !== deleteId);
    saveCategories(updatedCats);
    setCategories(updatedCats);
    setShowDeleteModal(false);
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchKw.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Category Management</h2>
        <Button variant="primary" onClick={handleShowAdd}>
          <Plus size={18} className="me-1" /> Add Category
        </Button>
      </div>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <InputGroup className="w-50">
            <InputGroup.Text><Search size={18} /></InputGroup.Text>
            <Form.Control
              placeholder="Search by name..."
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
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>
                      {c.status === 1 ? <Badge bg="success">Active</Badge> : <Badge bg="secondary">Inactive</Badge>}
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowEdit(c)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => confirmDelete(c.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">No categories found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError && <div className="alert alert-danger p-2">{formError}</div>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
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
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CategoryManagement;
