import React from "react";
import './App.css';
import Game from "./components/Game";
import SignUpDialog from "./components/SignUpDialog";
import NameForm from "./components/NameForm";
import LoginControl from "./components/LoginControl";
import ToggleClass from "./components/Toggle";

const numbers = [10, 11, 12, 13]

function App()
{
  return (
    <div className="App">
        <Game/>
        <div>
          <SignUpDialog/>
          <br/>
          <NameForm/>
          <LoginControl></LoginControl>
          <ToggleClass />
        </div>
    </div>
  );
}

export default App;
