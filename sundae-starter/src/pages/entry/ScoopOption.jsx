import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useOrderDetails } from '../../contexts/OrderDetails';

const ScoopOption = ({ name, imagePath }) => {
  const { updateOrderItemCount } = useOrderDetails();
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form>
        <Form.Label htmlFor={name}>{name}</Form.Label>
        <Form.Control
          type="number"
          id={name}
          label={name}
          min={0}
          defaultValue={0}
          onChange={(e) => {
            updateOrderItemCount(name, e.target.value, 'scoops');
          }}
        />
      </Form>
    </Col>
  );
};

export default ScoopOption;
