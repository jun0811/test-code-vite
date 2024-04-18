import React from 'react';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderEntry = () => {
  const { total } = useOrderDetails();
  return (
    <div>
      <Options optionType={'scoops'} />
      <br />
      <Options optionType={'toppings'} />
      <br />
      <h2>
        Grand total: ${Number(total['scoops'] + total['toppings']).toFixed(2)}
      </h2>
    </div>
  );
};

export default OrderEntry;
