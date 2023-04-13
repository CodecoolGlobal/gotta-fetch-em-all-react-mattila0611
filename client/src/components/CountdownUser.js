function CountdownUser(props) {
    const { userPokemon } = props;

    return (
        <div className="countdownUser">
            <div className="countdownUserName">
                <p>{userPokemon.name.toUpperCase()}</p>
            </div>
            <img src={userPokemon.sprites.front_default} alt="" />
            <div className="countdownUserDetails">
                <p className="countdownUserPokemonStat">HP: {userPokemon.stats[0].base_stat}</p>
                <p className="countdownUserPokemonStat">A: {userPokemon.stats[1].base_stat}</p>
                <p className="countdownUserPokemonStat">D: {userPokemon.stats[2].base_stat}</p>
            </div>
        </div>
    )
}
export default CountdownUser;