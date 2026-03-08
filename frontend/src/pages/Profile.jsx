import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get('/accounts/profile/');
        setProfile(res.data);
      } catch (e) {
        setError('Unable to load profile.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-milkman-blue font-bold tracking-widest uppercase">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-600 font-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-[2rem] shadow-2xl border-t-8 border-milkman-blue">
        <h1 className="text-4xl font-black text-milkman-blue tracking-tight mb-6">Your Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-xs font-black text-gray-400 tracking-widest uppercase">Username</p>
            <p className="text-xl font-black text-gray-800">{profile?.username}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black text-gray-400 tracking-widest uppercase">Email</p>
            <p className="text-xl font-black text-gray-800">{profile?.email || '—'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black text-gray-400 tracking-widest uppercase">Phone</p>
            <p className="text-xl font-black text-gray-800">{profile?.phone || '—'}</p>
          </div>
          <div className="space-y-1 md:col-span-2">
            <p className="text-xs font-black text-gray-400 tracking-widest uppercase">Address</p>
            <p className="text-xl font-black text-gray-800">{profile?.address || '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

