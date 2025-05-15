// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyARlQfw-CeqwjhiSlLGvgm3jTXYwK82zlQ",
  authDomain: "studysync-eafe3.firebaseapp.com",
  projectId: "studysync-eafe3",
  storageBucket: "studysync-eafe3.appspot.com",
  messagingSenderId: "346639445784",
  appId: "1:346639445784:web:7ae618d34d5bc731a6f86d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Form Handling
const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullName = document.getElementById('full-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Password match check
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (!fullName) {
    alert("Please enter your full name");
    return;
  }

  try {
    // Signup user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with displayName
    await updateProfile(user, {
      displayName: fullName
    });

    alert('Signup successful!');
    window.location.href = 'login.html';
  } catch (error) {
    alert(error.message);
  }
});

