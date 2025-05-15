 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyARlQfw-CeqwjhiSlLGvgm3jTXYwK82zlQ",
    authDomain: "studysync-eafe3.firebaseapp.com",
    projectId: "studysync-eafe3",
    storageBucket: "studysync-eafe3.firebasestorage.app",
    messagingSenderId: "346639445784",
    appId: "1:346639445784:web:7ae618d34d5bc731a6f86d"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Login successful!");
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });