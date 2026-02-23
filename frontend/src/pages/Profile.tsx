import { useEffect, useState } from "react";
import { getUserId } from "../utils/auth";
import { 
  User, CheckCircle2, Trophy, Trash2, Edit3, X, Sparkles, Plus 
} from "lucide-react";

const ALL_DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

function Profile() {
  const userId = getUserId();
  const [profile, setProfile] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [pointsGlow, setPointsGlow] = useState(false);

  // --- DATA FETCH ---
  const fetchData = async () => {
    if (!userId) return;
    try {
      const [pRes, tRes] = await Promise.all([
        fetch(`http://localhost:5000/profile/${userId}`, { cache: 'no-store' }),
        fetch(`http://localhost:5000/tasks/${userId}`, { cache: 'no-store' })
      ]);
      if (pRes.ok) setProfile(await pRes.json());
      if (tRes.ok) setTasks(await tRes.json());
    } catch (err) {
      console.error("Data load error", err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [userId]);

  // --- COMPLETE TASK (Systumm Fix) ---
  const handleComplete = async (taskId: string) => {
    // 1. Backup lo aur UI se turant hatao (Optimistic Update)
    const previousTasks = [...tasks];
    const previousPoints = profile?.points || 0;

    setTasks((prev) => prev.filter(t => t._id !== taskId));
    setProfile((prev: any) => ({ ...prev, points: previousPoints + 10 }));
    setPointsGlow(true);
    setTimeout(() => setPointsGlow(false), 1000);

    try {
      const res = await fetch(`http://localhost:5000/tasks/complete/${taskId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }) 
      });

      if (!res.ok) {
        // Agar backend mana karde toh wapas le aao
        setTasks(previousTasks);
        setProfile((prev: any) => ({ ...prev, points: previousPoints }));
        alert("Panga ho gaya! Task update nahi ho paya.");
      }
    } catch (err) {
      setTasks(previousTasks);
      setProfile((prev: any) => ({ ...prev, points: previousPoints }));
      alert("Network fail hai bhai!");
    }
  };

  // --- DELETE TASK ---
  const handleDelete = async (taskId: string) => {
    if (!window.confirm("Bhai, pakka delete karna hai?")) return;
    try {
      const res = await fetch(`http://localhost:5000/tasks/${taskId}`, { method: 'DELETE' });
      if (res.ok) setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) { console.error(err); }
  };

  // --- UPDATE TASK ---
  const handleUpdate = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL
      const res = await fetch(`${API_URL}/tasks/${editingTask._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTask)
      });
      if (res.ok) {
        setTasks(tasks.map(t => t._id === editingTask._id ? editingTask : t));
        setIsEditing(false);
      }
    } catch (err) { alert("Update failed!"); }
  };

  const toggleDay = (day: string) => {
    if (!editingTask) return;
    setEditingTask((prev: any) => {
      const currentDays = prev.days || [];
      const newDays = currentDays.includes(day)
        ? currentDays.filter((d: string) => d !== day)
        : [...currentDays, day];
      return { ...prev, days: newDays };
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-sky-400 font-black italic text-2xl animate-pulse">
      SYSTUMMM RELOADING...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* PROFILE HEADER */}
        <div className="bg-slate-800/40 backdrop-blur-md rounded-[3rem] p-8 mb-8 border border-slate-700/50 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
          <div className="h-24 w-24 bg-gradient-to-br from-sky-400 to-sky-600 rounded-3xl flex items-center justify-center shadow-lg relative">
            <User size={48} />
            <Sparkles className="absolute -top-2 -right-2 text-yellow-400" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-tight">
              {profile?.name || "User"}'s Dashboard
            </h1>
            <div className="flex gap-4 mt-4 justify-center md:justify-start">
              <div className={`px-6 py-2 rounded-2xl font-black border transition-all duration-500 flex items-center gap-2 ${pointsGlow ? 'bg-yellow-400 text-black scale-105 shadow-yellow-500/50 shadow-lg' : 'bg-sky-500/10 border-sky-500/30 text-sky-400'}`}>
                <Trophy size={20} /> {profile?.points || 0} PTS
              </div>
              <div className="px-6 py-2 rounded-2xl font-black bg-green-500/10 border border-green-500/30 text-green-400">
                ₹{((profile?.points || 0) / 10).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* TASK LIST */}
        <div className="grid gap-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-black uppercase text-slate-500 tracking-[0.3em]">Current Routine</h2>
            <div className="h-[1px] flex-1 mx-4 bg-slate-800"></div>
          </div>

          {tasks.length > 0 ? tasks.map((task) => (
            <div key={task._id} className="bg-slate-800/60 border border-slate-700 p-6 rounded-[2rem] flex items-center justify-between group hover:border-sky-500/50 transition-all hover:bg-slate-800/80 shadow-xl">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => handleComplete(task._id)} 
                  className="h-14 w-14 rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center hover:bg-green-500 hover:border-green-400 transition-all active:scale-90 group/btn shadow-inner"
                >
                  <CheckCircle2 size={28} className="text-slate-600 group-hover/btn:text-white" />
                </button>
                <div>
                  <h4 className="text-xl font-black tracking-tight group-hover:text-sky-400 transition-colors">{task.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded-md font-black text-slate-300 uppercase italic">{task.time}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{task.days?.length === 7 ? "Daily" : "Custom"}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => { setEditingTask(task); setIsEditing(true); }} className="p-3 bg-slate-900 rounded-xl text-sky-400 border border-slate-700 hover:bg-sky-500 hover:text-white transition-all shadow-md"><Edit3 size={18}/></button>
                <button onClick={() => handleDelete(task._id)} className="p-3 bg-slate-900 rounded-xl text-red-500 border border-slate-700 hover:bg-red-500 hover:text-white transition-all shadow-md"><Trash2 size={18}/></button>
              </div>
            </div>
          )) : (
            <div className="text-center py-24 bg-slate-800/20 rounded-[3rem] border-2 border-dashed border-slate-700/50">
                <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                    <Sparkles size={32} />
                </div>
                <h3 className="text-slate-400 font-black uppercase italic tracking-widest">SAB TASKS KHATAM!</h3>
                <p className="text-slate-600 text-xs font-bold mt-2 uppercase">Systumm hang kar diya bhai ne!</p>
            </div>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-[#020617]/95 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 p-10 rounded-[3rem] w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsEditing(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X /></button>
            <h2 className="text-3xl font-black mb-8 italic italic uppercase tracking-tighter">Edit Task</h2>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase ml-2 mb-2 block tracking-widest">Task Name</label>
                <input className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-white outline-none focus:border-sky-500 transition-all font-bold" value={editingTask.title} onChange={(e) => setEditingTask({...editingTask, title: e.target.value})} />
              </div>
              <div>
                 <label className="text-[10px] font-black text-slate-500 uppercase ml-2 mb-2 block tracking-widest">Active Days</label>
                 <div className="flex flex-wrap gap-2 justify-center bg-slate-800/50 p-4 rounded-2xl">
                    {ALL_DAYS.map(day => (
                    <button key={day} onClick={() => toggleDay(day)} className={`px-3 py-2 rounded-xl text-[10px] font-black border transition-all ${editingTask.days?.includes(day) ? 'bg-sky-500 border-sky-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-600'}`}>{day.slice(0,3).toUpperCase()}</button>
                    ))}
                 </div>
              </div>
              <button onClick={handleUpdate} className="w-full bg-sky-500 py-5 rounded-[2rem] font-black text-xl italic uppercase tracking-tighter shadow-lg shadow-sky-500/20 active:scale-95 transition-all">SAVE CHANGES</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;