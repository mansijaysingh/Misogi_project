// session.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

// Firebase config - same as tumhare project ka config
const firebaseConfig = {
  apiKey: "AIzaSyARlQfw-CeqwjhiSlLGvgm3jTXYwK82zlQ",
  authDomain: "studysync-eafe3.firebaseapp.com",
  projectId: "studysync-eafe3",
  storageBucket: "studysync-eafe3.appspot.com",
  messagingSenderId: "346639445784",
  appId: "1:346639445784:web:7ae618d34d5bc731a6f86d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// URL se session ID lo
const params = new URLSearchParams(window.location.search);
const sessionId = params.get('id');

if (!sessionId) {
  alert("Session ID missing in URL");
  window.location.href = "dashboard.html";
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Agar logged in nahi hai toh login page pe bhejo
    window.location.href = "login.html";
    return;
  }

  // Firestore se session data fetch karo
  const sessionRef = doc(db, "sessions", sessionId);
  const sessionSnap = await getDoc(sessionRef);

  if (sessionSnap.exists()) {
    const data = sessionSnap.data();

    // UI update karo with Firestore data
    const sessionInfo = document.querySelector(".session-info");
    sessionInfo.innerHTML = `
      <h2 id="session-title">${data.topic}</h2>
      <p><strong>Host:</strong> ${data.host}</p>
      <p><strong>Date:</strong> ${new Date(data.slot).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${new Date(data.slot).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
      <p><strong>Status:</strong> ${data.status || "Upcoming"}</p>
      <p><strong>Description:</strong> ${data.description || "No description provided."}</p>
    `;
  } else {
    alert("Session not found!");
    window.location.href = "dashboard.html";
  }
});

// Delete session button logic
document.querySelector(".delete-btn").addEventListener("click", async () => {
  if (confirm("Are you sure you want to delete this session?")) {
    await deleteDoc(doc(db, "sessions", sessionId));
    alert("Session deleted!");
    window.location.href = "dashboard.html";
  }
});

// Mark as completed button logic
document.querySelector(".mark-complete-btn").addEventListener("click", async () => {
  await updateDoc(doc(db, "sessions", sessionId), { status: "Completed" });
  alert("Session marked as completed");
  location.reload();
});

// Edit button kaam karwana hai toh extra form ya alag page bana sakte ho
