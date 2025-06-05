import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import fetch from "node-fetch";

// 🔐 Replace these
const TELEGRAM_BOT_TOKEN = "8186861154:AAHCJHIx-rTwEgDSgHZuVnqrjqlJk2FwreM";
const TELEGRAM_CHAT_ID = "786298139";

// 🔥 Firebase config (from firebase.js)
const firebaseConfig = {
  apiKey: "AIzaSyAxQrBcBN5QvRboxBKkALwMkh6vHlGP6xY",
  authDomain: "gf-complaint-portal.firebaseapp.com",
  projectId: "gf-complaint-portal",
  storageBucket: "gf-complaint-portal.firebasestorage.app",
  messagingSenderId: "502042294584",
  appId: "1:502042294584:web:01ed077efb98620842a9cd"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 👀 Listen for new complaints
const complaintsRef = collection(db, "complaints");
const q = query(complaintsRef, orderBy("timestamp", "desc"));

let lastNotifiedId = null;

onSnapshot(q, (snapshot) => {
  const latestDoc = snapshot.docs[0];
  if (!latestDoc) return;

  const data = latestDoc.data();
  const id = latestDoc.id;

  // Prevent duplicate sends
  if (id === lastNotifiedId) return;
  lastNotifiedId = id;

  const message = `📝 New Complaint!\n\nMood: ${data.mood || "N/A"}\nType: ${data.type}\n\n"${data.complaint}"`;

  // 🚀 Send to Telegram
  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    }),
  }).then((res) => res.json()).then((res) => {
    if (res.ok) console.log("✅ Telegram message sent");
    else console.error("❌ Telegram error:", res);
  });
});
