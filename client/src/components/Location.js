function Location(props) {
    const location = props.location;
    const handleClick = props.handleClick;

    return (
        <div className="location">
            <p className="title">{location.names[location.names.length - 1].name}</p>
            <button onClick={handleClick}>CHOOSE</button>
        </div>
    )
}

export default Location;