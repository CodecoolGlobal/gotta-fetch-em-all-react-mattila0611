import './App.css';
import "./fonts/PokemonFont.ttf"
import Location from "./components/Location";
import UserPokemon from './components/UserPokemon';
import EnemyPokemon from './components/EnemyPokemon';
import Countdown from './components/Countdown';
import BattlePokemon from './components/BattlePokemon';

import { useEffect, useState } from "react";

const tickTime = 0.2;
const countdownTime = 1;

function App() {
  const [locations, setLocations] = useState(null);
  const [areas, setAreas] = useState(null);

  const [locationChosen, setLocationChosen] = useState(false);

  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [usersPokemons, setUsersPokemons] = useState(null);
  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [pokemonsAvailable, setPokemonsAvailable] = useState(true);

  const [enemyHP, setEnemyHP] = useState(null);
  const [userHP, setUserHP] = useState(null);
  const [turn, setTurn] = useState(null);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);

  const [gameState, setGameState] = useState("location");

  useEffect(() => {
    const fetchLocations = async () => {
      const locationArray = [];
      for (let i = 1; i <= 20; i++) {
        const res = await fetch(`https://pokeapi.co/api/v2/location/${i}`);
        const data = await res.json();
        locationArray.push(data);
      }
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

          const resolved = await Promise.all(fetchEnemyPokemons);
          const randomPokemon = resolved[Math.floor(Math.random() * resolved.length)];
          setEnemyPokemon(randomPokemon);
          setEnemyHP(randomPokemon.stats[0].base_stat);

          setPokemonsAvailable(true);
        } else setPokemonsAvailable(false);
      }
      fetchPokemons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationChosen])

  useEffect(() => {
    if (turn) {
      if (enemyHP > 0 && userHP > 0) {
        const gameTurnTimer = setTimeout(() => { setTurn(turn === "enemy" ? "user" : "enemy"); gameTurn() }, tickTime * 1000);
        return () => {
          clearTimeout(gameTurnTimer)
        }
      } else {
        setWinner(enemyHP < 1 ? chosenPokemon : enemyPokemon);
        setLoser(enemyHP < 1 ? enemyPokemon : chosenPokemon);
        setGameState("gameOver");
        setTurn(null);
      }
    }
  }, [turn])

  useEffect(() => {
    if (gameState === "gameOver") {
      console.log(loser);
      fetch(`http://127.0.0.1:4000/api/pokemon/${loser.id}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
      })
    }
  }, [gameState])

  function gameTurn() {
    if (turn === "enemy") {
      setUserHP(userHP - Math.floor(((((2 / 5 + 2) * enemyPokemon.stats[1].base_stat * 60 / chosenPokemon.stats[2].base_stat) / 50) + 2) * (Math.floor(Math.random() * (255 - 217 + 1)) + 217) / 255))
    } else {
      setEnemyHP(enemyHP - Math.floor(((((2 / 5 + 2) * chosenPokemon.stats[1].base_stat * 60 / enemyPokemon.stats[2].base_stat) / 50) + 2) * (Math.floor(Math.random() * (255 - 217 + 1)) + 217) / 255))
    }
  }

  function resetGame() {
    setGameState("location");
    setLocationChosen(false);
    setAreas(null);
    setEnemyPokemon(null);
    setChosenPokemon(null);
    setTurn(null);
    setWinner(null);
    setLoser(null);
  }

  function transition() {
    const transitionDiv = document.querySelector(".transition");
    transitionDiv.classList.add("transitionAnimation");
    const timer = setTimeout(() => transitionDiv.classList.remove("transitionAnimation"), 3000);
    return () => {
      clearTimeout(timer)
    }
  }

  function playNextGameState(state) {
    const timer = setTimeout(() => setGameState(state), 1200);
    transition();
    return () => {
      clearTimeout(timer)
    }
  }

  if (locations) {
    switch (gameState) {
      case "location":
        return (
          <div className="locations">
            {locations.map((loc, i) => (
              <Location key={i} location={loc} handleClick={() => { setAreas(loc.areas); setLocationChosen(true); playNextGameState("random"); }} />
            ))}
          </div>
        )
      case "random":
        if (pokemonsAvailable) {
          if (enemyPokemon && usersPokemons) {
            return (
              <div className='randomizerContainer'>
                <div className='randomizerbg'></div>
                <div className="randomizer">
                  <EnemyPokemon enemyPokemon={enemyPokemon} />
                  <div className="usersPokemons">
                    <p>Choose your pokemon!</p>
                    <div className='userPokemonContainer'>
                      {usersPokemons.map((item, i) => (
                        <UserPokemon key={i} handleClick={() => { setChosenPokemon(item); setUserHP(item.stats[0].base_stat); playNextGameState("prep") }} pokemon={item} />
                      ))}
                    </div>
                  </div>
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
        return (
          <div className='countdown'>
            <Countdown userPokemon={chosenPokemon} enemyPokemon={enemyPokemon} countdownTime={countdownTime} cb={() => { setGameState("encounter"); setTurn("enemy") }} />
          </div>
        )
      case "encounter":
        return (
          <div className='encounter'>
            <BattlePokemon pokemon={enemyPokemon} hp={enemyHP} />
            <BattlePokemon pokemon={chosenPokemon} hp={userHP} />
          </div>
        )
      case "gameOver":
        return (
          <div className='gameOver'>
            <p className={winner.name === chosenPokemon.name ? "userWon" : "enemyWon"}>{winner.name.toUpperCase()} won!</p>
            <img src={winner.sprites.front_default} alt='' />
            {winner.name === chosenPokemon.name ? (<p>{enemyPokemon.name.toUpperCase()} was captured!</p>) : null}
            <button className='gameOverButton' onClick={() => resetGame()}>Start new game</button>
          </div>
        )
      default:
        break;
    }
  }
}

export default App;
