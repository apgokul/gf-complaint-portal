// src/pages/WelcomePage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NICKNAMES, EMOJIS } from "../constants";
import { motion } from "framer-motion";

function calculateDaysSince(startDate) {
  const today = new Date();
  const start = new Date(startDate);
  const diffTime = today - start;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

function WelcomePage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [emoji, setEmoji] = useState("");
  const daysTogether = calculateDaysSince("2025-01-15");

  useEffect(() => {
    setNickname(NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)]);
    setEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
  }, []);

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-pink-800 mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Hey {nickname} {emoji}!
      </motion.h1>

      <motion.p
        className="text-pink-700 max-w-md mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      >
        We've been together for <span className="font-semibold">{daysTogether} days 💖</span>
      </motion.p>

      <motion.p
        className="text-pink-700 max-w-md mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
      >
        Welcome to your personal Complaint Portal 💌 — where you can lovingly rant about your boyfriend (that’s me 😜).
      </motion.p>

      <motion.button
        onClick={() => navigate("/complaint")}
        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full text-lg shadow-lg transition"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.4, ease: "easeOut" }}
      >
        Let’s Start 💖
      </motion.button>
    </div>
  );
}

export default WelcomePage;
