const { response } = require("express");
const express = require("express");
const { request } = require("http");
const Datastore = require("nedb");
const app = express();
const PASSWORD = "billy123";
// const { Dropzone } = require("dropzone");

// let myDropzone = new Dropzone("#post-input");
// myDropzone.on("addedfile", file => {
//   console.log(`File added: ${file.name}`);
// });

var server = app.listen(8080, () => {
  var port = server.address().port;
  console.log("Server started at http://localhost:%s", port);
});
app.use(express.static("public"));
app.use(express.json({ limit: "10mb" }));

const database = new Datastore("database.db");
database.loadDatabase();
// database.insert({name: "baahman",status: "corbisla"})
// database.insert({name: "wooman",status: "constwan"})

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if(err){
      response.end();
      return;
    }
    response.json(data);
  });

});

app.post("/api", (request, response) => {
  console.log("I got a request!");
  console.log(request.body);
  const data = request.body;
  if (data.password != PASSWORD){
    response.json("wrong");
  }else{
    const timeStamp = Date.now();
    data.timeStamp = timeStamp;
    //insert the data received into database.db, with timestamp
    database.insert(data); 
    response.json(data);
  }

});
