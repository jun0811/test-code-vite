import { useState } from 'react';
import './App.css';

function App() {
  const [color, setColor] = useState('red');
  const [disabled, setDisabled] = useState(false);
  const btnClick = () => {
    if (color == 'red') setColor('blue');
    else setColor('red');
  };

  const handleCheckbox = () => {
    setDisabled((pre) => !pre);
  };

  return (
    <div>
      <button
        onClick={btnClick}
        className={disabled ? 'gray' : color}
        disabled={disabled}
      >
        Change to {color == 'red' ? 'blue' : 'red'}
      </button>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        onClick={handleCheckbox}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
