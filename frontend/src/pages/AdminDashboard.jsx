import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '' });
  const [imageFile, setImageFile] = useState(null);

  const fetchAll = async () => {
    try {
      const [catRes, prodRes, userRes, subsRes] = await Promise.all([
        API.get('/products/categories/'),
        API.get('/products/products/'),
        API.get('/accounts/users/'),
        API.get('/subscriptions/subscriptions/'),
      ]);
      setCategories(catRes.data);
      setProducts(prodRes.data);
      setUsers(userRes.data);
      setSubscriptions(subsRes.data);
    } catch (e) {}
  };

  const createCategory = async () => {
    const fd = new FormData();
    fd.append('name', newCategory.name);
    fd.append('description', newCategory.description);
    try {
      await API.post('/products/categories/', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setNewCategory({ name: '', description: '' });
      fetchAll();
    } catch (e) {}
  };

  const createProduct = async () => {
    const fd = new FormData();
    fd.append('name', newProduct.name);
    fd.append('description', newProduct.description);
    fd.append('price', newProduct.price);
    fd.append('category', newProduct.category);
    if (imageFile) fd.append('image', imageFile);
    try {
      await API.post('/products/products/', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setNewProduct({ name: '', description: '', price: '', category: '' });
      setImageFile(null);
      fetchAll();
    } catch (e) {}
  };

  useEffect(() => {
    fetchAll();
  }, []);
  
  const cancelSubscription = async (id) => {
    const ok = window.confirm('Are you sure you want to cancel this subscription?');
    if (!ok) return;
    try {
      await API.post(`/subscriptions/subscriptions/${id}/cancel/`);
      fetchAll();
    } catch (e) {}
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20250307/pngtree-rustic-farm-stall-fresh-dairy-products-milk-cheese-image_17078739.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="backdrop-blur-sm bg-white/80 p-6 max-w-6xl mx-auto space-y-8 rounded-3xl">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-3">Create Category</h2>
        <div className="flex gap-2">
          <input className="border p-2 flex-1" placeholder="Name" value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} />
          <input className="border p-2 flex-1" placeholder="Description" value={newCategory.description} onChange={e => setNewCategory({ ...newCategory, description: e.target.value })} />
          <button className="bg-blue-600 text-white px-4" onClick={createCategory}>Add</button>
        </div>
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-3">Create Product</h2>
        <div className="grid grid-cols-2 gap-2">
          <input className="border p-2" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
          <input className="border p-2" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
          <textarea className="border p-2 col-span-2" placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
          <select className="border p-2" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}>
            <option value="">Category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input className="border p-2" type="file" onChange={e => setImageFile(e.target.files[0])} />
          <button className="bg-green-600 text-white px-4 py-2" onClick={createProduct}>Add Product</button>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-6">
        <div className="border p-4 rounded">
          <h3 className="font-bold mb-2">Categories</h3>
          <ul className="text-sm">
            {categories.map(c => <li key={c.id}>{c.name}</li>)}
          </ul>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-bold mb-2">Products</h3>
          <ul className="text-sm">
            {products.map(p => <li key={p.id}>{p.name}</li>)}
          </ul>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-bold mb-2">Users</h3>
          <ul className="text-sm">
            {users.map(u => <li key={u.id}>{u.username} ({u.role})</li>)}
          </ul>
        </div>
      </section>
      
      <section className="border p-4 rounded mt-6">
        <h2 className="text-xl font-bold mb-3">Subscriptions</h2>
        {subscriptions.length === 0 ? (
          <p className="text-sm text-gray-600">No subscriptions found.</p>
        ) : (
          <div className="space-y-2">
            {subscriptions.map(s => (
              <div key={s.id} className="flex items-center justify-between border p-3 rounded">
                <div className="text-sm">
                  <div className="font-bold">{s.product_details?.name} · {s.user_username}</div>
                  <div className="text-gray-600">Freq: {s.frequency} · Active: {s.is_active ? 'Yes' : 'No'}</div>
                </div>
                <button 
                  className={`px-3 py-1 rounded ${s.is_active ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-600'}`}
                  onClick={() => cancelSubscription(s.id)}
                  disabled={!s.is_active}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
