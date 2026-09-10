import { Link } from 'react-router-dom';
import {
  FiCoffee, FiGift, FiHeart, FiPackage, FiStar, FiSun,
} from 'react-icons/fi';

const ICONS_BY_KEYWORD = [
  [/mug|cup|coffee/i, FiCoffee],
  [/flower|bloom|plant/i, FiSun],
  [/personal/i, FiHeart],
  [/hamper|basket/i, FiPackage],
  [/new|arrival/i, FiStar],
];

function iconFor(name) {
  const match = ICONS_BY_KEYWORD.find(([pattern]) => pattern.test(name));
  return match ? match[1] : FiGift;
}

export default function CategoryStrip({ categories }) {
  if (!categories?.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex gap-6 overflow-x-auto pb-2">
        <Link
          to="/"
          className="flex flex-col items-center gap-2 shrink-0 group"
        >
          <span className="w-16 h-16 rounded-full bg-white border border-stone-200 flex items-center justify-center text-amber-500 group-hover:border-amber-400 transition-colors">
            <FiGift size={24} />
          </span>
          <span className="text-xs font-medium text-stone-600 capitalize">All gifts</span>
        </Link>
        {categories.map((cat) => {
          const Icon = iconFor(cat.name);
          return (
            <Link
              key={cat.id}
              to={`/?category=${cat.id}`}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <span className="w-16 h-16 rounded-full bg-white border border-stone-200 flex items-center justify-center text-amber-500 group-hover:border-amber-400 transition-colors">
                <Icon size={24} />
              </span>
              <span className="text-xs font-medium text-stone-600 capitalize">{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
