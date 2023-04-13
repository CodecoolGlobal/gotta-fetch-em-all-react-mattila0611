const express = require("express");
const app = express();
const fs = require('fs');
const usersPokemonsRoute = 'pokemon.json';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req,res) => {
    res.send("Hello World");
})

app.get("/api/pokemon", (req,res) => {
    const usersPokemons = JSON.parse(fs.readFileSync(usersPokemonsRoute, "utf-8"));
    res.json(usersPokemons)
})

app.post("/api/pokemon/:id", (req,res) => {
    const id = parseInt(req.params.id);
    let pokemons = JSON.parse(fs.readFileSync(usersPokemonsRoute, "utf-8"));
    if (!pokemons.pokemons.includes(id)){
        pokemons.pokemons.push(id)
        fs.writeFileSync(usersPokemonsRoute, JSON.stringify(pokemons))
    }
    res.sendStatus(201)
})

app.listen(4000, () => console.log("port 4000"));