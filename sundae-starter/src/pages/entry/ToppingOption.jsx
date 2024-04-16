import { useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

const ToppingOption = ({ name, imagePath }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <Image
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form>
        <Form.Check type="checkbox" id={name} label={name} />
      </Form>
    </Col>
  );
};

export default ToppingOption;
