import './App.css';
import Location from "./components/Location";
import RandomEncounter from './components/RandomEncounter';
import Encounter from './components/Encounter';
import { useState } from "react";

function App() {
  const [area, setArea] = useState(null);
  const [gameState, setGameState] = useState("location");

  const renderLocations = () => {
    let ret = [];
    for (let i = 1; i <= 20; i++) {
      ret.push(<Location key={i} handleClick={() => {setArea(i); setGameState("random")}} id={i} />);
    }
    return ret;
  }

  switch(gameState){
    case "location":
      return (
        <div className="locations">
          {renderLocations()}
        </div>
      )
      break;
    case "random":
      return (
        <RandomEncounter area={area} handleClick={() => setGameState("encounter")}/>
      )
      break;
    case "encounter":
      return (
        <Encounter/>
      )
      break;
  }
}

export default App;
