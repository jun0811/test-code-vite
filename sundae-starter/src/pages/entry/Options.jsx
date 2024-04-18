import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { pricePerItem } from '../../constants';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { total } = useOrderDetails();
  useEffect(() => {
    // optionType is scoops or toppings
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => {
        // TODO : handle error
        setError(true);
      });
  }, [optionType]);

  // Todo : null을 ToppingOption으로 대체 해야함
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  if (error) return <AlertBanner />;
  return (
    <>
      <h2>{title}</h2>
      <p>${pricePerItem[optionType].toFixed(2)} each</p>
      <p>
        {title} total: ${Number(total[optionType]).toFixed(2)}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
