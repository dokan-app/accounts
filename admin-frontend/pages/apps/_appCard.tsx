import * as React from 'react';

const AppCard = ({ app }: any) => {
  return (
    <div className="border p-3 mb-4">
      <pre>{JSON.stringify(app, undefined, 4)}</pre>

      <h4>
        <span>name:</span> dokan.app
      </h4>
      <h4>appId: dokan.app</h4>
      <h4>client Id: dokan.app</h4>
      <h4>client Secret: dokan.app</h4>

      <div className="mt-2">
        <button className="px-2 text-sm bg-gray-300">Edit</button>
        <button className="px-2 text-sm bg-red-500 text-white">Delete</button>
      </div>
    </div>
  );
};

export default AppCard;
