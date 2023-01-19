
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

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
// const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
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
    // confirmSignUpPassword = confirmSignUpPasswordIn.value;
    // if (signupPassword ) {
    //     window.alert("Password fields do not match. Try again.")
    //     isVerified = false;
    // }

    if (signupEmail == null || confirmSignupEmail == null || signupPassword == null) {
        window.alert("Please fill out all required fields.");
        isVerified = false;
    }

    if (isVerified) {
        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                localStorage.setItem('signupEmail', JSON.stringify(user));
                // ...
                window.alert("Success! Account created.");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                window.alert("Error occurred. Try again.");
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
            // Signed in
            const user = userCredential.user;
            console.log("Success! Welcome back!");
            window.alert("Success! Welcome back!");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error occurred. Try again.");
            window.alert("Error occurred. Try again.");
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


function write_db() {
    console.log("DEBUG: Write function");
    var db = getDatabase();
    var create_db_table = ref(db, 'ESP32_DB/' + 'ESP32_User_Login_Table/');
    var user_name = document.getElementById("user_name").value;
    var user_password =  document.getElementById("user_name_password").value;
    if( user_name == '' || user_password == ''){
        alert("Make sure, must be non-empty data is required!!!");
        console.log("Make sure, must be non-empty data is required!!!");
        throw "Make sure, must be non-empty data is required!!!";
    }
    set(ref(db, 'ESP32_DB/' + 'ESP32_User_Login_Table/'), {
      user_name: user_name,
      user_name_password: user_password
    }).then((res) => {
        console.log();
    })
    .catch((err) => {
        alert(err.message);
        console.log(err.code);
        console.log(err.message);
    })
}

/***** read data from firebase *****/
function read_db() {
    var db = getDatabase();
    var connect_db = ref(db, 'ESP32_DB/' + 'ESP32_User_Login_Table/');
    var retrieve_data='';
    console.log("DEBUG: Read function");
    onValue(connect_db, (snapshot) => {
        retrieve_data = snapshot.val();
        //console.log("user_name: " + retrieve_data.user_name);
        //console.log("user_name_password: " + retrieve_data.user_name_password);
        call_loop_print(retrieve_data);
        document.getElementById("display_read_data").innerHTML =  "<pre>" + "user_name: " + retrieve_data.user_name +
                '\n' + "user_name_password: " + retrieve_data.user_name_password + "</pre>";
        })
    function call_loop_print(retrieve_data){
        for (var r=0;r<Object.entries(retrieve_data).length;r++){
            var key = Object.keys(retrieve_data)[r];
            var value = retrieve_data[key];
            console.log("Key_" + r + ': ' + key + " Value_:" + r + ': ' + value );
           }
 }
}
/***** call write data function *****/
var write_data_to_firebase = document.getElementById("write_data_to_firebase");
write_data_to_firebase.addEventListener('click', write_db);

/***** call read data function *****/
var read_data_from_firebase = document.getElementById("read_data_from_firebase");
read_data_from_firebase.addEventListener('click', read_db);

