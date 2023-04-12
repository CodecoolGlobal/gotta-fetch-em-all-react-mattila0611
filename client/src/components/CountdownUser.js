function CountdownUser(props) {
    const { userPokemon } = props;

    return (
        <div className="countdownUser">
            <p className="countdownUserName">{userPokemon.name.toUpperCase()}</p>
            <img src={userPokemon.sprites.front_default} alt=""/>
            <p className="countdownUserPokemonStat">HP: {userPokemon.stats[0].base_stat}</p>
            <p className="countdownUserPokemonStat">A: {userPokemon.stats[1].base_stat}</p>
            <p className="countdownUserPokemonStat">D: {userPokemon.stats[2].base_stat}</p>
        </div>
    )
}
export default CountdownUser;