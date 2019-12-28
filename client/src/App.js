import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <div className="Dashboard">
      <header className="Dashboard-header">
        <Dashboard />
      </header>
    </div>
  );
}

export default App;
