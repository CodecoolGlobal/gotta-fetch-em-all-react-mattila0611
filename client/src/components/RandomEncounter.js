import { useState, useEffect } from "react";

function RandomEncounter(props) {
    const location = props.location;
    const handleClick = props.handleClick;

    const [enemyPokemon, setEnemyPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            const resLocation = await fetch(`https://pokeapi.co/api/v2/location-area/${location}/`);
            const locationDetails = await resLocation.json();

            const result = locationDetails.pokemon_encounters.map(async (encounter) => {
                const res = await fetch(encounter.pokemon.url);
                const pokemon = await res.json();
                return pokemon;
            })

            Promise.all(result).then(resolved => setEnemyPokemon(resolved[Math.floor(Math.random() * resolved.length)]));
        }
        fetchPokemons();
    }, [])

    if (enemyPokemon) {
        return (
            <div className="randomizer">
                {console.log(enemyPokemon)}
                <div className="enemyPokemon">

                <h1>Wild {enemyPokemon.name.toUpperCase()} appeared!</h1>
                <img src={enemyPokemon.sprites.front_default}/>
                <p className="pokemonStat">HP: {enemyPokemon.stats[0].base_stat}</p>
                <p className="pokemonStat">Attack: {enemyPokemon.stats[1].base_stat}</p>
                <p className="pokemonStat">Defense: {enemyPokemon.stats[2].base_stat}</p>
                </div>

                <div className="usersPokemons">
                <h1>Choose your pokemon!</h1>
                </div>
                <button onClick={handleClick}>Continue</button>
            </div>
        )
    }
}

export default RandomEncounter;