import * as React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarMenu = () => {
  return (
    <nav className="nav flex-column">
      <NavLink to="/" className="nav-link">
        Dashboard
      </NavLink>
      <NavLink to="/apps" className="nav-link">
        Apps
      </NavLink>
      <a href="#" className="nav-link">
        Users
      </a>
      <a href="#" className="nav-link">
        Settings
      </a>
    </nav>
  );
};

export default SidebarMenu;
