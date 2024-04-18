import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Container>
      <h1>Sundaes on Demand</h1>
      <OrderDetailsProvider>
        <OrderEntry />
        <OrderSummary />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
