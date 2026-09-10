import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';

const LINKS = [
  'Birthday', 'Occasions', 'Anniversary', 'Flowers', 'Cakes', 'Personalised',
  'Plants', 'Chocolates', 'Lifestyle', 'Hatke', 'LUXE', 'Hampers', 'Balloons', 'Global',
];

export default function CategoryNav() {
  return (
    <nav className="bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-7 overflow-x-auto py-3 text-sm font-medium text-stone-700 whitespace-nowrap">
          {LINKS.map((label) => (
            <Link
              key={label}
              to={`/?search=${encodeURIComponent(label)}`}
              className="flex items-center gap-1 shrink-0 hover:text-amber-700 transition-colors"
            >
              {label}
              <FiChevronDown size={14} className="text-stone-400" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
