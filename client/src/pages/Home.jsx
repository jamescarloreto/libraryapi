import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToBrowseBooks = () => {
    navigate('/books');
  };

  const goToAdminPanel = () => {
    navigate('/profile');
  };

  return (
    <Container className="home-container mt-5">
      <Row className="justify-content-center text-center">
        <Col md={8} lg={6}>
          <h1 className="mb-4">Welcome to the Library Management System</h1>
          <p className="lead">Manage your documents efficiently and effortlessly.</p>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Button onClick={goToBrowseBooks} variant="primary" className="me-3">Browse Books</Button>
          <Button onClick={goToAdminPanel} variant="outline-secondary">Admin Panel</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
