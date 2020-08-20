import * as React from 'react';
import SidebarMenu from './SidebarMenu';

const Layout = ({ children }) => {
  return (
    <div className="grid grid-cols-12 gap-10 mt-4">
      <div className="col-span-2">
        <SidebarMenu />
      </div>
      <main className="col-span-10 p-4 bg-white shadow mr-4">{children}</main>
    </div>
  );
};

export default Layout;
