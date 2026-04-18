import { useState } from 'react';
import axios from 'axios';

function AdminPanel({ setVerAdmin, refrescarProductos }) {
  const [formData, setFormData] = useState({
    nombre: '', descripcion: '', precio: '', imagenUrl: '', categoria: '', stock: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/productos', formData);
      alert('✅ ¡Producto cargado con éxito!');
      refrescarProductos(); // Recarga la lista para que aparezca el nuevo
      setVerAdmin(false);    // Cierra el panel
    } catch (err) {
      alert('❌ Error al cargar producto');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button onClick={() => setVerAdmin(false)} className="absolute top-6 right-8 text-2xl font-bold text-gray-300 hover:text-red-500">×</button>
        
        <h2 className="text-3xl font-black mb-2">Nuevo Producto</h2>
        <p className="text-gray-400 mb-8 text-sm uppercase tracking-widest font-bold">Panel de Control Soltech</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input className="col-span-2 p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Nombre del producto" onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
          <textarea className="col-span-2 p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 h-24" placeholder="Descripción" onChange={(e) => setFormData({...formData, descripcion: e.target.value})} required />
          <input className="p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Precio" type="number" onChange={(e) => setFormData({...formData, precio: e.target.value})} required />
          <input className="p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Stock" type="number" onChange={(e) => setFormData({...formData, stock: e.target.value})} required />
          <input className="col-span-2 p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600" placeholder="URL de la imagen (Unsplash, etc)" onChange={(e) => setFormData({...formData, imagenUrl: e.target.value})} required />
          <input className="col-span-2 p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Categoría" onChange={(e) => setFormData({...formData, categoria: e.target.value})} required />
          
          <button className="col-span-2 bg-indigo-600 text-white p-5 rounded-2xl font-black mt-4 hover:bg-black transition-all shadow-xl shadow-indigo-100">
            PUBLICAR AHORA ⚡
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;