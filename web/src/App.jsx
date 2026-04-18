import { useState } from 'react';
// import axios from 'axios'; // Ya no necesitamos hacer peticiones al backend en la versión Lite
import Login from './Login';
import AdminPanel from './AdminPanel';
import CartDrawer from './CartDrawer';

// 📦 PRODUCTOS FALSOS (Mock Data) adaptados a las variables de tu código
const mockProductos = [
  {
    _id: "1",
    nombre: "Auriculares Inalámbricos Pro",
    precio: 45000,
    descripcion: "Cancelación de ruido activa y batería de 30 horas. Ideales para largas jornadas de código.",
    imagenUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    categoria: "Audio"
  },
  {
    _id: "2",
    nombre: "Teclado Mecánico Custom",
    precio: 85000,
    descripcion: "Switches táctiles silenciosos y retroiluminación RGB programable.",
    imagenUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80",
    categoria: "Periféricos"
  },
  {
    _id: "3",
    nombre: "Monitor Ultrawide 34\"",
    precio: 320000,
    descripcion: "Resolución 4K para tener tu editor, la terminal y el navegador abiertos al mismo tiempo.",
    imagenUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
    categoria: "Monitores"
  },
  {
    _id: "4",
    nombre: "Mouse Ergonómico Vertical",
    precio: 35000,
    descripcion: "Diseño ergonómico para prevenir lesiones. Precisión absoluta para desarrolladores.",
    imagenUrl: "https://images.unsplash.com/photo-1527814050087-151f0f4a434c?w=500&q=80",
    categoria: "Periféricos"
  }
];

function App() {
  // 1. Cargamos la lista de prueba directamente al estado
  const [productos, setProductos] = useState(mockProductos);
  // 2. El loading arranca en false porque los datos ya están listos
  const [cargando, setCargando] = useState(false); 
  const [usuarioLogueado, setUsuarioLogueado] = useState(localStorage.getItem('userName') || null);
  const [verLogin, setVerLogin] = useState(false);
  const [verAdmin, setVerAdmin] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [verCarrito, setVerCarrito] = useState(false);

  const añadirAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    setVerCarrito(true);
  };

  const quitarDelCarrito = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  const cerrarSesion = () => {
    localStorage.clear();
    setUsuarioLogueado(null);
    setVerLogin(false);
  };

  const eliminarProducto = (id) => {
    if (window.confirm('¿Estás segura de eliminar este producto?')) {
      // Como no hay backend, solo lo borramos visualmente del estado
      setProductos(productos.filter(p => p._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* 🧭 NAVBAR */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => {setVerLogin(false); setVerCarrito(false)}}>
              <span className="text-2xl group-hover:rotate-12 transition-transform">⚡</span>
              <span className="text-xl font-black tracking-tighter">SOL<span className="text-indigo-600">TECH</span></span>
            </div>

            <div className="flex items-center gap-5">
              <button 
                onClick={() => setVerCarrito(true)} 
                className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                  {carrito.length}
                </span>
                <span className="text-xl">🛒</span>
              </button>

              {usuarioLogueado ? (
                <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                  <span className="text-xs font-bold text-gray-500 uppercase">
                    Asociado: <span className="text-indigo-600">{usuarioLogueado}</span>
                  </span>
                  <button onClick={() => setVerAdmin(true)} className="bg-black text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-600 transition-all">
                    ⚙️ Gestionar
                  </button>
                  <button onClick={cerrarSesion} className="bg-red-50 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-bold">
                    Salir
                  </button>
                </div>
              ) : (
                <button onClick={() => setVerLogin(!verLogin)} className="bg-indigo-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all">
                  {verLogin ? 'Cerrar' : 'Acceso'}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* CONTENIDO */}
      <main className="flex-grow">
        {verLogin && !usuarioLogueado ? (
          <Login setUsuarioLogueado={setUsuarioLogueado} />
        ) : (
          <div className="p-8">
            <header className="mb-16 mt-8 text-center">
              <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-4">E-commerce Pro</h1>
              <p className="text-gray-400 text-lg">Catálogo exclusivo de Soltech</p>
            </header>

            {cargando ? (
              <div className="flex justify-center py-20 animate-pulse text-indigo-600 font-bold">Conectando...</div>
            ) : (
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {productos.map((p) => (
                  <div key={p._id} className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-gray-100 flex flex-col overflow-hidden">
                    <div className="h-72 overflow-hidden bg-gray-50 relative">
                      <img src={p.imagenUrl} alt={p.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      
                      {usuarioLogueado && (
                        <button onClick={() => eliminarProducto(p._id)} className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-black transition-all z-10">
                          🗑️
                        </button>
                      )}
                      
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                        {p.categoria}
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                      <h2 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-indigo-600">{p.nombre}</h2>
                      <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">{p.descripcion}</p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                        <span className="text-3xl font-black text-gray-900">${p.precio.toLocaleString('es-AR')}</span>
                        <button 
                          onClick={() => añadirAlCarrito(p)}
                          className="bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-600 transition-all text-sm"
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODALES */}
      {verAdmin && (
        <AdminPanel setVerAdmin={setVerAdmin} refrescarProductos={() => window.location.reload()} />
      )}

      {verCarrito && (
        <CartDrawer carrito={carrito} setVerCarrito={setVerCarrito} quitarDelCarrito={quitarDelCarrito} />
      )}

      <footer className="bg-white border-t border-gray-100 py-10 mt-20 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
        SOLTECH 2026 - Desarrollado por Solange Mieres
      </footer>
    </div>
  );
}

export default App;