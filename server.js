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
app.use(express.static(__dirname+"/public"));
app.use(express.json({ limit: "10mb" }));

const database = new Datastore("database.db");
database.loadDatabase();
// database.insert({name: "baahman",status: "corbisla"})
// database.insert({name: "wooman",status: "constwan"})

app.post("/load", (request, response) => {
  const settings = request.body;
  if(settings.prevPosts != 0){
    console.log('scroll!')
  }
  console.log(settings);
  database.find({}, (err, data) => {
    if(err){
      response.end();
      return;
    }
    let posts = [];
    data.sort(function(x, y){
      return x.timeStamp -y.timeStamp;
    })
    console.log("there are:"+data.length+" posts in the db");
    //load n posts based on how many posts were previously on the page
    for (let i = data.length-settings.prevPosts;i>data.length-settings.prevPosts-settings.numPosts;i--){
      //stop appending posts after it reaches the last post
      if(i<0){
        break;
      }
      console.log(i);
      posts.push(data[i-1]);

    }
    console.log("sending "+posts.length+ " posts");
    response.json(posts);
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
