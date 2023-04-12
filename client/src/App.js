import './App.css';
import Location from "./components/Location";
import UserPokemon from './components/UserPokemon';
import EnemyPokemon from './components/EnemyPokemon';
import Countdown from './components/Countdown';

import { useEffect, useState } from "react";

const tickTime = 1;
const countdownTime = 5;

function App() {
  const [locations, setLocations] = useState(null);
  const [areas, setAreas] = useState(null);

  const [locationChosen, setLocationChosen] = useState(false);

  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [usersPokemons, setUsersPokemons] = useState(null);
  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [pokemonsAvailable, setPokemonsAvailable] = useState(true);

  const [gameState, setGameState] = useState("location");

  useEffect(() => {
    const fetchLocations = async () => {
      const locationArray = [];
      for (let i = 1; i <= 20; i++) {
        const res = await fetch(`https://pokeapi.co/api/v2/location/${i}`);
        const data = await res.json();
        locationArray.push(data);
      }
      console.log(locationArray);
      setLocations(locationArray);
    }
    fetchLocations();

    const fetchPokemons = async () => {
      const res = await fetch(`http://127.0.0.1:4000/api/pokemon`);
      const data = await res.json();
      const pokemonDetails = [];
      data.pokemons.map(async (item) => {
        const pRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${item}/`);
        const pData = await pRes.json();
        pokemonDetails.push(pData)
      })
      setUsersPokemons(pokemonDetails);
    }
    fetchPokemons()
  }, [])

  useEffect(() => {
    if (locationChosen) {
      const fetchPokemons = async () => {
        if (areas.length > 0) {
          const getRandomArea = async () => {
            const randomArea = areas[Math.floor(Math.random() * areas.length)];
            const res = await fetch(randomArea.url);
            const data = await res.json();
            return data;
          }
          const randomArea = await getRandomArea();

          const fetchEnemyPokemons = randomArea.pokemon_encounters.map(async (encounter) => {
            const res = await fetch(encounter.pokemon.url);
            const pokemon = await res.json();
            return pokemon;
          })

          Promise.all(fetchEnemyPokemons).then(resolved => setEnemyPokemon(resolved[Math.floor(Math.random() * resolved.length)]));

          setPokemonsAvailable(true);
        } else setPokemonsAvailable(false);
      }
      fetchPokemons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationChosen])

  if (locations) {
    switch (gameState) {
      case "location":
        return (
          <div className="locations">
            {locations.map((loc, i) => (
              <Location key={i} location={loc} handleClick={() => { setAreas(loc.areas); setGameState("random"); setLocationChosen(true) }} />
            ))}
          </div>
        )
      case "random":
        if (pokemonsAvailable) {
          if (enemyPokemon && usersPokemons) {
            return (
              <div className="randomizer">
                <EnemyPokemon enemyPokemon={enemyPokemon} />
                <div className="usersPokemons">
                  <h1>Choose your pokemon!</h1>
                  {usersPokemons.map((item, i) => (
                    <UserPokemon key={i} handleClick={() => {setChosenPokemon(item); setGameState("prep")}} pokemon={item} />
                  ))}
                </div>
              </div>
            )
          } else return <div></div>;
        } else {
          return (
            <div className="randomizer">
              <h1>No pokemons here...</h1>
              <button onClick={() => { setGameState("location"); setLocationChosen(false) }}>Go back</button>
            </div>
          )
        }
      case "prep":
        return(
          <Countdown userPokemon={chosenPokemon} enemyPokemon={enemyPokemon} countdownTime={countdownTime} cb={() => setGameState("encounter")}/>
        )
      case "encounter":
        return (
          <p>asd</p>
        )
      default:
        break;
    }
  }
}

export default App;
