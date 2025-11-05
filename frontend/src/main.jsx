import i18next from 'i18next';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import App from '/src/App.jsx';
import { resources } from '/src/locales/resources';
import { store } from '/src/store/store.js';
import '/src/index.css';
import '/src/styles.scss';

const i18n = i18next.createInstance();

await i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'ru',
});

export default i18n;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  </StrictMode>
);
