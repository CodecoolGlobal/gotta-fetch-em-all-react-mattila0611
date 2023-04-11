import { useState, useEffect } from "react";
import UserPokemon from "./UserPokemon";

const usersPokemon = [
    1,6,61
];

function RandomEncounter(props) {
    const area = props.area;
    const handleClick = props.handleClick;

    const [enemyPokemon, setEnemyPokemon] = useState(null);
    const [usersPokemons, setUsersPokemons] = useState(null);
    const [chosenPokemon, setChosenPokemon] = useState(false);

    useEffect(() => {
        const fetchPokemons = async () => {
            const resLocation = await fetch(`https://pokeapi.co/api/v2/location-area/${area}/`);
            const locationDetails = await resLocation.json();

            const fetchEnemyPokemons = locationDetails.pokemon_encounters.map(async (encounter) => {
                const res = await fetch(encounter.pokemon.url);
                const pokemon = await res.json();
                return pokemon;
            })


            Promise.all(fetchEnemyPokemons).then(resolved => setEnemyPokemon(resolved[Math.floor(Math.random() * resolved.length)]));

            const fetchUserPokemons = usersPokemon.map(async item => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${item}/`);
                const data = await res.json();
                return data;
            })

            Promise.all(fetchUserPokemons).then(resolved => setUsersPokemons(resolved));

        }
        fetchPokemons();
    }, [])

    if (enemyPokemon && usersPokemons) {
        return (
            <div className="randomizer">
                {console.log(usersPokemons)}
                <div className="enemyPokemon">

                <h1>Wild {enemyPokemon.name.toUpperCase()} appeared!</h1>
                <img src={enemyPokemon.sprites.front_default}/>
                <p className="enemyPokemonStat">HP: {enemyPokemon.stats[0].base_stat}</p>
                <p className="enemyPokemonStat">Attack: {enemyPokemon.stats[1].base_stat}</p>
                <p className="enemyPokemonStat">Defense: {enemyPokemon.stats[2].base_stat}</p>
                </div>

                <div className="usersPokemons">
                <h1>Choose your pokemon!</h1>
                {usersPokemons.map((item, i) => (
                    <UserPokemon key={i} pokemon={item}/>
                ))}
                </div>
                <button onClick={handleClick}>Continue</button>
            </div>
        )
    }
}

export default RandomEncounter;