import './App.css';
import "./fonts/PokemonFont.ttf";
import "./fonts/Ketchum.otf";
import ashImage from "./images/ash.png";
import pokeballImage from "./images/pokeball.png";
import openPokeballImage from "./images/open_pokeball.png";
import ashCryingImage from "./images/ash_crying.png";
import tombstoneImage from "./images/rip.png";
import Location from "./components/Location";
import UserPokemon from './components/UserPokemon';
import EnemyPokemon from './components/EnemyPokemon';
import Countdown from './components/Countdown';
import UserBattlePokemon from "./components/UserBattlePokemon";
import EnemyBattlePokemon from './components/EnemyBattlePokemon';

import { useEffect, useState } from "react";

const tickTime = 1.5;
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

  async function fetchPokemons() {
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
    fetchPokemons();
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
          clearTimeout(gameTurnTimer);
        }
      } else {
        enemyHP < 0 ? setEnemyHP(0) : setUserHP(0);
        setWinner(enemyHP < 1 ? chosenPokemon : enemyPokemon);
        setLoser(enemyHP < 1 ? enemyPokemon : chosenPokemon);
        playNextGameState("gameOver");
        setTurn(null);
      }
    }
  }, [turn])

  useEffect(() => {
    if (gameState === "gameOver") {
      fetch(`http://127.0.0.1:4000/api/pokemon/${loser.id}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
      })
    }
    if (gameState === "location") {
      fetchPokemons();
    }
  }, [gameState])

  function gameTurn() {
    if (turn === "enemy") {
      document.querySelector(".enemyBattlePokemon").classList.add("enemyPokemonAttack");
      setUserHP(userHP - Math.floor(((((2 / 5 + 2) * enemyPokemon.stats[1].base_stat * 60 / chosenPokemon.stats[2].base_stat) / 50) + 2) * (Math.floor(Math.random() * (255 - 217 + 1)) + 217) / 255))
      const attackTimer = setTimeout(() => document.querySelector(".enemyBattlePokemon").classList.remove("enemyPokemonAttack"), 1000);
      return () => {
        clearTimeout(attackTimer);
      }
    } else {
      document.querySelector(".userBattlePokemon").classList.add("userPokemonAttack");
      setEnemyHP(enemyHP - Math.floor(((((2 / 5 + 2) * chosenPokemon.stats[1].base_stat * 60 / enemyPokemon.stats[2].base_stat) / 50) + 2) * (Math.floor(Math.random() * (255 - 217 + 1)) + 217) / 255))
      const attackTimer = setTimeout(() => document.querySelector(".userBattlePokemon").classList.remove("userPokemonAttack"), 1000);
      return () => {
        clearTimeout(attackTimer);
      }
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
              <button onClick={() => { playNextGameState("location"); setLocationChosen(false) }}>Go back</button>
            </div>
          )
        }
      case "prep":
        return (
          <div className='countdown'>
            <Countdown userPokemon={chosenPokemon} enemyPokemon={enemyPokemon} countdownTime={countdownTime} cb={() => { playNextGameState("encounter"); setTurn("enemy") }} />
          </div>
        )
      case "encounter":
        return (
          <div className='encounter'>
            <div className='encounterbg'></div>
            <EnemyBattlePokemon pokemon={enemyPokemon} hp={enemyHP} />
            <UserBattlePokemon pokemon={chosenPokemon} hp={userHP} />
          </div>
        )
      case "gameOver":
        return (
          <div className='gameOver'>
            <div className='gameOverbg'></div>
            {winner.name === chosenPokemon.name ? (
              <div className='gameOverWin'>
                <div className='gameOverMessages'>
                  <p className="userWon">{winner.name.toUpperCase()} won!</p>
                  <p>{enemyPokemon.name.toUpperCase()} was captured!</p>
                </div>
                <img className='loserPokemon' src={enemyPokemon.sprites.front_default} alt='' />
                <div className='ash'>
                  <img className='ashImage' src={ashImage} alt='' />
                  <img className='pokeball' src={pokeballImage} alt="" />
                </div>
                <img className='openPokeballImage' src={openPokeballImage} alt='' />
                <button className='gameOverButton' onClick={() => resetGame()}>Start new game</button>
              </div>
            ) : (
              <div className='gameOverLose'>
                <div className='gameOverMessagesLose'>
                  <p className="enemyWon">{winner.name.toUpperCase()} won!</p>
                  <p>{chosenPokemon.name.toUpperCase()} suffered a horrible death!</p>
                </div>
                <img className='loserPokemonLose' src={chosenPokemon.sprites.front_default} alt='' />
                <img className='ashCryingImage' src={ashCryingImage} alt='' />
                <img className='tombstone' src={tombstoneImage} alt=''/>
                <button className='gameOverButton' onClick={() => resetGame()}>Start new game</button>
              </div>
            )}
          </div>
        )
      default:
        break;
    }
  }
}

export default App;
