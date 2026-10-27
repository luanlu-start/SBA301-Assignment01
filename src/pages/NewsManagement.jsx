import React, { useState } from 'react';
import { Table, Button, Form, InputGroup, Modal, Badge, Card } from 'react-bootstrap';
import { getNews, saveNews, getCategories, getUsers, getCurrentUser } from '../services/dataService';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

function NewsManagement() {
  const [newsList, setNewsList] = useState(() => getNews());
  const [categories] = useState(() => getCategories());
  const [users] = useState(() => getUsers());
  const [searchKw, setSearchKw] = useState('');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({ title: '', content: '', categoryId: '', tags: '', status: 1 });
  const [formError, setFormError] = useState('');

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const getCategoryName = (id) => categories.find(c => c.id === Number(id))?.name || 'Unknown';
  const getUserName = (id) => users.find(u => u.id === Number(id))?.username || 'Unknown';

  const handleCloseModal = () => {
    setShowModal(false);
    setFormError('');
  };

  const handleShowAdd = () => {
    setIsEdit(false);
    setFormData({ title: '', content: '', categoryId: categories[0]?.id || '', tags: '', status: 1 });
    setCurrentId(null);
    setShowModal(true);
  };

  const handleShowEdit = (newsItem) => {
    setIsEdit(true);
    setFormData({ 
      title: newsItem.title, 
      content: newsItem.content, 
      categoryId: newsItem.categoryId, 
      tags: newsItem.tags || '', 
      status: newsItem.status 
    });
    setCurrentId(newsItem.id);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.categoryId) {
      setFormError('Title and Category are required');
      return;
    }

    let updatedNews = [...newsList];
    const currentUser = getCurrentUser();

    if (isEdit) {
      updatedNews = updatedNews.map(n => n.id === currentId ? { 
        ...n, 
        ...formData, 
        categoryId: Number(formData.categoryId),
        status: Number(formData.status) 
      } : n);
    } else {
      const newId = updatedNews.length > 0 ? Math.max(...updatedNews.map(n => n.id)) + 1 : 1;
      updatedNews.push({ 
        id: newId, 
        ...formData, 
        categoryId: Number(formData.categoryId),
        status: Number(formData.status),
        createdBy: currentUser.id 
      });
    }
    
    saveNews(updatedNews);
    setNewsList(updatedNews);
    handleCloseModal();
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    const updatedNews = newsList.filter(n => n.id !== deleteId);
    saveNews(updatedNews);
    setNewsList(updatedNews);
    setShowDeleteModal(false);
  };

  const filteredNews = newsList.filter(n => 
    n.title.toLowerCase().includes(searchKw.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>News Management</h2>
        <Button variant="primary" onClick={handleShowAdd}>
          <Plus size={18} className="me-1" /> Add News
        </Button>
      </div>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <InputGroup className="w-50">
            <InputGroup.Text><Search size={18} /></InputGroup.Text>
            <Form.Control
              placeholder="Search by title..."
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
                <th>Title</th>
                <th>Category</th>
                <th>Created By</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.length > 0 ? (
                filteredNews.map(n => (
                  <tr key={n.id}>
                    <td>{n.id}</td>
                    <td>{n.title}</td>
                    <td>{getCategoryName(n.categoryId)}</td>
                    <td>{getUserName(n.createdBy)}</td>
                    <td>
                      {n.status === 1 ? <Badge bg="success">Active</Badge> : <Badge bg="secondary">Inactive</Badge>}
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowEdit(n)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => confirmDelete(n.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">No news articles found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit News' : 'Add News'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError && <div className="alert alert-danger p-2">{formError}</div>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select 
                value={formData.categoryId}
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
              >
                <option value="">Select Category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="e.g. react, sports"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
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
        <Modal.Body>Are you sure you want to delete this news article?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewsManagement;
