import { motion } from 'framer-motion';

export default function HeroBanner() {
  function scrollToProducts() {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="bg-gradient-to-br from-amber-100 via-amber-50 to-amber-50">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="uppercase tracking-widest text-amber-500 text-sm font-medium mb-3">
            New season, new gifts
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-stone-800 leading-tight">
            Gifts worth <span className="text-amber-700">giving</span>
          </h1>
          <p className="mt-4 text-stone-600 max-w-md">
            Handpicked favorites for birthdays, anniversaries, and every reason
            in between — wrapped with care and delivered on time.
          </p>
          <button
            onClick={scrollToProducts}
            className="mt-8 bg-amber-400 text-stone-900 px-8 py-3 rounded-full font-medium hover:bg-amber-500 transition-colors"
          >
            Shop the collection
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="aspect-[4/3] rounded-3xl bg-white/60 border border-amber-200 shadow-sm flex items-center justify-center overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
            alt="Curated gift box with flowers"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
