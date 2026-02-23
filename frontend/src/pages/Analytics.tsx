import { useEffect, useState } from "react";
import { BarChart3, Target, Zap } from "lucide-react";

export default function Analytics({ userId }: { userId: string }) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL
    fetch(`${API_URL}/analytics/${userId}`)
      .then(res => res.json())
      .then(setData);
  }, [userId]);

  const maxPoints = Math.max(...data.map(d => d.points), 10);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 mt-8">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="text-sky-400" />
        <h3 className="font-black italic uppercase tracking-tighter">Weekly Performance</h3>
      </div>

      <div className="flex items-end justify-between h-48 gap-2">
        {data.map((day) => (
          <div key={day.day} className="flex-1 flex flex-col items-center gap-3 group">
            <div className="relative w-full flex flex-col justify-end items-center h-40">
                {/* Tooltip on hover */}
                <span className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-all text-[10px] font-black text-sky-400">
                    {day.points} PTS
                </span>
                {/* Bar */}
                <div 
                  className="w-full max-w-[30px] bg-gradient-to-t from-sky-600 to-sky-400 rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                  style={{ height: `${(day.points / maxPoints) * 100}%` }}
                ></div>
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase">{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}