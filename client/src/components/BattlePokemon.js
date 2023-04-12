function BattlePokemon(props) {
    const { pokemon, hp } = props;
    return (
        <div className="battlePokemon">
            <p className="battlePokemonName">{pokemon.name.toUpperCase()}</p>
            <img src={pokemon.sprites.front_default} alt=""/>
            <p className="battlePokemonHP">Health: {hp}</p>
        </div>
    )
}
export default BattlePokemon