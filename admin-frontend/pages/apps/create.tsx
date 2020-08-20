import * as React from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const createAppMutation = ({ name, redirectUrl }) => {
  return axios.post('/api/apps', { name, redirectUrl });
};

const CreateApp = () => {
  const [mutate, { status, data, error, isError }] = useMutation(
    createAppMutation,
  );

  const router = useHistory();

  const [name, setName] = React.useState('');
  const [redirectUrl, setRedirectUrl] = React.useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    await mutate({ name, redirectUrl });
    router.push('/apps');
  };

  return (
    <>
      {isError && (
        <h1 className="text-red-500">You have some validation error</h1>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="mb-0" htmlFor="name">
            App name
          </label>
          <input
            className="w-full border px-2 py-1"
            type="text"
            id="name"
            placeholder="App name"
            required
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="mb-0" htmlFor="name">
            Redirect Url
          </label>
          <input
            className="w-full border px-2 py-1"
            type="url"
            id="name"
            placeholder="Redirect Url"
            required
            onChange={e => setRedirectUrl(e.target.value)}
          />
        </div>
        <div>
          <button className="bg-green-400 px-4 py-1 rounded text-sm">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateApp;
