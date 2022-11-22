async function submit() {
  var postText = document.getElementById("post-input").value;
  var pseudonym = document.getElementById("pseudonym").value;
  var password = document.getElementById("password").value;
  console.log("the form submitted: %s", postText);
  //data here stores two strings, waiting to get converted to json
  const data = { postText, pseudonym, password};
  //json options turns the strings into json
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
    console.log(result)
  } catch (err) {
    console.log(err);
  }

}
getPosts();

//function to fetch all the posts and display them in chronological order
async function getPosts(){
  const response = await fetch('/api');
  //data is a list of json objects
  const data = await response.json();
  console.log(data);
  //for every post in the database
  for (postData of data){
    console.log(postData.postText)
    const post = document.createElement('div');
    post.classList.add('post');
    const author = document.createElement('p');
    author.classList.add('author');
    author.textContent = postData.pseudonym;

    const timestamp = document.createElement('p');
    timestamp.classList.add('timestamp');
    var dateString = new Date(postData.timeStamp);
    dateString.setSeconds(0,0);
    dateString = dateString.toLocaleString();
    timestamp.textContent = dateString;
    
    const postText = document.createElement('p');
    postText.classList.add('post-text');
    postText.textContent = postData.postText;

    post.append(author,timestamp,postText)

    const feedWrapper = document.getElementById("feed-wrapper");
    feedWrapper.append(post)
    
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
