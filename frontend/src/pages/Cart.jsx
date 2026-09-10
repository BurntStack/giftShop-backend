import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { user, loading: authLoading } = useAuth();
  const { cart, loading, updateItem, removeItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [authLoading, user, navigate]);

  if (authLoading || loading || !cart) return <p className="text-center text-stone-400">Loading…</p>;

  if (cart.items.length === 0) {
    return (
      <div className="text-center">
        <p className="text-stone-500">Your cart is empty.</p>
        <Link to="/" className="text-amber-700 font-medium mt-2 inline-block">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4">
            <div className="flex-1">
              <p className="font-medium">{item.product.name}</p>
              <p className="text-stone-500 text-sm">${item.product.price} each</p>
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateItem(item.id, Math.max(1, Number(e.target.value)))}
              className="w-16 border border-stone-300 rounded-lg px-2 py-1"
            />
            <p className="w-20 text-right font-medium">${item.subtotal}</p>
            <button
              onClick={() => removeItem(item.id)}
              className="text-stone-400 hover:text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6 text-lg font-semibold">
        <span>Total</span>
        <span>${cart.total}</span>
      </div>
    </div>
  );
}
