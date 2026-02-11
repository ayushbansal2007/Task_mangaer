import { useEffect, useState } from "react";
import { getUserId } from "../utils/auth";

function Profile() {
  const userId = getUserId();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/profile/${userId}`)
      .then(res => res.json())
      .then(data => setProfile(data));
  }, []);

  if (!profile) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center p-6 text-white">
      <div className="bg-slate-800 p-8 rounded-xl w-full max-w-lg space-y-3">

        <h2 className="text-2xl font-bold text-center mb-4">Your Profile</h2>

        <p><strong>City:</strong> {profile.city}</p>
        <p><strong>State:</strong> {profile.state}</p>
        <p><strong>Goal:</strong> {profile.goal}</p>
        

      </div>
    </div>
  );
}

export default Profile;
