import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCategories, getProducts } from '../services/products';
import ProductCard from '../components/ProductCard';
import HeroBanner from '../components/HeroBanner';
import CategoryStrip from '../components/CategoryStrip';
import PromoBanner from '../components/PromoBanner';

export default function Home() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const categoryId = searchParams.get('category');

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
      })
      .catch((err) => setError(err.message));
  }, []);

  const visibleProducts = products?.filter((p) => {
    const matchesCategory = categoryId ? String(p.category?.id) === categoryId : true;
    const matchesSearch = search
      ? p.name.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const activeCategoryName = categories.find((c) => String(c.id) === categoryId)?.name;

  return (
    <div>
      <HeroBanner />
      <CategoryStrip categories={categories} />
      <PromoBanner />

      <section id="products" className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-semibold text-stone-800 capitalize">
            {search ? `Results for "${search}"` : activeCategoryName ? activeCategoryName : 'Trending gifts'}
          </h2>
          {(search || categoryId) && (
            <button
              onClick={() => setSearchParams({})}
              className="text-sm text-amber-700 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {error && <p className="text-center text-red-500">Could not reach backend: {error}</p>}
        {!error && !products && <p className="text-center text-stone-400">Loading products…</p>}
        {products && visibleProducts.length === 0 && (
          <p className="text-center text-stone-400">No products found.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
