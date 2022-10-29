// ----*----*----*----*----START of global variables ----*----*----*----*----*----* \\
// get messages
const urlMessages = "https://mock-api.driven.com.br/api/v6/uol/messages";
// checks if user is online
const urlStatus = "https://mock-api.driven.com.br/api/v6/uol/status";
// sends name to api
const urlName = "https://mock-api.driven.com.br/api/v6/uol/participants";
// query selector to key elements
let currentUser = null;

// ----*----*----*----*----END of global variables ----*----*----*----*----*----* \\

// function that is called when "Entrar" button is pressed
function btLogin() {
  currentUser = document.querySelector(".login input").value;
  addUser(currentUser);
}

function addUser(currentUser) {
  const promisse = axios({
    method: "POST",
    url: urlName,
    data: { name: currentUser },
  });
  promisse.then((response) => {
    console.log(currentUser);
    console.log(response.data);
    console.log("--------- addUser -----------");
    getUsers();
    getMessages();
    document.querySelector(".login").style.display = "none";
    document.querySelector(".body-container").style.display = "block";
  });
  promisse.catch((error) => {
    //console.log("Status code: " + error.response.status);
  });
}

function getUsers() {
  const promisse = axios({ method: "GET", url: urlName });
  promisse.then((response) => {
    console.log(response.data);
    console.log("--------- getUsers -----------");
  });
  promisse.catch((error) => {
    console.log(error);
  });
}

function getMessages() {
  const promisse = axios({ method: "GET", url: urlMessages });
  promisse.then((response) => {
    console.log(response.data);
    response.data.forEach((msg) => {
      console.log(msg);
    });
    console.log("--------- getMessages -----------");
  });
  promisse.catch((error) => {
    console.log(error);
  });
}
// function that adds text from footer input and adds it to ul as li
function addMessage() {
  // getting message from user
  const message = document.querySelector("footer input").value;
  // create element li to add to ul
  const li = document.createElement("li");

  // create elent span with class username
  const span = document.createElement("span");
  span.classList.add("username");
  span.innerHTML = currentUser;
  li.appendChild(span);

  // create element span with class message
  const span2 = document.createElement("span");
  span2.innerHTML = message;
  span2.classList.add("message");
  li.appendChild(span2);

  // add li to ul
  document.querySelector("ul").appendChild(li);

  // clear input
  document.querySelector("footer input").value = "";
}
