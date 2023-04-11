import { useState, useEffect } from "react";

function Location(props) {
    const id = props.id;
    const handleClick = props.handleClick;

    const [name, setName] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/location/${id}/`)
        .then(res => res.json())
        .then(data => setName(data.names[data.names.length - 1].name));
    },[])

    if(name){
        return (
            <div className="location">
                <p className="title">{name}</p>
                <button onClick={handleClick}>CHOOSE</button>
            </div>
        )
    } else return;
}

export default Location;