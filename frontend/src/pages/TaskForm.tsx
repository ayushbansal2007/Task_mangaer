import { useEffect, useState } from "react";
import type { Day, TaskFormData } from "../types";
import { createTask, getTasks } from "../api/taskApi";
import { Bell, Wifi, BatteryFull, Sparkles } from "lucide-react";

const daysList: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

function TaskForm() {
  // Fix 1: Universal userId check
  const userId = localStorage.getItem("user_id") || localStorage.getItem("userId");
  
  const [currentTask, setCurrentTask] = useState<TaskFormData>({ 
    title: "", 
    days: [], 
    time: "07:00", 
    repeatDaily: false 
  });
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Toggle day function (Zaroori hai selection ke liye)
  const toggleDay = (day: Day) => {
    setCurrentTask(prev => {
      const newDays = prev.days.includes(day) 
        ? prev.days.filter(d => d !== day) 
        : [...prev.days, day];
      return { ...prev, days: newDays, repeatDaily: false };
    });
  };

  const addTask = async () => {
    // 1. Validation
    if (!currentTask.title || !userId) return alert("Bhai, title toh daal do!");
    
    // 2. Logic to handle daily vs custom days
    const finalDays = currentTask.repeatDaily ? daysList : currentTask.days;
    if (finalDays.length === 0) return alert("Din toh select karo!");

    setLoading(true);
    try {
      // Backend ko wahi bhej rahe hain jo usey chahiye
      await createTask({ 
        user_id: userId, // Backend yahi expect kar raha hai
        title: currentTask.title, 
        days: finalDays, 
        time: currentTask.time 
      });

      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);

      // Reset
      setCurrentTask({ title: "", days: [], time: "07:00", repeatDaily: false });
    } catch (err) { 
      console.error("Task Error:", err);
      alert("Kuch gadbad hai boss!"); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4">
      {/* 🔔 Notification */}
      <div className={`fixed top-6 z-[100] transition-all duration-500 ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center gap-4 shadow-2xl">
           <Bell className="text-sky-400" />
           <p className="text-white font-bold">Task Added! 🚀</p>
        </div>
      </div>

      <div className="w-[320px] bg-slate-900 border-8 border-slate-800 rounded-[3rem] p-6 flex flex-col gap-6 shadow-2xl">
        <h2 className="text-2xl font-black text-white italic italic">ROUTINE <span className="text-sky-500">BUILDER</span></h2>
        
        {/* Time Input */}
        <input 
          type="time" 
          className="bg-transparent text-white text-4xl font-black outline-none"
          value={currentTask.time}
          onChange={e => setCurrentTask({...currentTask, time: e.target.value})}
        />

        {/* Days Selection */}
        <div className="flex flex-wrap gap-2">
           {daysList.map((day, i) => (
             <button 
               key={day}
               onClick={() => toggleDay(day)}
               className={`w-9 h-9 rounded-xl text-[10px] font-bold transition-all ${currentTask.days.includes(day) ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-500'}`}
             >
               {["M","T","W","T","F","S","S"][i]}
             </button>
           ))}
        </div>

        {/* Title Input */}
        <input 
          type="text"
          placeholder="Enter Mission..."
          className="bg-slate-800 p-4 rounded-2xl text-white outline-none"
          value={currentTask.title}
          onChange={e => setCurrentTask({...currentTask, title: e.target.value})}
        />

        {/* Confirm Button */}
        <button 
          onClick={addTask}
          className="w-full bg-white text-black py-4 rounded-2xl font-black hover:bg-sky-500 transition-all active:scale-95"
        >
          {loading ? "SAVING..." : "CONFIRM MISSION"}
        </button>
      </div>
    </div>
  );
}

export default TaskForm;