import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/auth";
import { 
  Rocket, Trophy, Zap, ArrowRight, 
  Flame, Smartphone, CheckCircle2,
  Users, Star, BarChart3, ShieldCheck
} from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const userId = getUserId();
  const [profileComplete, setProfileComplete] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/profile/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.city || !data.state || !data.goal) setProfileComplete(false);
      })
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-sky-500/30 overflow-x-hidden font-sans">
      <Navbar />

      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-sky-900/10 blur-[120px] rounded-full opacity-50"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-indigo-900/10 blur-[120px] rounded-full opacity-50"></div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-28 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-4 py-1.5 rounded-full text-sky-400 text-[10px] md:text-xs font-black tracking-widest uppercase mb-8 backdrop-blur-md animate-fade-in">
          <ShieldCheck size={14} /> Trusted by 5,000+ Achievers
        </div>

        <h1 className="text-5xl md:text-8xl font-[1000] text-center mb-8 leading-[1] tracking-tighter text-white">
          BUILD THE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400 bg-300% animate-gradient">
            ELITE ROUTINE.
          </span>
        </h1>

        <p className="text-slate-400 max-w-2xl text-center text-base md:text-xl mb-12 leading-relaxed">
          The only system that combines AI discipline with WhatsApp triggers. 
          Stop tracking, start winning.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
          <button 
            onClick={() => navigate("/task")} 
            className="w-full sm:w-auto px-10 py-5 bg-sky-500 text-white rounded-2xl font-black text-lg hover:bg-sky-400 transition-all shadow-[0_10px_40px_rgba(14,165,233,0.3)] hover:scale-105 active:scale-95"
          >
            GET STARTED — IT'S FREE
          </button>
        </div>
      </section>

      {/* RESPONSIVE BENTO GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          
          {/* Box 1: Analytics */}
          <div className="md:col-span-4 bg-slate-900/40 border border-slate-800/60 p-8 rounded-[2rem] backdrop-blur-sm relative overflow-hidden group min-h-[300px]">
            <BarChart3 size={120} className="absolute -right-6 -bottom-6 text-sky-500/10 group-hover:text-sky-500/20 transition-all" />
            <h3 className="text-3xl font-black text-white mb-4">Live Analytics</h3>
            <p className="text-slate-400 max-w-xs">Track your progress with real-time heatmaps and consistency scores.</p>
            <div className="mt-8 flex gap-2">
                {[1,2,3,4,5,6].map(i => <div key={i} className="w-8 h-8 rounded-md bg-sky-500/20 border border-sky-500/30 animate-pulse"></div>)}
            </div>
          </div>

          {/* Box 2: WhatsApp */}
          <div className="md:col-span-2 bg-gradient-to-br from-green-600/20 to-emerald-900/20 border border-green-500/20 p-8 rounded-[2rem] flex flex-col justify-between group cursor-pointer hover:border-green-500/40 transition-all">
            <Smartphone size={40} className="text-green-500 group-hover:rotate-12 transition-transform" />
            <div>
              <h4 className="text-2xl font-bold text-white mt-4">WhatsApp Bot</h4>
              <p className="text-slate-400 text-sm">Reminders delivered where you actually see them.</p>
            </div>
          </div>

          {/* Box 3: Gamification */}
          <div className="md:col-span-2 bg-indigo-600 p-8 rounded-[2rem] flex flex-col justify-between relative overflow-hidden group shadow-xl">
            <Trophy className="absolute -right-4 -top-4 text-white/10" size={120} />
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Leaderboard <br /> Domination</h4>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs py-2 px-4 rounded-lg w-fit mt-4">View Rankings</button>
          </div>

          {/* Box 4: Global Stats */}
          <div className="md:col-span-4 bg-[#0f172a] border border-slate-800 p-8 rounded-[2rem] grid grid-cols-2 gap-8">
            <div>
                <div className="text-4xl font-black text-white">10M+</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Check-ins</div>
            </div>
            <div>
                <div className="text-4xl font-black text-sky-500">98%</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Satisfaction</div>
            </div>
            <div className="col-span-2 text-slate-500 text-sm border-t border-slate-800 pt-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" /> System status: All systems operational
            </div>
          </div>

        </div>
      </section>

      {/* MOBILE RESPONSIVE STEPS */}
      <section className="py-20 px-6 bg-[#010413]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 italic italic">THE PROTOCOL.</h2>
          <p className="text-slate-500">How we turn average into elite.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { id: "01", title: "CONFIGURE", desc: "Set your tasks and time windows." },
            { id: "02", title: "EXECUTE", desc: "Get real-time alerts and crush tasks." },
            { id: "03", title: "LEVEL UP", desc: "Watch your streak grow and win rewards." }
          ].map((item, idx) => (
            <div key={idx} className="p-8 bg-slate-900/30 border border-slate-800 rounded-3xl hover:border-sky-500/30 transition-all group">
              <div className="text-6xl font-black text-slate-800 group-hover:text-sky-500/10 mb-4 transition-colors">{item.id}</div>
              <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AGGRESSIVE CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-sky-600 to-indigo-800 rounded-[3rem] p-12 text-center relative shadow-2xl overflow-hidden group">
          <Flame className="absolute top-10 right-10 text-white/10 group-hover:scale-150 transition-transform duration-700" size={150} />
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
            DON'T WAIT <br /> FOR MONDAY.
          </h2>
          <button 
            onClick={() => navigate("/task")}
            className="bg-white text-indigo-700 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all active:scale-95 shadow-2xl"
          >
            START YOUR JOURNEY <Rocket size={20} className="inline ml-2" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 border-t border-slate-900 text-center">
      <h1 className="text-3xl font-black text-white mb-4 italic">Powred by Ayush Bansal</h1>
        <div className="text-xl font-black text-white tracking-widest mb-8">HABITMASTER<span className="text-sky-500">.</span></div>
        <p className="text-slate-600 text-[10px] font-bold tracking-[0.3em] uppercase">Built for those who refuse to be average.</p>
      </footer>
    </div>
  );
}

export default Home;