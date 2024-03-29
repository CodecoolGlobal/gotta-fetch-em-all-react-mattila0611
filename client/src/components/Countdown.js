import CountdownUser from "./CountdownUser";
import CountdownEnemy from "./CountdownEnemy";
import { useEffect, useState } from "react";

function Countdown(props) {
    const { countdownTime, cb, userPokemon, enemyPokemon } = props;

    const [counter, setCounter] = useState(countdownTime);

    useEffect(() => {
        if (counter > 0) {
            const timeout = setTimeout(() => setCounter(counter - 1), 1000);
            return () => {
                clearTimeout(timeout)
            }
        } else {
            cb();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter])

    return (
        <div className="countdownContainer">
            <div className="countdownbg"><div></div></div>
            <CountdownEnemy enemyPokemon={enemyPokemon} />
            <CountdownUser userPokemon={userPokemon} />
            <div className="countdownTimer">
                <p>{counter}</p>
            </div>
        </div>
    )
}
export default Countdown;