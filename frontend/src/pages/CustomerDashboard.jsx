import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const CustomerDashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      const res = await API.get('/subscriptions/subscriptions/');
      setSubscriptions(res.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async (id) => {
    const ok = window.confirm('Are you sure you want to cancel this subscription?');
    if (!ok) return;
    try {
      await API.post(`/subscriptions/subscriptions/${id}/cancel/`);
      fetchSubscriptions();
    } catch (e) {
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  if (loading) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Subscriptions</h1>
      {subscriptions.length === 0 ? (
        <p>No subscriptions yet.</p>
      ) : (
        <div className="space-y-3">
          {subscriptions.map(s => (
            <div key={s.id} className="flex items-center justify-between border p-3 rounded">
              <div>
                <div className="font-bold">{s.product_details?.name}</div>
                <div className="text-sm text-gray-600">Frequency: {s.frequency}</div>
              </div>
              <button onClick={() => cancelSubscription(s.id)} className="text-red-600">Cancel</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
