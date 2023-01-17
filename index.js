const express = require("express");
const Datastore = require("nedb");

const app = express();
const db = new Datastore("database.db");

app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public")); // host files in public folder
app.use(express.json()); // parse json response

db.loadDatabase();

app.post("/api", (request, response) => {
    console.log(request.body);
    const data = request.body;
    data.timestamp = Date.now();
    db.insert(data)
    response.json({
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: data.timestamp
    });
})
