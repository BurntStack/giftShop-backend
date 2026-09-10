import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleSubmit(e) {
    e.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:hello@bloomgifts.example?subject=Message from Bloom site&body=${body}`;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
      <div>
        <h1 className="text-3xl font-semibold mb-6">Get in touch</h1>
        <p className="text-stone-600 mb-8">
          Questions about an order, a bulk gifting request, or just want to say hello?
          Reach us any of these ways.
        </p>
        <ul className="space-y-4 text-stone-600">
          <li className="flex items-center gap-3">
            <FiMapPin className="text-amber-700" /> 221 Petal Street, Bengaluru, India
          </li>
          <li className="flex items-center gap-3">
            <FiPhone className="text-amber-700" /> +91 98765 43210
          </li>
          <li className="flex items-center gap-3">
            <FiMail className="text-amber-700" /> hello@bloomgifts.example
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-stone-300 rounded-lg px-4 py-2"
        />
        <input
          type="email"
          required
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-stone-300 rounded-lg px-4 py-2"
        />
        <textarea
          required
          rows={5}
          placeholder="Your message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border border-stone-300 rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="w-full bg-amber-400 text-stone-900 py-2 rounded-lg hover:bg-amber-500"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
