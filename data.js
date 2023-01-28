import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
import { getFirestore, setDoc, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBkFFG0G5Pf7kpj8Te3yL8w9b7p6XMinxs",
    authDomain: "signin-b4395.firebaseapp.com",
    databaseURL: "https://signin-b4395-default-rtdb.firebaseio.com",
    projectId: "signin-b4395",
    storageBucket: "signin-b4395.appspot.com",
    messagingSenderId: "291490998392",
    appId: "1:291490998392:web:00db15797aec1ce588658d"
};
initializeApp(firebaseConfig);
const db = getFirestore();

let userId = document.getElementById('create-acct');
let userEmail = document.getElementById('email_signup');


let readIdBtn = document.getElementById('readDataFromFirebase');
let readId = document.getElementById('display_read_data');




// get data

// collection ref
const colRef = collection(db, 'users')

// get collection data
getDocs(colRef)
    .then((snapshot) => {
        let users = []
        snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id })
        })
        readId.innerHTML = JSON.stringify(users);
        console.log(users)
    })
    .catch(err => {
        console.log(err.message)
    })

// adding data
const addUserForm = document.getElementById('create-acct')
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        email: addUserForm.email.value,
    })
        .then(() => {
            addUserForm.reset()
        })
})




// function write_db() {
//     console.log("Working");
//     var db = getDatabase();
//     var userId =document.getElementById('create-acct');
//     var create_db_table = ref(db, 'users/' + 'usersTable/');
//     var user_name = document.getElementById("email_signup").value;
//     var user_password = document.getElementById("password_signup").value;


//     if (user_name == '' || user_password == '') {
//         alert("Please fill out all fields");
//         console.log("Please fill out all fields");
//         throw "Please fill out all fields";
//     }
//     set(ref(db, '/users/' + 'usersTable/'), {
//         user_name: user_name,
//         user_name_password: user_password
//     }).then((res) => {
//         console.log();
//     })
//         .catch((err) => {
//             alert(err.message);
//             console.log(err.code);
//             console.log(err.message);
//         })
// }

// Read
// function read_db() {
//     var db = getDatabase();
//     var connect_db = ref(db, 'users/');
//     var retrieve_data = '';
//     console.log("Reading");
//     onValue(connect_db, (snapshot) => {
//         retrieve_data = snapshot.val();
//         console.log("user_name: " + retrieve_data.user_name);
//         call_loop_print(retrieve_data);
//         document.getElementById("display_read_data").innerHTML = "<pre>" + "user_name: " + retrieve_data.user_name + "</pre>" +
//             '\n' + "<pre>" + "user_name_password: " + retrieve_data.user_name_password + "</pre>";
//     })
//     function call_loop_print(retrieve_data) {
//         for (var r = 0; r < Object.entries(retrieve_data).length; r++) {
//             var key = Object.keys(retrieve_data)[r];
//             var value = retrieve_data[key];
//             console.log("Key_" + r + ': ' + key + " Value_:" + r + ': ' + value);
//         }
//     }
// }
// Call
// var write_data_to_firebase = document.getElementById("create-acct-btn");
// write_data_to_firebase.addEventListener('click', write_db);

