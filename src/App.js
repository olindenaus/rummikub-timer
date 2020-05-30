import React, { useState } from 'react';
import './App.css';
import { Timer } from './components/Timer';
import { NameInput } from './components/NameInput';

function App() {

  const [names, setNames] = useState(['Oskar', 'Hubert']);
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const onSwitch = () => {
    console.log('onSwitch()', counter);
    let i = ((counter+1) % (names.length));
    console.log('onSwitch()', i);
    setCounter(counter => counter+1);
    setIndex(i);
  }

  const addName = (name) => {
    setNames(names => [...names, name]);
  }

  return (
    <div className="App">
      <header className="App-header">
        {names.toString()}
        {isStarted ? null : <NameInput onNameAdd={addName} />}
        <button onClick={() => setIsStarted(true)}>Start</button>
        {isStarted ? <Timer onSwitch={onSwitch} name={names[index]} /> : null}
      </header>
    </div>
  );
}

export default App;
