const express = require("express");
const fs = require("fs")
const Datastore = require("nedb");

const app = express();
const db = new Datastore("database.db");

app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public")); // host files in public folder
app.use(express.json({ limit: "1mb" })); // parse json response

db.loadDatabase();

app.post("/api", (request, response) => {
  console.log(request.body);
  const data = request.body;
  data.timestamp = Date.now();
  data.image_file = `image_${data.timestamp}.png`;
  const base64Data = data.image64.replace(/^data:image\/png;base64,/, "");
  fs.writeFileSync(`public/images/${data.image_file}`, base64Data, "base64");
  delete data.image64;
  db.insert(data)
  response.json(data);
})

app.get("/all", (request, response) => {
  db.find({}, (err, docs) => {
    if (err) {
      response.end();
    }
    else {
      response.json(docs);
    }
  })
})