function UserBattlePokemon(props) {
    const { pokemon, hp } = props;
    return (
        <div className="userBattlePokemon">
            <p className="battlePokemonName">{pokemon.name.toUpperCase()}</p>
            <p className="battlePokemonHP">Health: {hp}</p>
            <img className="userBattlePokemonImg" src={pokemon.sprites.back_default} alt=""/>
        </div>
    )
}
export default UserBattlePokemon