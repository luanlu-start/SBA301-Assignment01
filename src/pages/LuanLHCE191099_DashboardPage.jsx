import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { getCategories, getNews, getUsers } from '../services/LuanLHCE191099_dataService';

function DashboardPage() {
  const categoriesCount = getCategories().length;
  const newsCount = getNews().length;
  const usersCount = getUsers().length;

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <Row>
        <Col md={4}>
          <Card className="bg-primary text-white mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Total Categories</Card.Title>
              <Card.Text className="display-4">{categoriesCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-success text-white mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Total News</Card.Title>
              <Card.Text className="display-4">{newsCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-info text-white mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="display-4">{usersCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardPage;
