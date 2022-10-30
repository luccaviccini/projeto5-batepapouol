// ----*----*----*----*----START of global variables ----*----*----*----*----*----* \\
// get messages
const urlMessages = "https://mock-api.driven.com.br/api/v6/uol/messages";
// checks if user is online
const urlStatus = "https://mock-api.driven.com.br/api/v6/uol/status";
// sends name to api
const urlName = "https://mock-api.driven.com.br/api/v6/uol/participants";
// query selector to key elements
let currentUser;
let onlineLoop;
// ----*----*----*----*----END of global variables ----*----*----*----*----*----* \\

// function that is called when "Entrar" button is pressed
function btLogin() {
  currentUser = document.querySelector(".login input").value;
  addUser();
}

function addUser() {
  // already adds
  const promisse = axios({method: "POST", url: urlName, data: { name: currentUser }});
  promisse.then(addUserOK);
  promisse.catch(addUserFail);
}

function addUserOK(response) {
  console.log(response);
  document.querySelector(".login").style.display = "none";
  document.querySelector(".body-container").style.display = "block";
  onlineLoop = setInterval(stayOnline, 3000);
}


function addUserFail(error) {
  console.log(error.response.status);
  if (error.response.status === 400) {
    alert("Username já cadastrado!");
    addUser(currentUser);
  } else {
    alert("Erro desconhecido!");
  }
}

function stayOnline(){
  
  const promisse = axios.post(urlStatus, {name:currentUser});
  promisse.then(stayOnlineOK);
  promisse.catch(stayOnlineFail);
}

const stayOnlineOK = (connectionOK) => {console.log(connectionOK.status)};
const stayOnlineFail = (connectionFail) => {
  console.log(connectionFail.status);
  alert("Conexão perdida, recarregue a página");
};

function sendMessage(){
  const message = document.querySelector("footer input").value;
  const promisse = axios(
    {method:'POST', 
    url:urlMessages, 
    data: {from: currentUser, to: "Todos", text: message, type: "message"}});
  promisse.then(getsMessages);
  promisse.catch(sendMessageFail);
}


function getsMessages(){
  const promisse = axios({method:'GET', url:urlMessages});
  promisse.then(getsMessagesOK);
  promisse.catch(getsMessagesFail);
}

function sendMessageFail(error){
  console.log(error.response.status);
}

function getsMessagesOK(allmessages){
  console.log(allmessages);
}

function getsMessagesFail(error){
  console.log(error);
}