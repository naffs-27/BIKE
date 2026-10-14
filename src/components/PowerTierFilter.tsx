import { Gauge, Filter, Zap } from 'lucide-react';

interface FilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedTier: string;
  onSelectTier: (tier: string) => void;
  totalArticlesCount: number;
  filteredCount: number;
}

export function PowerTierFilter({
  selectedCategory,
  onSelectCategory,
  selectedTier,
  onSelectTier,
  totalArticlesCount,
  filteredCount,
}: FilterProps) {
  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Fundamentals', label: 'Fundamentals & Dyno' },
    { id: 'Power Tiers', label: 'Power Tiers' },
    { id: 'Physics & Speed', label: 'Physics & Aerodynamics' },
    { id: 'Rider Guides', label: 'Rider Skill Levels' },
    { id: 'Superbikes', label: 'Superbikes' },
    { id: 'Comparative Tech', label: 'Comparative Tech' },
    { id: 'Buyer Guides', label: 'Buyer Guides' },
  ];

  const hpTiers = [
    { id: 'all', label: 'All Tiers', range: '10 - 240 HP' },
    { id: '< 40 HP', label: 'Under 40 HP', range: 'Commuters & Starters' },
    { id: '40 - 75 HP', label: '40 – 75 HP', range: 'Lightweight Sport' },
    { id: '75 - 120 HP', label: '75 – 120 HP', range: 'Middleweight Peak' },
    { id: '120 - 180 HP', label: '120 – 180 HP', range: 'Supersport & Tourer' },
    { id: '180+ HP', label: '180+ HP', range: 'Homologation Superbikes' },
  ];

  return (
    <div id="power-tiers-section" className="space-y-6 scroll-mt-24">
      {/* Horsepower Level Selector Bar */}
      <div className="p-5 rounded-2xl bg-[#0a1813] border border-emerald-900/70 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-950/80 pb-3">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Filter By Motorcycle Horsepower Level
            </h3>
          </div>
          <span className="text-xs font-mono text-stone-400">
            Showing {filteredCount} of {totalArticlesCount} articles
          </span>
        </div>

        {/* Tier Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {hpTiers.map((tier) => {
            const isActive = selectedTier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => onSelectTier(tier.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 border-emerald-500 text-white shadow-sm'
                    : 'bg-[#07130f] border-emerald-950 text-stone-300 hover:border-emerald-800 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold font-mono">{tier.label}</div>
                <div className={`text-[11px] mt-0.5 truncate ${isActive ? 'text-emerald-100' : 'text-stone-500'}`}>
                  {tier.range}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'bg-[#0a1813] border border-emerald-950 text-stone-300 hover:text-white hover:border-emerald-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
