//load all posts from Database
getPosts();

//dropzone setup
Dropzone.autoDiscover = false;
var dropzoneOptions = {
  dictDefaultMessage: "Drop Here!",
  paramName: "file",
  maxFilesize: 2, // MB
  addRemoveLinks: true,
  autoProcessQueue: false,
};
let myDropzone = new Dropzone("#file-upload", dropzoneOptions);
myDropzone.on("addedfile", (file) => {
  console.log(`File added: ${file.name}`);
});

//submit the post to the server
async function submit() {


  var postText = document.getElementById("post-input").value;
  var pseudonym = document.getElementById("pseudonym").value;
  var password = document.getElementById("password").value;
  // var uploadedFile = document.getElementById("file-upload").files;
  console.log(myDropzone.files);
  //data here stores two strings, waiting to get converted to json

  //json options turns the strings into json
  var uploads = [];
  if (myDropzone.files.length > 0) {
    var acceptedFiles = _.filter(myDropzone.files, function (f) {
      return f.accepted;
    });
    var acceptedLen = acceptedFiles.length;

    for (var i = 0; i < acceptedLen; i++) {
      uploads.push(acceptedFiles[i]);
    }
  }else{
    uploads = [];
  }
  const data = {postText, pseudonym, password,uploads};
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch("/api", options);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
  getPosts();
}

//function to fetch and reload all the posts and display them in chronological order
async function getPosts() {
  const feedWrapper = document.getElementById("feed-wrapper");
  //delete all the currently rendered posts
  removeAllChildNodes(feedWrapper);
  const response = await fetch("/api");
  //data is a list of json objects
  const data = await response.json();
  //for every post in the database
  data.sort(function(x, y){
    return y.timeStamp - x.timeStamp;
  })
  console.log(data)
  for (postData of data) {
    //create the post wrapper div
    const post = document.createElement("div");
    post.classList.add("post");
    //create content elements within post
    const author = document.createElement("p");
    author.classList.add("author");
    const timestamp = document.createElement("p");
    timestamp.classList.add("timestamp");
    const postText = document.createElement("p");
    postText.classList.add("post-text");


    author.textContent = postData.pseudonym;
    var dateString = new Date(postData.timeStamp);
    dateString.setSeconds(0, 0);
    dateString = dateString.toLocaleString();
    timestamp.textContent = dateString;
    postText.textContent = postData.postText;
    postText.textContent = postData.postText;
    post.append(author, timestamp, postText);
    for (i of postData.uploads){

      if(String(i.dataURL).includes("data:image/") ){
        const image = document.createElement("img");
        image.classList.add("post-img");
        image.src = i.dataURL;
        post.append(image);
      }
    }
    feedWrapper.append(post);
  }
}

var columns = document.getElementsByClassName("grid-column");
for (column of columns) {
  column.classList.add("blurred");
  column.addEventListener("mouseenter", reveal);
}

function reveal(event) {
  event.target.classList.remove("blurred");
  event.target.classList.add("revealed");
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
// var feedContents = document
//   .getElementById("feed-wrapper")
//   .getElementsByTagName("*");

// if (!document.getElementById("feed-wrapper").matches(":hover")) {
//   for (var i = 0; i < feedContents.length; i++) {
//     // console.log(feedContents[i]);
//     // feedContents[i].effect( "highlight", {color:"#669966"}, 3000 );
//   }
// }
