import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiMail, FiMapPin, FiPhone, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-xl font-semibold text-amber-700 mb-3">Bloom</h3>
          <p className="text-sm text-stone-500 leading-relaxed">
            Thoughtfully curated gifts for every occasion — handpicked, wrapped with care,
            and delivered on time.
          </p>
          <div className="flex gap-4 mt-4 text-stone-400">
            <a href="#" aria-label="Facebook" className="hover:text-amber-700"><FiFacebook size={18} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-amber-700"><FiInstagram size={18} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-amber-700"><FiTwitter size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-stone-800 mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-stone-500">
            <li><Link to="/" className="hover:text-amber-700">All gifts</Link></li>
            <li><Link to="/cart" className="hover:text-amber-700">Your cart</Link></li>
            <li><Link to="/register" className="hover:text-amber-700">Create an account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-stone-800 mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-stone-500">
            <li><Link to="/about" className="hover:text-amber-700">About us</Link></li>
            <li><Link to="/contact" className="hover:text-amber-700">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-stone-800 mb-3">Get in touch</h4>
          <ul className="space-y-3 text-sm text-stone-500">
            <li className="flex items-start gap-2">
              <FiMapPin className="mt-0.5 shrink-0" size={16} />
              <span>221 Petal Street, Bengaluru, India</span>
            </li>
            <li className="flex items-center gap-2">
              <FiPhone size={16} />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <FiMail size={16} />
              <span>hello@bloomgifts.example</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-100 py-4 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} Bloom Gift Shop. All rights reserved.
      </div>
    </footer>
  );
}
