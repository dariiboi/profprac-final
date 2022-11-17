

function submit() 
{
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