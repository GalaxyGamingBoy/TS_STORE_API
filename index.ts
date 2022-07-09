import settings from "./settings.json"

const express = require("express");
const webApp = express();

webApp.get("/", (req, res) => {
    res.status(418).end("I am a teapot!");
})

webApp.listen(settings["server"]["port"], () => {
    console.log(`API on Port: ${settings["server"]["port"]}`);
})