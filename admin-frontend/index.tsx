import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import { ReactQueryDevtools } from 'react-query-devtools';
import { ReactQueryConfigProvider } from 'react-query';

import Layout from './components/Layout';
import HomePage from './pages/root';
import AppIndex from './pages/apps';
import CreateApp from './pages/apps/create';

const defaultQueryFn = async key => {
  const { data } = await axios.get(`/${key}`, { withCredentials: true });
  return data;
};

const Admin = () => {
  return (
    <ReactQueryConfigProvider
      config={{
        queries: {
          queryFn: defaultQueryFn,
        },
      }}
    >
      <HashRouter>
        <Switch>
          <Layout>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/apps" component={AppIndex} />
            <Route exact path="/apps/create" component={CreateApp} />
          </Layout>
        </Switch>
      </HashRouter>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </ReactQueryConfigProvider>
  );
};

render(<Admin />, document.getElementById('admin-frontend'));
