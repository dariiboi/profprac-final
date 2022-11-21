const express = require("express");
const Datastore = require("nedb");
const app = express();

var server = app.listen(8080, () => {
  var port = server.address().port;
  console.log("Server started at http://localhost:%s", port);
});
app.use(express.static("index.html"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();
// database.insert({name: "baahman",status: "corbisla"})
// database.insert({name: "wooman",status: "constwan"})


app.post("/api", (request, response) => {
  console.log("I got a request!");
  console.log(request.body);
  const data = request.body;
  response.json({
    status: "success",
    latitude: data.lat,
    longitude: data.lon,
  });
});
