import { FC } from 'react';
import Calculator from './components/calculator/calculator';
import './App.css';

const App: FC = () => (
  <div className="App">
    <header className="App-header">
      <a href="https://www.sinaitechnologies.com/">
        <img src="https://uploads-ssl.webflow.com/5f5f43d64d4a8a8f0c56d495/5f5f5b9c11b9e62883a6c8d2_sinai_logo_white.svg" alt="Sinai logo"></img>
      </a>
    </header>
    <div className="App-content">
      <Calculator />
    </div>
  </div>
);

export default App;
