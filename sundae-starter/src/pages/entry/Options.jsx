import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
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

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  if (error) return <AlertBanner />;
  return <Row>{optionItems}</Row>;
};

export default Options;
