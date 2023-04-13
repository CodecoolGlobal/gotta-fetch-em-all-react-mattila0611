function EnemyPokemon(props) {
    const enemyPokemon = props.enemyPokemon;

    return (
        <div className="enemyPokemon">

            <p>Wild {enemyPokemon.name.toUpperCase()} appeared!</p>
            <img src={enemyPokemon.sprites.front_default} alt="" />
            <div className='enemyPokemonDetails'>
                <p className="enemyPokemonStat">HP: {enemyPokemon.stats[0].base_stat}</p>
                <p className="enemyPokemonStat">Attack: {enemyPokemon.stats[1].base_stat}</p>
                <p className="enemyPokemonStat">Defense: {enemyPokemon.stats[2].base_stat}</p>
            </div>
        </div>
    )
}
export default EnemyPokemon;