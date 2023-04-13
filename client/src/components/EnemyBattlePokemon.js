function EnemyBattlePokemon(props) {
    const { pokemon, hp } = props;
    return (
        <div className="enemyBattlePokemon">
            <p className="battlePokemonName">{pokemon.name.toUpperCase()}</p>
            <p className="battlePokemonHP">Health: {hp}</p>
            <img src={pokemon.sprites.front_default} alt=""/>
        </div>
    )
}
export default EnemyBattlePokemon