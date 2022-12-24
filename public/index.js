//load all posts from Database
getPosts(10,false);

//dropzone setup
Dropzone.autoDiscover = false;
var dropzoneOptions = {
  dictDefaultMessage: "🔗",
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
  var pseudonym = document.getElementById("pseudonym").value;
  var postText = document.getElementById("post-input").value;
  var password = document.getElementById("password").value;
  if(pseudonym == ""){
    document.getElementById("result").textContent="enter a pseudonym or username or something";
    document.getElementById("result").setAttribute("style","color:orange;border:0px");
    return;
  }
  if(postText == ""){
    document.getElementById("result").textContent="enter text or a link or anything";
    document.getElementById("result").setAttribute("style","color:orange;border:0px");
    return;
  }
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
    if (result == "wrong"){
      console.log(result);
      document.getElementById("result").textContent="wrong password";
      document.getElementById("result").setAttribute("style","color:red;border:0px");
    }else{
      document.getElementById("result").textContent="success";
      document.getElementById("result").setAttribute("style","color:green;border:0px");
      document.getElementById('post-input').value="";
      document.getElementById('password').value="";
      document.getElementById('pseudonym').value="";
      myDropzone.removeAllFiles();
    }
  } catch (err) {
    console.log(err);
  }
  getPosts(10,false);
}

//function to fetch and reload all the posts and display them in chronological order
async function getPosts(numPosts,scrolled) {

  const feedWrapper = document.getElementById("feed-wrapper");
  //on fresh page load or new post, reload most recent posts
  if (!scrolled){
    //delete all the currently rendered posts
    removeAllChildNodes(feedWrapper);
    removeAllChildNodes(document.getElementById('hotlink'));
  }
  //store the current # of posts rendered on page (0 unless scroll-loaded)
  const prevPosts = document.getElementsByClassName("post").length;
  console.log(prevPosts);
//in the get request, specify how many posts to request (use the current amount of div elements as the index start)
  const settings = {numPosts,prevPosts};
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  };
  const response = await fetch("/load",options);
  //data is a list of json objects
  const data = await response.json();
  //for every post in the database
  // data.sort(function(x, y){
  //   return y.timeStamp - x.timeStamp;
  // })
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
    post.append(author, timestamp, postText);
    //make abbreveiated version of posttext to put in menu
    const abbrevPostText = postData.postText.slice(0,18);
    post.setAttribute("id",abbrevPostText);
    let hotLink = document.createElement("a");
    hotLink.textContent = abbrevPostText+"...";
    hotLink.setAttribute("href","#"+abbrevPostText);
    document.getElementById('hotlink').append(hotLink);
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

window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page
      getPosts(10,true);
  }
};
