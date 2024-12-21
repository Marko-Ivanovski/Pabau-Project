import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the updated import for React 18
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import App from './App';
import './index.css';
import { LanguageProvider } from './LanguageContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot instead of render
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </LanguageProvider>
  </React.StrictMode>
);