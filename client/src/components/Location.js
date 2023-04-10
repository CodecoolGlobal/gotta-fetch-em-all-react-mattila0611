import { useState, useEffect } from "react";

function Location(props) {
    const id = props.id;

    const [name, setName] = useState(null);
    const [encounters, setEncounters] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/location/${id}/`)
        .then(res => res.json())
        .then(data => setName(data.names[data.names.length - 1].name));
        fetch(`https://pokeapi.co/api/v2/location-area/${id}/`)
        .then(res => res.json())
        .then(data => setEncounters(data.pokemon_encounters));
    },[])

    if(name && encounters){
        return (
            <div className="location">
                <p className="title">{name}</p>
                <button onClick={() => console.log(encounters)}>CHOOSE</button>
            </div>
        )
    } else return;
}

export default Location;