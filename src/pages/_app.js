// src/pages/_app.js
import { Provider } from 'react-redux';
import { store } from '@/redux/store'; // Adjust the path if needed
import '../styles/globals.css'; // Ensure this path is correct

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
     
      <Component {...pageProps} />
    </Provider>
  );
}
