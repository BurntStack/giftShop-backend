import { FiClock, FiShield, FiTruck } from 'react-icons/fi';

const PERKS = [
  { icon: FiTruck, title: 'Same-day delivery', text: 'Order before 4pm for select cities' },
  { icon: FiShield, title: 'Quality guaranteed', text: 'Handpicked and quality-checked' },
  { icon: FiClock, title: 'On-time, every time', text: 'Track your gift right to the door' },
];

export default function PromoBanner() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-4">
      <div className="grid sm:grid-cols-3 gap-4">
        {PERKS.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex items-center gap-4 bg-white rounded-2xl border border-stone-200 px-5 py-4"
          >
            <span className="w-11 h-11 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Icon size={20} />
            </span>
            <div>
              <p className="font-medium text-stone-800 text-sm">{title}</p>
              <p className="text-xs text-stone-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
