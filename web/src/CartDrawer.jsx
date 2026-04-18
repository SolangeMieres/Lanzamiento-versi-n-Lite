function CartDrawer({ carrito, setVerCarrito, quitarDelCarrito }) {
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  // 📲 FUNCIÓN PARA ENVIAR POR WHATSAPP
  const finalizarCompra = () => {
    const numeroTelefono = "54911XXXXXXXX"; // 👈 PONÉ TU CELULAR ACÁ (con código de país, sin el +)
    
    // Armamos la lista de productos para el mensaje
    const listaProductos = carrito.map(p => `- ${p.nombre} ($${p.precio.toLocaleString('es-AR')})`).join('%0A');
    
    const mensaje = `¡Hola Soltech! 👋%0AQuiero realizar el siguiente pedido:%0A%0A${listaProductos}%0A%0A*Total: $${total.toLocaleString('es-AR')}*%0A%0A¿Cómo coordinamos el pago?`;
    
    const url = `https://wa.me/${numeroTelefono}?text=${mensaje}`;
    
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[150] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setVerCarrito(false)} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-2xl font-black">Tu Carrito 🛒</h2>
            <button onClick={() => setVerCarrito(false)} className="text-gray-400 hover:text-black text-2xl">×</button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {carrito.length === 0 ? (
              <div className="text-center mt-10">
                <span className="text-4xl block mb-4">💨</span>
                <p className="text-gray-400 font-medium">Tu carrito está vacío.</p>
              </div>
            ) : (
              carrito.map((p, index) => (
                <div key={index} className="flex gap-4 bg-gray-50 p-4 rounded-2xl items-center group">
                  <img src={p.imagenUrl} className="w-16 h-16 object-cover rounded-xl shadow-sm" />
                  <div className="flex-grow">
                    <h4 className="font-bold text-sm text-gray-800">{p.nombre}</h4>
                    <p className="text-indigo-600 font-black text-sm">${p.precio.toLocaleString('es-AR')}</p>
                  </div>
                  <button 
                    onClick={() => quitarDelCarrito(index)} 
                    className="text-gray-300 hover:text-red-500 transition-colors p-2"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="p-8 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Total a pagar</span>
              <span className="text-3xl font-black text-gray-900">${total.toLocaleString('es-AR')}</span>
            </div>
            <button 
              onClick={finalizarCompra}
              disabled={carrito.length === 0}
              className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black hover:bg-black transition-all shadow-xl shadow-green-100 disabled:bg-gray-200 disabled:shadow-none flex items-center justify-center gap-3"
            >
              <span>PEDIR POR WHATSAPP</span>
              <span className="text-xl">🚀</span>
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-4 font-bold uppercase tracking-tighter">
              Al hacer clic serás redirigido para coordinar el pago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;