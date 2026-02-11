import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/auth";

function Home() {
  const navigate = useNavigate();
  const userId = getUserId();

  const [profileComplete, setProfileComplete] = useState(true);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://127.0.0.1:5000/profile/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.city || !data.state || !data.goal) {
          setProfileComplete(false);
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      {/* PROFILE WARNING */}
      {!profileComplete && (
        <div className="bg-yellow-500 text-black text-center py-3 font-semibold">
          Complete your profile to unlock all features 🚀
          <button
            onClick={() => navigate("/profile")}
            className="ml-4 underline font-bold"
          >
            Go now
          </button>
        </div>
      )}

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Build Better Habits. <br />
          <span className="text-sky-400">Win Every Day.</span>
        </h1>

        <p className="text-gray-300 max-w-xl text-lg mb-10">
          Turn your daily routine into success.  
          Set tasks, get reminders, complete goals and earn points.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/task")}
            className="bg-sky-500 px-6 py-3 rounded-xl font-semibold hover:bg-sky-400 transition"
          >
            Start Building Routine
          </button>

          {!userId && (
            <button
              onClick={() => navigate("/login")}
              className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              Login
            </button>
          )}
        </div>

      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 px-6 pb-20">

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">⏰ Smart Reminders</h3>
          <p className="text-gray-400">Never forget important tasks again.</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">🎯 Earn Points</h3>
          <p className="text-gray-400">Complete tasks and grow your score.</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">🔥 Build Streaks</h3>
          <p className="text-gray-400">Stay consistent & level up daily.</p>
        </div>

      </div>
    </div>
  );
}

export default Home;
