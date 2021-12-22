import React from 'react';

const Header = () => {
  return (
    <header className="h-16 flex items-center justify-between px-4 bg-blue-500 text-white">
      <a href="/">Kanban Board</a>
      <ul>
        <li>
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
