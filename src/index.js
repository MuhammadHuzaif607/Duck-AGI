import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-offline/semantic.min.css';
import './index.css';
// import './responsive.css';
import { UserProvider } from './context/User';
import 'react-toastify/dist/ReactToastify.css';
import { StatusProvider } from './context/Status';
import { Layout } from '@douyinfe/semi-ui';
import { ThemeProvider } from './context/Theme';
import { StyleProvider } from './context/Style/index.js';
import PageLayout from './components/PageLayout.js';
import './i18n/i18n.js';
import './responsive.css';

// initialization

const root = ReactDOM.createRoot(document.getElementById('root'));
const { Sider, Content, Header, Footer } = Layout;
root.render(
  <React.StrictMode>
    <StatusProvider>
      <UserProvider>
        <BrowserRouter>
          <ThemeProvider>
            <StyleProvider>
              <PageLayout />
            </StyleProvider>
          </ThemeProvider>
        </BrowserRouter>
      </UserProvider>
    </StatusProvider>
  </React.StrictMode>,
);
