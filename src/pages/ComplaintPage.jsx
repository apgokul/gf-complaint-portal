import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "../context/ProfileContext";
import { NICKNAMES, COMPLAINT_TYPES, MOODS, EMOJIS } from "../constants";

function ComplaintPage() {
  const { clearProfile } = useProfile();
  const [complaint, setComplaint] = useState("");
  const [type, setType] = useState(COMPLAINT_TYPES[0]);
  const [mood, setMood] = useState(2);
  const [history, setHistory] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [nickname, setNickname] = useState("");
  const [emoji, setEmoji] = useState("");
  const navigate = useNavigate();
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
 
    setNickname(NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)]);
    setEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);

    const q = query(
      collection(db, "complaints"),
      orderBy("timestamp", "desc"),
      limit(3)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setHistory(data);
    });

    return () => unsubscribe();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!complaint.trim()) {
      alert("You forgot to complain something, cutie 😅");
      return;
    }

    try { 
    await addDoc(collection(db, "complaints"), {
      complaint,
        type,
        mood,
        timestamp: serverTimestamp(),
        secret: "MY_SECRET_KEY" // 🔐 Add your secret key here (match with Firestore rules)
    });
  setComplaint("");
      alert("Complaint submitted 💖");
    } catch (err) {
      console.error("Error submitting complaint:", err);
      alert("Oops! Something went wrong.");
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    setIsLoggingOut(true);
    setTimeout(() => {
      clearProfile();
      window.location.href = "/";
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 text-pink-900 relative px-4 py-6 pt-16">
      {/* Logout Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="text-sm bg-pink-200 hover:bg-pink-300 text-pink-800 px-3 py-1 rounded-full shadow transition"
        >
          Logout 🚪
        </button>
      </div>



      {/* Goodbye Animation */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            className="fixed inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-2xl md:text-3xl font-bold text-pink-700 mb-4 text-center">
              👋 Bye bye, {nickname} 💖
            </p>
            <div className="relative w-full h-40 overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{ y: 300, opacity: 0 }}
                  animate={{ y: -50, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2 + Math.random(),
                    delay: i * 0.1,
                    repeat: Infinity,
                  }}
                  style={{
                    left: `${Math.random() * 90}%`,
                  }}
                >
                  💗
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <p className="text-lg font-semibold mb-4">
                Nooo! Don’t go 😢 Just one more complaint?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 w-full"
                >
                  Stay
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 w-full"
                >
                  Leave 💔
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Header */}
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
        Hi {nickname} {emoji}
        <br /> File your cute little complaint here
      </h2>

      {/* Complaint Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto"
      >
        <label className="block mb-2 text-sm">Type of Complaint:</label>
        <select
          className="w-full mb-4 p-2 rounded-lg border border-pink-300"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {COMPLAINT_TYPES.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>

        <label className="block mb-2 text-sm">Describe it (nicely 😇):</label>
        <textarea
          className="w-full mb-4 p-3 rounded-lg border border-pink-300"
          rows="4"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="You forgot to call me before sleeping 🥺"
        />

        <label className="block mb-2 text-sm">Mood Level:</label>
        <div className="flex justify-between mb-4">
          {MOODS.map((emoji, idx) => (
            <button
              type="button"
              key={idx}
              className={`text-2xl transition-all duration-200 ease-in-out ${mood === idx ? "scale-125" : "opacity-50"
                }`}
              onClick={() => setMood(idx)}
            >
              {emoji}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="bg-pink-500 text-white w-full py-2 rounded-xl hover:bg-pink-600 transition"
        >
          Submit with 💖
        </button>
      </form>

      {/* Complaint History */}
      {history.length > 0 && (
        <div className="mt-8 w-full max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-2">Your Last 3 Complaints 💌</h3>
          <ul className="space-y-2 text-sm">
            {history.map((item, i) => (
              <li key={i} className="bg-white rounded-xl p-3 shadow text-gray-700">
                <p className="font-semibold">{item.type} {MOODS[item.mood]}</p>
                <p className="text-sm">{item.complaint}</p>
                <p className="text-xs text-right text-gray-400">{item.date}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/all-complaints")}
          className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-lg shadow transition"
        >
          📜 View All Complaints
        </button>
      </div>
      <AnimatePresence>
        {showHearts && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                  scale: 0,
                  rotate: Math.random() * 360,
                }}
                animate={{
                  x: `${Math.random() * 200 - 100}px`,
                  y: `${Math.random() * -150 - 50}px`,
                  scale: 1,
                  opacity: 0,
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                💖
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default ComplaintPage;
