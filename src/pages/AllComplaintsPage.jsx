// src/pages/AllComplaintsPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { MOODS } from "../constants";

function AllComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "complaints"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setComplaints(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-pink-600">Loading complaints... 💭</p>
    );
  }

  if (complaints.length === 0) {
    return (
      <p className="text-center text-pink-500 italic">
        Wow, no complaints? You’re an angel 😇
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 p-4">
      <button
        onClick={() => navigate("/complaint")}
        className="mb-4 bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500"
      >
        ← Back to Complaints
      </button>

      <h2 className="text-xl font-bold text-pink-700 mb-4 text-center">
        All Complaints 💬
      </h2>

      <ul className="space-y-4 max-w-md mx-auto">
        {complaints.map((item, index) => (
          <motion.li
            key={index}
            className="bg-white rounded-xl p-4 shadow-md text-gray-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <p className="font-semibold">
              {item.type} {MOODS[item.mood] ?? ""}
            </p>
            <p>{item.complaint}</p>
            <p className="text-xs text-right text-gray-400 mt-2">
              {item.timestamp?.toDate
                ? new Date(item.timestamp.toDate()).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })
                : item.date || "Unknown time"}
            </p>

          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default AllComplaintsPage;
