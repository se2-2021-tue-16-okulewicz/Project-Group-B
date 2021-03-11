import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import AddCarForm from './registerDog/registerDog'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AddCarForm></AddCarForm>
      </header>
    </div>
  );
}

export default App;
