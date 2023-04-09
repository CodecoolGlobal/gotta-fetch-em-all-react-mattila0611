import { useState, useEffect } from "react";
import './App.css';

function App() {
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location/")
    .then(res => res.json())
    .then(data => console.log(data))
  }, [])

  return (
    <div className="root">
    </div>
  );
}

export default App;
