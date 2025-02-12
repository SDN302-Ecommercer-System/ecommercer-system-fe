import '@mantine/core/styles.css';
import { createRoot } from 'react-dom/client';
import './index.css';
import './assets/css/embla-carousel.css'
import App from './App.jsx';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import store from './redux/store/store.js';
import "./assets/i18n.js";
import '@mantine/notifications/styles.css';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </Provider>
);
