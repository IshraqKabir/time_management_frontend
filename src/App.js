import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter } from 'react-router-dom'
import Layout from './Containers/Layout/Layout'
import CssBaseline from '@material-ui/core/CssBaseline'
import Routes from './Containers/Routes'

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
