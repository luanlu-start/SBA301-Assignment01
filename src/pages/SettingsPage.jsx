import React from 'react';
import { Card } from 'react-bootstrap';
import { getCurrentUser } from '../services/dataService';

function SettingsPage() {
  const user = getCurrentUser();

  return (
    <div>
      <h2 className="mb-4">Settings</h2>
      <Card>
        <Card.Body>
          <Card.Title>Profile Information</Card.Title>
          <Card.Text>
            <strong>Username:</strong> {user?.username} <br />
            <strong>Role:</strong> {user?.role === 1 ? 'Admin' : 'Staff'}
          </Card.Text>
          <p className="text-muted">More settings will be available in future updates.</p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SettingsPage;
