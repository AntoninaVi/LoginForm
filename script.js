
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";



const firebaseConfig = {
    apiKey: "AIzaSyBkFFG0G5Pf7kpj8Te3yL8w9b7p6XMinxs",
    authDomain: "signin-b4395.firebaseapp.com",
    databaseURL: "https://signin-b4395-default-rtdb.firebaseio.com",
    projectId: "signin-b4395",
    storageBucket: "signin-b4395.appspot.com",
    messagingSenderId: "291490998392",
    appId: "1:291490998392:web:00db15797aec1ce588658d"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct")

const signupEmailIn = document.getElementById("email_signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
<<<<<<< HEAD
const signupPasswordIn = document.getElementById("password_signup");
=======
const signupPasswordIn = document.getElementById("password-signup");
>>>>>>> a4d9a3858b1f4ed978e064998fb7d48d659a214b
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail;



createacctbtn.addEventListener("click", function () {
    var isVerified = true;

    signupEmail = signupEmailIn.value;
    confirmSignupEmail = confirmSignupEmailIn.value;
    if (signupEmail != confirmSignupEmail) {
        window.alert("Email fields do not match. Try again.")
        isVerified = false;
    }

    signupPassword = signupPasswordIn.value;
    if (signupEmail == null || confirmSignupEmail == null || signupPassword == null) {
        window.alert("Please fill out all fields.");
        isVerified = false;
    }

    if (isVerified) {
        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            .then((userCredential) => {
              // Sign up 
                const user = userCredential.user;
                localStorage.setItem('signupEmail', JSON.stringify(user));

                window.alert("Signed up!");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                window.alert("Try again.");
            });
    }
});

submitButton.addEventListener("click", function () {
    email = emailInput.value;
    console.log(email);
    password = passwordInput.value;
    console.log(password);

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Sign in
            const user = userCredential.user;
            console.log("Welcome back!");
            window.alert("Welcome back!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Try again.");
            window.alert("Try again.");
        });
});

signupButton.addEventListener("click", function () {
    main.style.display = "none";
    createacct.style.display = "block";
});

returnBtn.addEventListener("click", function () {
    main.style.display = "block";
    createacct.style.display = "none";
});
<<<<<<< HEAD
=======

>>>>>>> a4d9a3858b1f4ed978e064998fb7d48d659a214b
