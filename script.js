// global variables
let username = null;   // name of the user

// function that gets the namoe from input text on class login

function getUserName() {
    username = document.querySelector('.login input').value;    
    console.log(username);
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.body-container').style.display = 'block';
}
