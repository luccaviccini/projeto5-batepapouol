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
    console.log(response.data[0]);
    console.log("--------- getMessages -----------");
  });
  promisse.catch((error) => {
    console.log(error);
  });
}
