import React from 'react';
import './styles/global.css';  // Import global styles
import AppRouter from './routers';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default App;
