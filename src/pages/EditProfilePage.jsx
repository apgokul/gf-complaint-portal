import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfilePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [emoji, setEmoji] = useState("💖");
  const [moodStyle, setMoodStyle] = useState("cute");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("gfProfile"));
    if (saved) {
      setName(saved.name || "");
      setStartDate(saved.startDate || "");
      setEmoji(saved.emoji || "💖");
      setMoodStyle(saved.moodStyle || "cute");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = { name, startDate, emoji, moodStyle };
    localStorage.setItem("gfProfile", JSON.stringify(profile));
    navigate("/complaint");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-pink-700 mb-4">
          Edit Your Profile 💁‍♀️
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Your Name 💕</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-pink-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Cutie Pie"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Since When? 🗓️</label>
            <input
              type="date"
              className="w-full p-3 rounded-lg border border-pink-300"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pick Your Vibe Emoji ✨</label>
            <div className="flex gap-3 text-2xl">
              {["💖", "🥺", "😍", "😡", "😇", "😭"].map((em) => (
                <button
                  type="button"
                  key={em}
                  className={`p-1 rounded-full hover:scale-125 transition ${
                    emoji === em ? "ring-2 ring-pink-400" : "opacity-50"
                  }`}
                  onClick={() => setEmoji(em)}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mood Style 🎭</label>
            <select
              className="w-full p-3 rounded-lg border border-pink-300"
              value={moodStyle}
              onChange={(e) => setMoodStyle(e.target.value)}
            >
              <option value="cute">Cute 😇</option>
              <option value="dramatic">Dramatic 😡</option>
              <option value="soft">Soft 🧸</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition"
          >
            Update Profile 💌
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
