import * as React from 'react';
import { render } from 'react-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import AppCard from './_appCard';
import NewApp from './_newApp';
import { Link } from 'react-router-dom';

const AppIndex = () => {
  const { data, isLoading, isError, error } = useQuery('api/apps');

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1 className="text-3xl mb-4">Apps</h1>

      <Link to="/apps/create">Register new app</Link>

      {data?.data.map(app => (
        <AppCard key={app._id} app={app} />
      ))}
    </div>
  );
};

export default AppIndex;
