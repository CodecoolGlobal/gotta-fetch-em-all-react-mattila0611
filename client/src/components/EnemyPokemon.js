function EnemyPokemon(props) {
    const enemyPokemon = props.enemyPokemon;

    return (
        <div className="enemyPokemon">

            <h1>Wild {enemyPokemon.name.toUpperCase()} appeared!</h1>
            <img src={enemyPokemon.sprites.front_default} alt="" />
            <p className="enemyPokemonStat">HP: {enemyPokemon.stats[0].base_stat}</p>
            <p className="enemyPokemonStat">Attack: {enemyPokemon.stats[1].base_stat}</p>
            <p className="enemyPokemonStat">Defense: {enemyPokemon.stats[2].base_stat}</p>
        </div>
    )
}
export default EnemyPokemon;