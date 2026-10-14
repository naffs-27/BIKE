import { Gauge, ShieldCheck, Mail, ArrowUp } from 'lucide-react';
import { useState } from 'react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onNavigateHome: () => void;
}

export function Footer({ onSelectCategory, onNavigateHome }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07110e] border-t border-emerald-950/80 text-stone-400 text-sm mt-24">
      {/* Newsletter Strip */}
      <div className="border-b border-emerald-950/60 bg-[#091512]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Dyno Telemetry & Road Tests</span>
              <h3 className="text-xl font-bold text-white mt-1">Receive In-Depth Motorcycle Technical Analyses</h3>
              <p className="text-stone-400 text-sm mt-1">
                Bi-weekly breakdowns of chassis dyno charts, torque curves, and real-world performance tests. No spam.
              </p>
            </div>

            <div className="w-full md:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-4 py-2.5 rounded-lg text-sm">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Subscribed! Check your inbox for our dyno benchmark archive.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="px-3.5 py-2 text-sm bg-[#06100c] border border-emerald-900/60 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 w-full"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg whitespace-nowrap transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-lg font-bold text-white hover:text-emerald-400 transition-colors text-left"
            >
              <span className="w-7 h-7 rounded-md bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
                <Gauge className="w-3.5 h-3.5" />
              </span>
              <span>ApexLine Moto</span>
            </button>
            <p className="text-xs text-stone-400 leading-relaxed">
              The premier technical journal dedicated to motorcycle horsepower physics, powerband engineering, chassis dynamics, and real-world performance evaluation.
            </p>
            <div className="text-xs text-stone-500">
              Published and edited by certified telemetry tuners and track instructors.
            </div>
          </div>

          {/* Topics Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">Editorial Topics</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('Fundamentals')} className="hover:text-emerald-400 transition-colors">
                  Horsepower & Torque Fundamentals
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Power Tiers')} className="hover:text-emerald-400 transition-colors">
                  10 HP to 200+ HP Classification
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Physics & Speed')} className="hover:text-emerald-400 transition-colors">
                  Power-to-Weight & Aerodynamics
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Rider Guides')} className="hover:text-emerald-400 transition-colors">
                  Beginner vs Expert Power Curves
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Superbikes')} className="hover:text-emerald-400 transition-colors">
                  World’s Highest Horsepower Bikes
                </button>
              </li>
            </ul>
          </div>

          {/* Horsepower Classes Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">Power Tiers</h4>
            <ul className="space-y-2 text-xs">
              <li className="text-stone-400">
                <span className="text-emerald-400 font-mono">Under 40 HP</span> — Urban & A2 Starters
              </li>
              <li className="text-stone-400">
                <span className="text-emerald-400 font-mono">40 - 75 HP</span> — Lightweight Twins & Scramblers
              </li>
              <li className="text-stone-400">
                <span className="text-emerald-400 font-mono">75 - 120 HP</span> — The Middleweight Sweet Spot
              </li>
              <li className="text-stone-400">
                <span className="text-emerald-400 font-mono">120 - 180 HP</span> — Supersport & Heavy Tourers
              </li>
              <li className="text-stone-400">
                <span className="text-emerald-400 font-mono">180 - 220+ HP</span> — Homologation Superbikes
              </li>
            </ul>
          </div>

          {/* Safety & Legal Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">Rider Safety Notice</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Motorcycle operation involves inherent physical risks. Horsepower benchmarks are recorded on controlled closed circuits or chassis dynamometers. Always wear complete CE/DOT/ECE-certified protective gear (helmet, armored jacket, gloves, pants, and boots) and ride strictly within your training and local traffic laws.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-emerald-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © 2026 ApexLine Moto. All technical rights reserved. Built for motorcycle enthusiasts worldwide.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-300 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
