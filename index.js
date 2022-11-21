async function submit() {
  var post = document.getElementById("post-input").value;
  var password = document.getElementById("password").value;
  console.log("the form submitted: %s", post);
  const data = { post, password };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch("/api", options);

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result)
  } catch (err) {
    console.log(err);
  }
  console.log(json);
}

var feedContents = document
  .getElementById("feed-wrapper")
  .getElementsByTagName("*");

if (!document.getElementById("feed-wrapper").matches(":hover")) {
  for (var i = 0; i < feedContents.length; i++) {
    // console.log(feedContents[i]);
    // feedContents[i].effect( "highlight", {color:"#669966"}, 3000 );
  }
}
