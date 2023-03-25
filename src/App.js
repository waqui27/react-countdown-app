import React from "react"
import './App.css';
import Countdown from "./component/CountDown"


function App() {
  return (
    <div className="App">
      <Countdown initialHours={23} initialMinutes={59} initialSeconds={59} />
    </div>
  );
}

export default App;