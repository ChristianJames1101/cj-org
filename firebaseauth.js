// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCV3pL1eece0iwDNK4lJrMrNl0-qsDHCQk",
  authDomain: "docureq-a7e0c.firebaseapp.com",
  databaseURL: "https://docureq-a7e0c-default-rtdb.firebaseio.com",
  projectId: "docureq-a7e0c",
  storageBucket: "docureq-a7e0c.appspot.com",
  messagingSenderId: "790280304492",
  appId: "1:790280304492:web:e3c26395315b1a9a876549"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const reset = document.getElementById("reset"); 
reset.addEventListener("click", function(event){ 
event.preventDefault()

const email = document.getElementById("email").value;
sendPasswordResetEmail(auth, email)
    .then(() => {
        showAlert("Reset Password Email sent!", "success");
    })
    .catch((error) => {
        showAlert(error.message, "danger");
    });
  })

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function() {
    messageDiv.style.opacity = 0;
  }, 5000);
}

document.addEventListener('DOMContentLoaded', (event) => {
  const signUpButton = document.getElementById('submitSignUp');
  signUpButton.addEventListener('click', (event) => {
    event.preventDefault();
    const lastname = document.getElementById('lname').value;
    const firstname = document.getElementById('fname').value;
    const middlename = document.getElementById('mname').value;
    const birthdate = document.getElementById('Bdate').value;
    const address = document.getElementById('rAddress').value;
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: email,
          lastname: lastname,
          firstname: firstname,
          middlename: middlename,
          birthdate: birthdate,
          address: address
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef = doc(db, "users", user.uid);
        return setDoc(docRef, userData);
      })
      .then(() => {
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        showMessage('Unable to create user', 'signUpMessage');
      });
  });

  const signInButton = document.getElementById('submitSignIn');
  signInButton.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showMessage('Login successful', 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'mainform.html';
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
          showMessage('Incorrect Email or Password', 'signInMessage');
        } else {
          showMessage('Account does not exist', 'signInMessage');
        }
      });
  });
});

  function showAlert(message, type) {
    const alertContainer = document.getElementById("alertContainer");
    const alertElement = document.createElement("div");
    alertElement.classList.add("alert", `alert-${type}`);
    alertElement.textContent = message;
    alertContainer.appendChild(alertElement);

    setTimeout(() => {
        alertElement.remove();
    }, 3000);
  }