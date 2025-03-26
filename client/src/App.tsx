import './App.css';
import WebRoutes from './routes/WebRoutes';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function App() {
  return (
    <>
      <PayPalScriptProvider
        options={{
          "client-id": import.meta.env.VITE_PAYPAL_SANDBOX_CLIENT_ID,
          currency: "USD",
        }}>
        <WebRoutes />
      </PayPalScriptProvider >
    </>
  )
}

export default App;
