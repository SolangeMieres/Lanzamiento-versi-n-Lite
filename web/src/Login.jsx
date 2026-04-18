import { useState } from 'react';
import axios from 'axios';

function Login({ setUsuarioLogueado }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Guardamos la "pulsera VIP" (token) y el nombre en la compu del usuario
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userName', data.nombre);
      
      setUsuarioLogueado(data.nombre);
      setError('');
    } catch (err) {
      setError('Email o contraseña incorrectos. Revisá los datos.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl">🔐</span>
          <h2 className="text-3xl font-black text-gray-900 mt-4">Bienvenido</h2>
          <p className="text-gray-500">Ingresá a tu cuenta de Asociado</p>
        </div>

        {error && <p className="bg-red-50 text-red-500 p-3 rounded-xl text-sm mb-6 border border-red-100">{error}</p>}

        <form onSubmit={manejarLogin} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
            <input 
              type="email" 
              className="w-full p-4 bg-gray-50 border-none rounded-2xl mt-1 focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Contraseña</label>
            <input 
              type="password" 
              className="w-full p-4 bg-gray-50 border-none rounded-2xl mt-1 focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-indigo-100 mt-4">
            Entrar a Soltech
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;