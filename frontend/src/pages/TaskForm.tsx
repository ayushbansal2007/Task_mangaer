import { useState } from "react";
import  type { Day, TaskFormData } from "../types";

const days: Day[] = [
  "monday","tuesday","wednesday",
  "thursday","friday","saturday","sunday"
];

function TaskForm() {
  const [currentTask, setCurrentTask] = useState<TaskFormData>({
    title: "",
    days: [],
    time: "07:00",
    repeatDaily: false
  });

  const [tasks, setTasks] = useState<TaskFormData[]>([]);

  const toggleDay = (day: Day) => {
    setCurrentTask(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const addTask = () => {
    if (!currentTask.title) return;

    const finalTask = currentTask.repeatDaily
      ? { ...currentTask, days: [...days] }
      : currentTask;

    setTasks([...tasks, finalTask]);

    setCurrentTask({
      title: "",
      days: [],
      time: currentTask.time,
      repeatDaily: false
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-4">⏰ Routine Builder</h2>

        {/* Time */}
        <input
          type="time"
          value={currentTask.time}
          onChange={e => setCurrentTask({ ...currentTask, time: e.target.value })}
          className="w-full text-4xl text-center border rounded-xl p-4 mb-4"
        />

        {/* Day selector */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {days.map(d => (
            <button
              key={d}
              onClick={() => toggleDay(d)}
              className={`p-2 rounded-full text-xs font-bold 
                ${currentTask.days.includes(d)
                  ? "bg-sky-500 text-white"
                  : "bg-gray-200"}`}
            >
              {d[0].toUpperCase()}
            </button>
          ))}
        </div>

        {/* Repeat toggle */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={currentTask.repeatDaily}
            onChange={() =>
              setCurrentTask({
                ...currentTask,
                repeatDaily: !currentTask.repeatDaily,
                days: []
              })
            }
          />
          <span className="text-sm font-semibold">Repeat Daily</span>
        </div>

        {/* Task name */}
        <input
          type="text"
          placeholder="Enter task..."
          value={currentTask.title}
          onChange={e => setCurrentTask({ ...currentTask, title: e.target.value })}
          className="w-full border rounded-lg p-2 mb-3"
        />

        <button
          onClick={addTask}
          className="w-full bg-green-500 text-white py-2 rounded-xl"
        >
          + Add Task
        </button>

        {/* Preview */}
        <div className="mt-4 space-y-2 max-h-48 overflow-auto">
          {tasks.map((t, i) => (
            <div key={i} className="bg-gray-100 p-3 rounded-xl">
              <p className="font-semibold">{t.title}</p>
              <p className="text-sm text-gray-500">
                {t.repeatDaily
                  ? "Every day"
                  : t.days.map(d => d.slice(0,3).toUpperCase()).join(", ")}
                {" • "} {t.time}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default TaskForm;
