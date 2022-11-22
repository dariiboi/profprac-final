async function submit() {
  var content = document.getElementById("post-input").value;
  var password = document.getElementById("password").value;
  console.log("the form submitted: %s", content);
  //data here stores two strings, waiting to get converted to json
  const data = { content, password};
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
