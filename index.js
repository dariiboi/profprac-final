

function submit() {
var post= document.getElementById("user-input").value;
var password= document.getElementById("password").value;
console.log('the form submitted: %s', )
const data = {post, password};
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
};
console.log(json);

}


var feedContents = document.getElementById('feed-wrapper').getElementsByTagName('*');

if (!document.getElementById('feed-wrapper').matches(':hover')) {
    
    for(var i=0; i<feedContents.length; i++) {
        // console.log(feedContents[i]);
        // feedContents[i].effect( "highlight", {color:"#669966"}, 3000 );
    }
}