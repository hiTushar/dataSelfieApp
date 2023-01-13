const express = require("express");
const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public")); // host files in public folder
app.use(express.json()); // parse json response
app.post("/api", (request, response) => {
    console.log(request.body);
    const data = request.body;
    response.json({
        latitude: data.latitude,
        longitude: data.longitude
    });
})
