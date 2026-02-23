import { useEffect, useState } from "react";
import { getUserId } from "../utils/auth";
import { Wallet, TrendingUp, ArrowUpRight, Banknote, History, Sparkles, RefreshCcw, CheckCircle2 } from "lucide-react";

interface HistoryItem {
  _id: string;
  title: string;
  points_earned: number;
  completed_at: string;
}

function MoneyPot() {
  const userId = getUserId();
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]); // New state for history
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // --- DATA FETCH FUNCTION ---
  const fetchWealthAndHistory = async () => {
    if (!userId) return;
    setIsRefreshing(true);
    try {
      // 1. Fetch Points
      const API_URL = import.meta.env.VITE_API_URL
      const resProfile = await fetch(`${API_URL}/profile/${userId}`, { cache: 'no-store' });
      const profileData = await resProfile.json();
      setPoints(profileData.points || 0);

      // 2. Fetch History
      const resHistory = await fetch(`${API_URL}/tasks/history/${userId}`);
      const historyData = await resHistory.json();
      setHistory(Array.isArray(historyData) ? historyData : []);

    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWealthAndHistory();
  }, [userId]);

  const money = (points / 10).toFixed(2);

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white italic">
      <div className="h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      Loading your bank...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER SECTION (Same as before) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-3">
              Money <span className="text-green-400">Pot</span>
              <button onClick={fetchWealthAndHistory} className={`${isRefreshing ? 'animate-spin' : ''} text-slate-600 hover:text-white transition-colors`}>
                <RefreshCcw size={20} />
              </button>
            </h1>
            <p className="text-slate-500 font-bold text-sm tracking-widest mt-1">DISCIPLINE = CASH</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 px-6 py-3 rounded-2xl flex items-center gap-3">
            <Sparkles className="text-green-400" size={20} />
            <span className="text-green-400 font-black text-sm uppercase">10 Pts = ₹1</span>
          </div>
        </div>

        {/* MAIN BALANCE CARD (Same as before) */}
        <div className="relative group overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-[3rem] p-10 shadow-2xl mb-10 text-center">
            <div className="bg-green-500 w-fit mx-auto p-4 rounded-3xl shadow-[0_0_30px_rgba(34,197,94,0.3)] mb-6">
              <Wallet size={40} className="text-white" />
            </div>
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs mb-2">Current Balance</p>
            <h2 className="text-7xl md:text-8xl font-black text-white mb-4 tracking-tighter">₹{money}</h2>
            <div className="inline-flex items-center gap-2 text-green-400 font-bold bg-green-400/10 px-4 py-2 rounded-full border border-green-500/20">
              <TrendingUp size={18} />
              <span>{points} Total Points</span>
            </div>
        </div>

        {/* RECENT EARNINGS (Updated to show real history) */}
        <div className="mt-12">
            <h3 className="text-xl font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-3">
                <History size={20} /> Real-time History
            </h3>
            <div className="space-y-4">
                {history.length > 0 ? (
                    history.map((item) => (
                        <div key={item._id} className="bg-slate-800/40 border border-slate-700 hover:border-green-500/50 p-5 rounded-[1.5rem] flex items-center justify-between transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <p className="font-black text-sm uppercase tracking-tight">{item.title}</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase">{item.completed_at}</p>
                                </div>
                            </div>
                            <span className="text-green-400 font-black text-xl">+₹{(item.points_earned / 10).toFixed(1)}</span>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-slate-900/50 rounded-[3rem] border border-dashed border-slate-800 text-slate-600 font-bold italic">
                        "Your bank is empty. Kill some tasks!" 🚀
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default MoneyPot;