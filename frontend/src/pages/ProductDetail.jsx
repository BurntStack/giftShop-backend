import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct } from '../services/products';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getProduct(slug)
      .then(setProduct)
      .catch((err) => setError(err.message));
  }, [slug]);

  async function handleAddToCart() {
    if (!user) {
      navigate('/login');
      return;
    }
    setAdding(true);
    try {
      await addItem(product.id, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } finally {
      setAdding(false);
    }
  }

  if (error) return <p className="text-center text-red-500">Could not load product: {error}</p>;
  if (!product) return <p className="text-center text-stone-400">Loading…</p>;

  const image = product.images?.find((img) => img.is_primary) ?? product.images?.[0];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      <div className="aspect-square rounded-2xl bg-amber-100 overflow-hidden">
        {image ? (
          <img src={image.image_url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-amber-300">No image</div>
        )}
      </div>

      <div>
        <p className="text-sm uppercase tracking-wide text-amber-500">{product.category?.name}</p>
        <h1 className="text-3xl font-semibold mt-1">{product.name}</h1>
        <p className="mt-4 text-2xl font-semibold text-amber-700">${product.price}</p>
        <p className="mt-4 text-stone-600 leading-relaxed">
          {product.description || 'No description available.'}
        </p>
        <p className="mt-2 text-sm text-stone-400">
          {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
        </p>

        <div className="mt-6 flex items-center gap-4">
          <input
            type="number"
            min="1"
            max={product.stock_quantity}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-20 border border-stone-300 rounded-lg px-3 py-2"
          />
          <button
            onClick={handleAddToCart}
            disabled={adding || product.stock_quantity === 0}
            className="bg-amber-400 text-stone-900 px-6 py-2 rounded-lg hover:bg-amber-500 disabled:opacity-50"
          >
            {added ? 'Added!' : adding ? 'Adding…' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
