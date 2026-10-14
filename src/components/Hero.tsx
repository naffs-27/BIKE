import { Search, X, ArrowRight, Gauge, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Article } from '../types/article';

interface HeroProps {
  featuredArticle: Article;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectArticle: (slug: string) => void;
  onNavigateQuiz: () => void;
  onNavigateCalculator: () => void;
}

export function Hero({
  featuredArticle,
  searchQuery,
  onSearchChange,
  onSelectArticle,
  onNavigateQuiz,
  onNavigateCalculator,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 border-b border-emerald-950/70">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-900/20 via-emerald-950/10 to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header & Search Strip */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3.5 py-1.5 rounded-full">
            <Gauge className="w-3.5 h-3.5 text-emerald-400" />
            <span>The Technical Authority on Motorcycle Dynamics & Horsepower</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Motorcycle Horsepower <br className="hidden sm:inline" />
            <span className="text-emerald-400 font-extrabold">Decoded & Measured</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-light max-w-2xl mx-auto">
            From 10 HP urban commuters to 230+ HP MotoGP-derived weapons: in-depth technical guides, dyno telemetry, power-to-weight physics, and buyer frameworks.
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by topic, HP tier, bike model (e.g. 'Yamaha MT-07', 'Torque', '600cc')..."
                className="w-full pl-11 pr-10 py-3 bg-[#081511] border border-emerald-800/80 focus:border-emerald-500 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none transition-colors shadow-lg shadow-black/40"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 p-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
                  title="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Featured Editorial Spotlight Card */}
        <div
          onClick={() => onSelectArticle(featuredArticle.slug)}
          className="group relative rounded-2xl overflow-hidden bg-[#0a1713] border border-emerald-900/80 hover:border-emerald-600 transition-all duration-300 cursor-pointer shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Column */}
            <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto min-h-[280px] lg:min-h-[420px] overflow-hidden bg-[#06100d]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <span className="uppercase tracking-wider">Featured Technical Masterclass</span>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span className="font-mono text-stone-300">{featuredArticle.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm text-stone-300 leading-relaxed line-clamp-3">
                  {featuredArticle.subtitle}
                </p>

                {/* Key takeaway preview */}
                <div className="p-3.5 rounded-lg bg-[#06120e] border border-emerald-950/80 text-xs text-stone-300 space-y-1">
                  <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dyno Fundamental:</span>
                  </div>
                  <div>HP = (Torque in lb-ft × RPM) / 5,252. The fundamental law of all motorcycle engines.</div>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-950 flex items-center justify-between">
                <div className="text-xs text-stone-400">
                  By {featuredArticle.author.name}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Read full masterclass</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tools Access Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={onNavigateCalculator}
            className="p-5 rounded-xl bg-[#081712] border border-emerald-950 hover:border-emerald-700 transition-colors cursor-pointer flex items-center justify-between group"
          >
            <div className="space-y-1">
              <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Interactive Tool</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                Power-to-Weight & Speed Calculator
              </h3>
              <p className="text-xs text-stone-400">
                Input curb weight and BHP to simulate aerodynamic top speeds and 0-60 sprint times.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
          </div>

          <div
            onClick={onNavigateQuiz}
            className="p-5 rounded-xl bg-[#081712] border border-emerald-950 hover:border-emerald-700 transition-colors cursor-pointer flex items-center justify-between group"
          >
            <div className="space-y-1">
              <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5" />
                <span>Rider Finder</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                Horsepower & Riding Level Quiz
              </h3>
              <p className="text-xs text-stone-400">
                Answer 4 quick questions to receive tailored horsepower recommendations and bike models.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
