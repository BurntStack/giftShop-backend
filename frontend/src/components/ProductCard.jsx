import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const image = product.images?.find((img) => img.is_primary) ?? product.images?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to={`/products/${product.slug}`}
        className="group block rounded-2xl bg-white border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div className="aspect-square bg-amber-100 overflow-hidden">
          {image ? (
            <img
              src={image.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-amber-300 text-sm">
              No image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-stone-800">{product.name}</h3>
          <p className="text-stone-500 text-sm">{product.category?.name}</p>
          <p className="mt-2 font-semibold text-amber-700">${product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}
