// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyARlQfw-CeqwjhiSlLGvgm3jTXYwK82zlQ",
  authDomain: "studysync-eafe3.firebaseapp.com",
  projectId: "studysync-eafe3",
  storageBucket: "studysync-eafe3.firebasestorage.app",
  messagingSenderId: "346639445784",
  appId: "1:346639445784:web:7ae618d34d5bc731a6f86d"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    const displayName = user.displayName || user.email;
    const nameElement = document.getElementById("user-name");
    if (nameElement) {
      nameElement.textContent = displayName;
    }
  } else {
    // Redirect to login if not logged in
    window.location.href = "login.html";
  }
});

// ✅ Logout Handling (for <a class="logout-link">)
const logoutLink = document.querySelector(".logout-link");
if (logoutLink) {
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        alert("Logged out successfully");
        window.location.href = "login.html";
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
  });
}

