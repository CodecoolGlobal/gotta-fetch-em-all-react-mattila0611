function UserPokemon(props){
    const { pokemon, handleClick } = props;

    return (
        <div onClick={handleClick} className="userPokemon">
            <p>{pokemon.name.toUpperCase()}</p>
            <img src={pokemon.sprites.front_default} alt=""/>
            <p className="UserPokemonStat">HP: {pokemon.stats[0].base_stat}</p>
            <p className="UserPokemonStat">A: {pokemon.stats[1].base_stat}</p>
            <p className="UserPokemonStat">D: {pokemon.stats[2].base_stat}</p>
        </div>
    )
}

export default UserPokemon;