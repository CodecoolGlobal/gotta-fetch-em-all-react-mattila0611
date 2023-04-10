import { useState, useEffect } from "react";
import './App.css';
import Location from "./components/Location";

function App() {
    return (
      <div className="root">
        {renderLocations()}
      </div>
    )
}

function renderLocations(){
  let ret = [];
  for(let i = 1; i <= 20; i++){
    ret.push(<Location key={i} id={i}/>)
  }
  return ret;
}

export default App;
