import React from "react";
import './App.css';
import Game from "./components/Game";
import SignUpDialog from "./components/SignUpDialog";
import NameForm from "./components/NameForm";
import LoginControl from "./components/LoginControl";

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
          {/*<NumberList numbers={[1,2,3,4,5]}/>*/}
          {/*<NumberList numbers={numbers}/>*/}
          <LoginControl></LoginControl>
          {/*<Toggle />*/}
        </div>
    </div>
  );
}

export default App;
