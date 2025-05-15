// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARlQfw-CeqwjhiSlLGvgm3jTXYwK82zlQ",
  authDomain: "studysync-eafe3.firebaseapp.com",
  projectId: "studysync-eafe3",
  storageBucket: "studysync-eafe3.appspot.com",
  messagingSenderId: "346639445784",
  appId: "1:346639445784:web:7ae618d34d5bc731a6f86d"
};

// Initialize Firebase app, Firestore and Auth
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Get form element
const createForm = document.getElementById("create-form");

createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Check user login status
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Get form values
      const topic = document.getElementById("topic").value.trim();
      const invites = document.getElementById("invites").value.trim();
      const slot = document.getElementById("slot").value;

      // Simple validation
      if (!topic || !invites || !slot) {
        alert("Please fill in all fields.");
        return;
      }

      try {
        // Save session data to Firestore
        await addDoc(collection(db, "sessions"), {
          topic: topic,
          invites: invites.split(",").map(email => email.trim()),
          slot: slot,
          createdBy: user.uid,
          createdAt: new Date()
        });

        alert("Session created successfully!");
        createForm.reset();

        // Redirect to sessions page or dashboard if needed
        // window.location.href = "session.html";
      } catch (error) {
        alert("Error creating session: " + error.message);
      }
    } else {
      alert("You must be logged in to create a session.");
      window.location.href = "login.html";
    }
  });
});
