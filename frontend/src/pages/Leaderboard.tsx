import { useEffect, useState } from "react";
import { Trophy, Crown, Star, Flame, Award } from "lucide-react";

interface Leader {
  _id: string;
  username: string;
  points: number;
  goal: string;
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL
        const res = await fetch(`${API_URL}/leaderboard`);
        const data = await res.json();
        setLeaders(data);
      } catch (err) {
        console.error("Leaderboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center text-sky-400 font-black italic animate-pulse">
      LOADING THE ELITES...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 pb-24">
      <div className="max-w-md mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter">
              THE <span className="text-yellow-500">ELITE</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase">Top Disciplined Warriors</p>
          </div>
          <div className="bg-yellow-500/20 p-3 rounded-2xl border border-yellow-500/30">
            <Trophy className="text-yellow-500" size={28} />
          </div>
        </div>

        {/* TOP 3 PODIUM (Visual representation) */}
        <div className="flex items-end justify-center gap-2 mb-10 h-32">
          {leaders[1] && (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-400 flex items-center justify-center font-black text-slate-400 italic">2</div>
              <div className="w-16 h-16 bg-slate-800 rounded-t-xl border-x border-t border-slate-700"></div>
            </div>
          )}
          {leaders[0] && (
            <div className="flex flex-col items-center gap-2">
              <Crown className="text-yellow-500 animate-bounce" size={24} />
              <div className="w-16 h-16 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center font-black text-yellow-500 text-xl italic shadow-[0_0_20px_rgba(234,179,8,0.3)]">1</div>
              <div className="w-20 h-24 bg-yellow-500/10 rounded-t-xl border-x border-t border-yellow-500/30"></div>
            </div>
          )}
          {leaders[2] && (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-orange-900/20 border-2 border-orange-700 flex items-center justify-center font-black text-orange-600 italic">3</div>
              <div className="w-16 h-12 bg-orange-900/10 rounded-t-xl border-x border-t border-orange-900/30"></div>
            </div>
          )}
        </div>

        {/* LIST */}
        <div className="space-y-3">
          {leaders.map((u, i) => (
            <div 
              key={u._id} 
              className={`p-5 rounded-[2rem] flex items-center justify-between border transition-all hover:scale-[1.02] ${
                i === 0 
                ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_25px_rgba(234,179,8,0.1)]' 
                : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black italic text-sm ${
                  i === 0 ? 'bg-yellow-500 text-black' : 'bg-slate-800 text-slate-500'
                }`}>
                  {i + 1}
                </div>
                <div>
                  <h3 className={`font-black uppercase tracking-tight ${i === 0 ? 'text-yellow-500' : 'text-white'}`}>
                    {u.username || "Anonymous"}
                  </h3>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase italic">
                    <Star size={10} className="text-sky-500" /> {u.goal || "Warrior"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-xl font-black tracking-tighter text-white">
                  {u.points}
                </span>
                <span className="text-[9px] font-black text-sky-500 uppercase tracking-widest">Points</span>
              </div>
            </div>
          ))}

          {leaders.length === 0 && (
            <div className="text-center py-10 text-slate-600 font-bold italic">
              No warriors in the elite list yet...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}