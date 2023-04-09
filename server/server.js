const express = require("express");
const app = express();

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

app.listen(4000, () => console.log("port 4000"));