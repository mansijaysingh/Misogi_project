// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCiUyJlPJ072mJl3aqOZqSLUVecPfZDUW4",
  authDomain: "studysync-7058f.firebaseapp.com",
  projectId: "studysync-7058f",
  storageBucket: "studysync-7058f.firebasestorage.app",
  messagingSenderId: "693083859673",
  appId: "1:693083859673:web:a7009c6d3a0f842bca2cc8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.querySelector("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Login successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});
