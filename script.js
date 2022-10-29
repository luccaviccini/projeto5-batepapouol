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
  // already adds
  const promisse = axios({
    method: "POST",
    url: urlName,
    data: { name: currentUser },
  });
  promisse.then((response) => {
    console.log(currentUser);
    console.log(response.data);
    console.log("--------- addUser -----------");
    //getUsers();
    getMessages();
    document.querySelector(".login").style.display = "none";
    document.querySelector(".body-container").style.display = "block";
  });
  promisse.catch((error) => {
    //console.log("Status code: " + error.response.status);
  });
}

// function getUsers() { // for now only console.log
//   const promisse = axios({ method: "GET", url: urlName });
//   promisse.then((response) => {
//     console.log(response.data);
//     console.log("--------- getUsers -----------");
//   });
//   promisse.catch((error) => {
//     console.log(error);
//   });
// }

function getMessages() {
  const promisse = axios({ method: "GET", url: urlMessages });
  promisse.then((response) => {
    console.log(response.data);
    response.data.forEach((msg) => {
      renderMessage(msg);
    });
    console.log("--------- getMessages -----------");
  });
  promisse.catch((error) => {
    console.log(error);
  });
}
// function that adds text from footer input and adds it to ul as li
function renderMessage(msg) {
  //run the following code every 3 seconds
  setInterval(function () {
    if (msg.type === "status") {
      document.querySelector("ul").innerHTML += `<li class="message">
        <span class="time">${msg.time}</span> 
        <span class="username"> ${msg.from}</span>
        <span class="message">para</span>
        <span class="username"> ${msg.to}</span>        
        <span class="message"> ${msg.text}</span>
      </li>

  `;

      // clear input
      document.querySelector("footer input").value = "";
      let chat = document.querySelectorAll("li");
      chat[chat.length - 1].scrollIntoView();
    } else if (msg.type === "message") {
      document.querySelector("ul").innerHTML += `<li class="message">
        <span class="time">${msg.time}</span> 
        <span class="username"> ${msg.from}</span>
        <span class="message">para</span>
        <span class="username"> ${msg.to}</span>        
        <span class="message"> ${msg.text}</span>
      </li>

  `;

      // clear input
      document.querySelector("footer input").value = "";
      let chat = document.querySelectorAll("li");
      chat[chat.length - 1].scrollIntoView();
    } else {
      // privada
      document.querySelector("ul").innerHTML += `<li class="message">
        <span class="time">${msg.time}</span> 
        <span class="username"> ${msg.from}</span>
        <span class="message">para</span>
        <span class="username"> ${msg.to}</span>        
        <span class="message"> ${msg.text}</span>
      </li>

  `;

      // clear input
      document.querySelector("footer input").value = "";
      let chat = document.querySelectorAll("li");
      chat[chat.length - 1].scrollIntoView();
    }
  }, 3000);

  // getting message from user
}

function sendMessage() {
  const typedMessage = document.querySelector("footer input").value;
  const promisse = axios({
    method: "POST",
    url: urlMessages,
    data: {
      from: currentUser,
      to: "Todos",
      text: typedMessage,
      type: "message",
    },
  });
  promisse.then((response) => {
    console.log(response.data);
    console.log("--------- sendMessage -----------");
  });
  promisse.catch((error) => {
    console.log(error);
  });
}
