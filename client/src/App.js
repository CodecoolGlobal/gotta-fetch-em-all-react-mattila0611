import './App.css';
import Location from "./components/Location";

function renderLocations() {
  let ret = [];
  for (let i = 1; i <= 20; i++) {
    ret.push(<Location key={i} id={i} />)
  }
  return ret;
}

function App() {
  return (
    <div className="locations">
      {renderLocations()}
    </div>
  )
}

export default App;
