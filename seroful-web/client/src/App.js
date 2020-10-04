import React from "react";
import { Button } from "@material-ui/core";
import logo from "./logo.svg";
import "./App.css";
import * as api from "./util/api";

function App() {
  const test = async () => {
    const res = await api.users();
    console.log(res);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button onClick={() => test()}>Test</Button>
      </header>
    </div>
  );
}

export default App;
