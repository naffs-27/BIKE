import { useState, useEffect, useMemo } from 'react';
import { ARTICLES } from './data/articles';
import { Article } from './types/article';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { PowerTierFilter } from './components/PowerTierFilter';
import { HorsepowerCalculator } from './components/HorsepowerCalculator';
import { HorsepowerQuiz } from './components/HorsepowerQuiz';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { SEOHead } from './components/SEOHead';
import { Search, ArrowRight, Gauge, HelpCircle, Calculator, SlidersHorizontal, BookOpen } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'article' | 'quiz' | 'calculator'>('home');
  const [activeArticleSlug, setActiveArticleSlug] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('apexline_moto_saved_articles');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState<boolean>(false);

  // Sync state from URL pathname on initial load and browser back/forward
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;

      if (path.startsWith('/blog/')) {
        const slug = path.replace('/blog/', '').replace(/\/$/, '');
        const matchingArticle = ARTICLES.find((a) => a.slug === slug);
        if (matchingArticle) {
          setActiveArticleSlug(slug);
          setCurrentView('article');
          return;
        }
      } else if (path === '/quiz') {
        setCurrentView('quiz');
        return;
      } else if (path === '/calculator') {
        setCurrentView('calculator');
        return;
      }

      // Default to home
      setCurrentView('home');
      setActiveArticleSlug('');
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('apexline_moto_saved_articles', JSON.stringify(savedArticleIds));
    } catch {
      // ignore localStorage errors
    }
  }, [savedArticleIds]);

  // Navigate functions with History pushState
  const navigateToArticle = (slug: string) => {
    setActiveArticleSlug(slug);
    setCurrentView('article');
    window.history.pushState(null, '', `/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    setActiveArticleSlug('');
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToQuiz = () => {
    setCurrentView('quiz');
    window.history.pushState(null, '', '/quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCalculator = () => {
    setCurrentView('calculator');
    window.history.pushState(null, '', '/calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSaveArticle = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedArticleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearSaved = () => {
    setSavedArticleIds([]);
  };

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      // Search matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(q);
        const matchesSubtitle = article.subtitle.toLowerCase().includes(q);
        const matchesExcerpt = article.excerpt.toLowerCase().includes(q);
        const matchesCategory = article.category.toLowerCase().includes(q);
        const matchesProducts = article.productRecommendations.some(
          (p) => p.model.toLowerCase().includes(q) || p.engine.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesSubtitle && !matchesExcerpt && !matchesCategory && !matchesProducts) {
          return false;
        }
      }

      // Category matching
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }

      // Horsepower tier matching
      if (selectedTier !== 'all') {
        if (article.hpTier !== selectedTier && article.hpTier !== 'All Tiers') {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedTier]);

  // Active article object
  const currentArticle = useMemo(() => {
    return ARTICLES.find((a) => a.slug === activeArticleSlug) || ARTICLES[0];
  }, [activeArticleSlug]);

  // Saved articles list
  const savedArticles = useMemo(() => {
    return ARTICLES.filter((a) => savedArticleIds.includes(a.id));
  }, [savedArticleIds]);

  const scrollToArticlesSection = () => {
    const el = document.getElementById('articles-grid-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTiersSection = () => {
    const el = document.getElementById('power-tiers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#071410] text-stone-200 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Global SEO controller */}
      <SEOHead article={currentView === 'article' ? currentArticle : undefined} />

      {/* Top Bar Contract Header */}
      <Header
        currentView={currentView}
        savedCount={savedArticleIds.length}
        onNavigateHome={navigateToHome}
        onNavigateQuiz={navigateToQuiz}
        onNavigateCalculator={navigateToCalculator}
        onOpenSaved={() => setBookmarksDrawerOpen(true)}
        onScrollToTiers={scrollToTiersSection}
        onScrollToArticles={scrollToArticlesSection}
      />

      {/* Bookmarks Drawer Modal */}
      <BookmarksDrawer
        isOpen={bookmarksDrawerOpen}
        onClose={() => setBookmarksDrawerOpen(false)}
        savedArticles={savedArticles}
        onSelectArticle={navigateToArticle}
        onRemoveBookmark={(id) => setSavedArticleIds((prev) => prev.filter((item) => item !== id))}
        onClearAll={handleClearSaved}
      />

      {/* MAIN CONTENT ROUTING */}
      {currentView === 'article' && (
        <ArticleView
          article={currentArticle}
          isSaved={savedArticleIds.includes(currentArticle.id)}
          onToggleSave={toggleSaveArticle}
          onSelectArticle={navigateToArticle}
          onBackToHome={navigateToHome}
        />
      )}

      {currentView === 'quiz' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <button
              onClick={navigateToHome}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-emerald-400">Rider Quiz</span>
          </div>

          <HorsepowerQuiz
            onSelectArticle={navigateToArticle}
            onExploreTier={(tier) => {
              setSelectedTier(tier);
              navigateToHome();
              setTimeout(scrollToArticlesSection, 100);
            }}
          />
        </main>
      )}

      {currentView === 'calculator' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <button
              onClick={navigateToHome}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-emerald-400">HP-to-Weight Calculator</span>
          </div>

          <HorsepowerCalculator onSelectArticle={navigateToArticle} />
        </main>
      )}

      {currentView === 'home' && (
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            featuredArticle={ARTICLES[0]}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectArticle={navigateToArticle}
            onNavigateQuiz={navigateToQuiz}
            onNavigateCalculator={navigateToCalculator}
          />

          {/* Main Content Area */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
            {/* Filter Component */}
            <PowerTierFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedTier={selectedTier}
              onSelectTier={setSelectedTier}
              totalArticlesCount={ARTICLES.length}
              filteredCount={filteredArticles.length}
            />

            {/* Articles Grid Section */}
            <section id="articles-grid-section" className="space-y-6 scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-emerald-950 pb-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Motorcycle Horsepower & Performance Library
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1">
                    Explore all 10 long-form engineering guides, chassis dynamics, and real buyer breakdowns.
                  </p>
                </div>

                {searchQuery && (
                  <div className="text-xs text-emerald-400">
                    Results for &ldquo;<span className="text-white font-medium">{searchQuery}</span>&rdquo; ({filteredArticles.length})
                  </div>
                )}
              </div>

              {/* Grid or Empty State */}
              {filteredArticles.length === 0 ? (
                <div className="text-center py-20 rounded-2xl bg-[#091712] border border-emerald-950 space-y-4">
                  <Search className="w-10 h-10 text-stone-600 mx-auto" />
                  <h3 className="text-lg font-bold text-white">No articles match your filter criteria</h3>
                  <p className="text-xs text-stone-400 max-w-sm mx-auto">
                    Try adjusting your search query or reset the horsepower tier filters to explore all 10 guides.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedTier('all');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      isSaved={savedArticleIds.includes(article.id)}
                      onSelect={navigateToArticle}
                      onToggleSave={toggleSaveArticle}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* In-Page Interactive Telemetry Simulator Widget */}
            <section className="pt-10">
              <HorsepowerCalculator onSelectArticle={navigateToArticle} />
            </section>

            {/* In-Page Rider Level Quiz Widget */}
            <section className="pt-10">
              <HorsepowerQuiz
                onSelectArticle={navigateToArticle}
                onExploreTier={(tier) => {
                  setSelectedTier(tier);
                  scrollToArticlesSection();
                }}
              />
            </section>

            {/* Horsepower Quick Reference Table */}
            <section className="p-6 sm:p-8 rounded-2xl bg-[#091712] border border-emerald-900/60 space-y-6">
              <div className="border-b border-emerald-950 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <Gauge className="w-4 h-4" />
                  <span>Engineering Reference</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Motorcycle Horsepower Tiers at a Glance
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Standard power bands, typical displacement, 0-60 sprint times, and recommended rider applications.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-emerald-950 text-stone-400 uppercase tracking-wider font-mono">
                      <th className="py-3 px-4">HP Tier</th>
                      <th className="py-3 px-4">Engine Displacement</th>
                      <th className="py-3 px-4">0-60 MPH</th>
                      <th className="py-3 px-4">Top Speed Range</th>
                      <th className="py-3 px-4">Primary Discipline</th>
                      <th className="py-3 px-4">Representative Models</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-950/60 text-stone-300">
                    <tr className="hover:bg-emerald-950/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-emerald-400 font-mono">10 – 25 HP</td>
                      <td className="py-3 px-4">125cc – 250cc Single</td>
                      <td className="py-3 px-4 font-mono">9.5 – 12.0s</td>
                      <td className="py-3 px-4 font-mono">60 – 78 mph</td>
                      <td className="py-3 px-4">Urban Commute & MSF</td>
                      <td className="py-3 px-4 text-stone-400">Honda Grom, Rebel 300</td>
                    </tr>
                    <tr className="hover:bg-emerald-950/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-emerald-400 font-mono">40 – 55 HP</td>
                      <td className="py-3 px-4">300cc – 500cc Twin</td>
                      <td className="py-3 px-4 font-mono">4.3 – 5.2s</td>
                      <td className="py-3 px-4 font-mono">105 – 118 mph</td>
                      <td className="py-3 px-4">A2 Licence & Novice Sport</td>
                      <td className="py-3 px-4 text-stone-400">Ninja 500, CB500F, Duke 390</td>
                    </tr>
                    <tr className="hover:bg-emerald-950/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-emerald-400 font-mono">70 – 95 HP</td>
                      <td className="py-3 px-4">650cc – 800cc Twin/Triple</td>
                      <td className="py-3 px-4 font-mono">3.2 – 3.7s</td>
                      <td className="py-3 px-4 font-mono">130 – 148 mph</td>
                      <td className="py-3 px-4">The Real-World Road Apex</td>
                      <td className="py-3 px-4 text-stone-400">Yamaha MT-07, GSX-8S, RS 660</td>
                    </tr>
                    <tr className="hover:bg-emerald-950/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-emerald-400 font-mono">120 – 160 HP</td>
                      <td className="py-3 px-4">600cc 4-Cyl / 1,300cc ADV</td>
                      <td className="py-3 px-4 font-mono">2.9 – 3.2s</td>
                      <td className="py-3 px-4 font-mono">155 – 170 mph</td>
                      <td className="py-3 px-4">Supersports & Continental Tourers</td>
                      <td className="py-3 px-4 text-stone-400">ZX-6R, Street Triple RS, R 1300 GS</td>
                    </tr>
                    <tr className="hover:bg-emerald-950/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-emerald-400 font-mono">180 – 230+ HP</td>
                      <td className="py-3 px-4">1,000cc – 1,100cc Superbike / Supercharged</td>
                      <td className="py-3 px-4 font-mono">2.6 – 2.9s</td>
                      <td className="py-3 px-4 font-mono">186 – 210+ mph</td>
                      <td className="py-3 px-4">Track Homologation & Racing</td>
                      <td className="py-3 px-4 text-stone-400">Panigale V4, S 1000 RR, Ninja H2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      )}

      {/* Footer */}
      <Footer
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          navigateToHome();
          setTimeout(scrollToArticlesSection, 100);
        }}
        onNavigateHome={navigateToHome}
      />
    </div>
  );
}
