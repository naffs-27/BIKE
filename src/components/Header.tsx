import { useState } from 'react';
import { Bookmark, Menu, X, Gauge, HelpCircle, Calculator, Compass } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'article' | 'quiz' | 'calculator';
  savedCount: number;
  onNavigateHome: () => void;
  onNavigateQuiz: () => void;
  onNavigateCalculator: () => void;
  onOpenSaved: () => void;
  onScrollToTiers?: () => void;
  onScrollToArticles?: () => void;
}

export function Header({
  currentView,
  savedCount,
  onNavigateHome,
  onNavigateQuiz,
  onNavigateCalculator,
  onOpenSaved,
  onScrollToTiers,
  onScrollToArticles,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0b1713]/95 backdrop-blur-md border-b border-emerald-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            <span className="w-8 h-8 rounded-lg bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
              <Gauge className="w-4 h-4" />
            </span>
            <span>ApexLine Moto</span>
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
            <button
              onClick={() => {
                if (currentView !== 'home') onNavigateHome();
                if (onScrollToArticles) setTimeout(onScrollToArticles, 50);
              }}
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              All Articles
            </button>

            <button
              onClick={() => {
                if (currentView !== 'home') onNavigateHome();
                if (onScrollToTiers) setTimeout(onScrollToTiers, 50);
              }}
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Power Tiers
            </button>

            <button
              onClick={onNavigateCalculator}
              className={`hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'calculator' ? 'text-emerald-400 font-semibold' : ''
              }`}
            >
              HP Calculator
            </button>

            <button
              onClick={onNavigateQuiz}
              className={`hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'quiz' ? 'text-emerald-400 font-semibold' : ''
              }`}
            >
              Rider Quiz
            </button>

            <button
              onClick={onOpenSaved}
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-stone-300"
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved ({savedCount})</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateQuiz}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm shadow-emerald-950 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Find Your HP</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a1511] border-b border-emerald-950 px-4 pt-3 pb-5 space-y-2 text-sm">
          <button
            onClick={() => {
              onNavigateHome();
              setMobileMenuOpen(false);
              if (onScrollToArticles) setTimeout(onScrollToArticles, 100);
            }}
            className="w-full text-left px-3 py-2 rounded-md text-stone-300 hover:bg-emerald-950/60 hover:text-emerald-400"
          >
            All 10 Blog Guides
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              setMobileMenuOpen(false);
              if (onScrollToTiers) setTimeout(onScrollToTiers, 100);
            }}
            className="w-full text-left px-3 py-2 rounded-md text-stone-300 hover:bg-emerald-950/60 hover:text-emerald-400"
          >
            Power Tiers (10 to 200+ HP)
          </button>
          <button
            onClick={() => {
              onNavigateCalculator();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md text-stone-300 hover:bg-emerald-950/60 hover:text-emerald-400 flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>HP-to-Weight Calculator</span>
          </button>
          <button
            onClick={() => {
              onNavigateQuiz();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md text-stone-300 hover:bg-emerald-950/60 hover:text-emerald-400 flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Rider Level Quiz</span>
          </button>
          <button
            onClick={() => {
              onOpenSaved();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md text-stone-300 hover:bg-emerald-950/60 hover:text-emerald-400 flex items-center gap-2"
          >
            <Bookmark className="w-4 h-4 text-emerald-400" />
            <span>Saved Reading List ({savedCount})</span>
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                onNavigateQuiz();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500"
            >
              Start Horsepower Recommendation Quiz
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
