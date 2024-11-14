// src/pages/_app.js
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/redux/store';
import { fetchOrUpdateConversionRate } from '@/utils/currencyUtils';
import { CartProvider } from '@/context/CartContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch or update currency conversion rate when the app loads
    fetchOrUpdateConversionRate(dispatch);
  }, [dispatch]);

  return (
    <Provider store={store}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </Provider>
  );
}

// Wrap MyApp in the Provider to have access to dispatch
export default function AppWrapper(props) {
  return (
    <Provider store={store}>
      <MyApp {...props} />
    </Provider>
  );
}
