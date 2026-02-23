import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/auth";
import { 
  Rocket, Trophy, Bell, Zap, ArrowRight, Star, 
  CheckCircle, Users, Flame, Calendar, Smartphone 
} from "lucide-react";

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
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-sky-500/30 overflow-x-hidden">
      <Navbar />

      {/* BACKGROUND ORBS */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* HERO SECTION */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-20">
        <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-full text-sky-400 text-sm font-medium mb-8 backdrop-blur-md animate-fade-in">
          <Zap size={14} fill="currentColor" />
          <span>The #1 Habit Tracker for Achievers</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
          Build Better <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Habits.</span> <br />
          Win <span className="relative inline-block">
                Every Day
                <span className="absolute bottom-2 left-0 w-full h-3 bg-sky-500/20 -z-10"></span>
              </span>
        </h1>

        <p className="text-slate-400 max-w-2xl text-lg md:text-xl mb-12 leading-relaxed">
          Gamify your life. Set smart reminders, crush goals, and climb the leaderboard with our AI-powered routine builder.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mb-20">
          <button onClick={() => navigate("/task")} className="group relative bg-sky-500 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-sky-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:scale-105 active:scale-95">
            Start Building Routine <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* --- STATS SECTION --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl border-t border-slate-800 pt-16">
          <div className="text-center">
            <h4 className="text-4xl font-black text-white">10K+</h4>
            <p className="text-slate-500 text-sm uppercase tracking-widest mt-1 font-bold">Tasks Done</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-black text-sky-400">95%</h4>
            <p className="text-slate-500 text-sm uppercase tracking-widest mt-1 font-bold">Consistency</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-black text-white">5K+</h4>
            <p className="text-slate-500 text-sm uppercase tracking-widest mt-1 font-bold">Active Users</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-black text-indigo-400">24/7</h4>
            <p className="text-slate-500 text-sm uppercase tracking-widest mt-1 font-bold">Reminders</p>
          </div>
        </div>
      </div>

      {/* --- HOW IT WORKS SECTION --- */}
      <div className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How it works?</h2>
            <p className="text-slate-400">Three simple steps to change your life.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Calendar size={32}/>, title: "Create Your Routine", desc: "Add tasks and select specific days for reminders." },
              { icon: <Smartphone size={32}/>, title: "Get Notified", desc: "Receive WhatsApp & system alerts exactly on time." },
              { icon: <Trophy size={32}/>, title: "Level Up", desc: "Complete tasks, earn points, and climb the leaderboard." }
            ].map((step, idx) => (
              <div key={idx} className="relative group text-center">
                <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-500 transition-all group-hover:rotate-6 shadow-xl">
                  <span className="text-sky-400 group-hover:text-white">{step.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-500">{step.desc}</p>
                {idx < 2 && <div className="hidden md:block absolute top-10 -right-6 text-slate-700 animate-pulse"><ArrowRight size={30}/></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- QUOTE / MOTIVATION SECTION --- */}
      <div className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-600 to-sky-600 rounded-[3rem] p-12 text-center relative shadow-2xl">
          <Flame className="absolute top-6 left-6 text-white/20" size={80} />
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            "Discipline is doing what needs to be done, even if you don't want to do it."
          </h2>
          <p className="text-white/80 text-xl font-medium">- Start Your Journey Today</p>
          
          <button 
            onClick={() => navigate("/task")}
            className="mt-10 bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-xl"
          >
            Create Your First Task 🚀
          </button>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-800 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-black">H</div>
          <span className="text-xl font-bold tracking-tighter">HabitMaster</span>
        </div>
        <p className="text-slate-500 text-sm">© 2026 Made with ❤️ for Achievers.</p>
      </footer>
    </div>
  );
}

export default Home;