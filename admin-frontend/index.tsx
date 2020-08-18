import * as React from 'react';
import { render } from 'react-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const Admin = () => {
  const { isLoading, error, data } = useQuery('repoData', () =>
    axios.get('/api/apps', { withCredentials: true }),
  );

  return (
    <pre className="bg-indigo-500 text-white">
      {JSON.stringify(data, undefined, 4)}
    </pre>
  );
};

render(<Admin />, document.getElementById('admin-frontend'));
