import { Routes , Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TaskForm from "./pages/TaskForm";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import MoneyPot from "./pages/MoneyPot";
import Leaderboard from "./pages/Leaderboard";
import Analytics from "./pages/Analytics";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/task" element={<TaskForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
    <Route path="/money-pot" element={<MoneyPot />} />
    <Route path="/leaderboard" element={<Leaderboard />} />
<Route path="/analytics" element={<Analytics userId={localStorage.getItem("user_id") || ""} />} />
      
    </Routes>
  );
}

export default App;
