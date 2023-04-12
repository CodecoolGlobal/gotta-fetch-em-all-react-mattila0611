function CountdownEnemy(props) {
    const { enemyPokemon } = props;

    return (
        <div className="countdownEnemy">
            <p className="countdownEnemyName">{enemyPokemon.name.toUpperCase()}</p>
            <img src={enemyPokemon.sprites.front_default} alt=""/>
            <p className="countdownEnemyPokemonStat">HP: {enemyPokemon.stats[0].base_stat}</p>
            <p className="countdownEnemyPokemonStat">A: {enemyPokemon.stats[1].base_stat}</p>
            <p className="countdownEnemyPokemonStat">D: {enemyPokemon.stats[2].base_stat}</p>
        </div>
    )
}
export default CountdownEnemy;