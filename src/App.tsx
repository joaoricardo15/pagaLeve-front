import React from 'react';
import './App.css';
import Calculator from './components/calculator';

function App() {
  return (
    <div className="hero-section">
      <header className="App-header">
        <a href="https://www.sinaitechnologies.com/">
          <img src="https://uploads-ssl.webflow.com/5f5f43d64d4a8a8f0c56d495/5f5f5b9c11b9e62883a6c8d2_sinai_logo_white.svg"></img>
        </a>
  
      </header>
      <div style={{
          width: "100%",
          height: 800,
          justifyContent: 'center',
          backgroundImage: "url(" + "https://uploads-ssl.webflow.com/5f5f43d64d4a8a8f0c56d495/601820fbb2b99957555cac18_1.png" + ")",
          backgroundPosition: '50% 100%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }} />
        <Calculator />
    </div>
  );
}

export default App;
