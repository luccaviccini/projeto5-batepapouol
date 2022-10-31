// ----*----*----*----*----START of global variables ----*----*----*----*----*----* \\
// get messages
const urlMessages = "https://mock-api.driven.com.br/api/v6/uol/messages";
// checks if user is online
const urlStatus = "https://mock-api.driven.com.br/api/v6/uol/status";
// sends name to api
const urlName = "https://mock-api.driven.com.br/api/v6/uol/participants";
// query selector to key elements
let currentUser;
let onlineLoop, loopGetsMessage;
let msgsArray = [];
let message;
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
  document.querySelector(".login").style.display = "none";
  document.querySelector(".body-container").style.display = "block";
  getsMessages();
  loopGetsMessage = setInterval(getsMessages, 3000);
  onlineLoop = setInterval(stayOnline, 3000);
}


function addUserFail(error) {
  console.log(error.response.status);
  if (error.response.status === 400) {
    alert("Username já cadastrado!");
    //reload window
    window.location.reload();
  } else {
    alert("Erro desconhecido!");
  }
}

function stayOnline(){
  
  const promisse = axios.post(urlStatus, {name:currentUser});
  promisse.then(stayOnlineOK);
  promisse.catch(stayOnlineFail);
}

const stayOnlineOK = (connectionOK) => {return};
const stayOnlineFail = (connectionFail) => {
  console.log(connectionFail.status);
  alert("Conexão perdida, recarregue a página");
};

function sendMessage(){
  message = document.querySelector("footer input");
  const promisse = axios(
    {method:'POST', 
    url:urlMessages, 
    data: {from: currentUser, to: "Todos", text: message.value, type: "message"}});
  
  promisse.then(getsMessages);
  promisse.catch(sendMessageFail);
  message.value = "";
}


function getsMessages(){
  
  const promisse = axios({method:'GET', url:urlMessages});
  promisse.then(getsMessagesOK);
  promisse.catch(getsMessagesFail);
}

function sendMessageFail(error){
  console.log(error.response.status);
}

function getsMessagesOK(msgGET){
  let chat = document.querySelector("ul");
  chat.innerHTML = "";
  msgsArray = msgGET.data;
  msgsArray.forEach(msg => {
    if(msg.type === "status"){
      
      chat.innerHTML += `
      <li class="status">
      <p>
        <span class="time">(${msg.time})&nbsp</span>
        <span class="from">${msg.from}&nbsp</span>
      ${msg.text}
      </p>
      </li>`;
    } 
    else if(msg.type === "message"){
      chat.innerHTML += 
      `<li class="message">
        <p>
          <span class="time">(${msg.time})&nbsp</span>
          <span class="from">${msg.from}&nbsp</span>
          para 
          <span class="to">${msg.to}:&nbsp</span>
          ${msg.text}
        </p>
      </li>`;
    }
    else{
      chat.innerHTML += `<li class="private-message">
      <p>
        <span class="time">(${msg.time}) &nbsp</span>
        <span class="from">${msg.from}&nbsp</span>
        reservadamente para&nbsp
        <span class="to">${msg.to}:&nbsp</span>
        ${msg.text}
      </p>
      </li>`;      
    }  

    
  // scroll into view
  chat.lastChild.scrollIntoView();
  });
}

function getsMessagesFail(error){
  console.log(error);
}