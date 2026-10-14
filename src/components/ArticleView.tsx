import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Clock,
  Calendar,
  User,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Twitter,
  Linkedin,
  Facebook,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Shield,
  Gauge,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { Article } from '../types/article';
import { ARTICLES } from '../data/articles';
import { SEOHead } from './SEOHead';

interface ArticleViewProps {
  article: Article;
  isSaved: boolean;
  onToggleSave: (id: string, e?: React.MouseEvent) => void;
  onSelectArticle: (slug: string) => void;
  onBackToHome: () => void;
}

export function ArticleView({
  article,
  isSaved,
  onToggleSave,
  onSelectArticle,
  onBackToHome,
}: ArticleViewProps) {
  // Reading progress state
  const [readingProgress, setReadingProgress] = useState(0);

  // Active TOC section
  const [activeHeadingId, setActiveHeadingId] = useState<string>(
    article.tableOfContents[0]?.id || ''
  );

  // Font size state ('normal' | 'large' | 'xl')
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');

  // FAQ accordion open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Copied link toast
  const [copied, setCopied] = useState(false);

  // Interactive Dyno Simulator state (demonstrating HP & Torque at RPM)
  const [simRpm, setSimRpm] = useState<number>(6000);

  // Scroll listener for reading progress bar and TOC spy
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }

      // Track active heading
      for (let i = article.tableOfContents.length - 1; i >= 0; i--) {
        const item = article.tableOfContents[i];
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveHeadingId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.slug]);

  // Handle Share Actions
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${article.title} via @ApexLineMoto`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Find previous and next articles
  const currentIndex = ARTICLES.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  // Related articles
  const relatedArticles = ARTICLES.filter((a) => article.relatedSlugs.includes(a.slug)).slice(0, 3);

  // Computed Dyno Values for the interactive widget
  // (Torque in lb-ft approx 50, HP = (50 * RPM) / 5252)
  const calcTorque = Math.round(52 - (simRpm > 7500 ? (simRpm - 7500) * 0.003 : 0));
  const calcHp = Math.round((calcTorque * simRpm) / 5252);

  // Font size class mapper
  const contentFontSizeClass =
    fontSize === 'large'
      ? 'text-lg sm:text-xl leading-relaxed'
      : fontSize === 'xl'
      ? 'text-xl sm:text-2xl leading-relaxed'
      : 'text-base sm:text-lg leading-relaxed';

  return (
    <div className="min-h-screen bg-[#091512] text-stone-200">
      <SEOHead article={article} />

      {/* Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-50 transition-all duration-75"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Floating Toast Notification */}
      {copied && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-700 text-white px-4 py-2.5 rounded-lg shadow-xl text-sm animate-fade-in">
          <Check className="w-4 h-4" />
          <span>Article link copied to clipboard!</span>
        </div>
      )}

      {/* Top Breadcrumb & Controls Strip */}
      <div className="bg-[#0b1a15] border-b border-emerald-950/80 sticky top-18 z-30 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-stone-400 truncate">
            <button
              onClick={onBackToHome}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Guides</span>
            </button>
            <ChevronRight className="w-3 h-3 text-stone-600 shrink-0" />
            <span className="text-emerald-400 shrink-0">{article.category}</span>
            <ChevronRight className="w-3 h-3 text-stone-600 shrink-0 hidden sm:inline" />
            <span className="text-stone-300 truncate hidden sm:inline max-w-xs">{article.title}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Font Size Adjuster */}
            <div className="hidden sm:flex items-center gap-1 bg-[#06100d] border border-emerald-950 rounded-lg p-0.5 text-xs text-stone-400">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'normal' ? 'bg-emerald-900/60 text-white font-semibold' : 'hover:text-white'}`}
                title="Normal text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'large' ? 'bg-emerald-900/60 text-white font-semibold' : 'hover:text-white'}`}
                title="Large text size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'xl' ? 'bg-emerald-900/60 text-white font-semibold' : 'hover:text-white'}`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={(e) => onToggleSave(article.id, e)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#06100d] border border-emerald-950 text-stone-300 hover:text-white hover:border-emerald-800'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            {/* Quick Share */}
            <button
              onClick={handleCopyLink}
              className="p-1.5 bg-[#06100d] border border-emerald-950 hover:border-emerald-800 text-stone-300 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Copy share link"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Article Header */}
        <header className="max-w-4xl mx-auto space-y-5">
          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-emerald-400">
            <span>{article.category}</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="font-mono text-stone-400">{article.hpTier}</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-stone-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-500" />
              {article.publishDate}
            </span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-stone-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-xl text-stone-300 leading-relaxed font-light">
            {article.subtitle}
          </p>

          {/* Author Block */}
          <div className="pt-4 border-t border-emerald-950/60 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full object-cover border border-emerald-700/60"
              />
              <div>
                <div className="text-sm font-bold text-white">{article.author.name}</div>
                <div className="text-xs text-stone-400">{article.author.role} · {article.author.experience}</div>
              </div>
            </div>

            {/* Social Share Strip */}
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span className="hidden sm:inline">Share:</span>
              <button
                onClick={handleShareTwitter}
                className="p-2 bg-[#06100d] hover:bg-emerald-950 hover:text-white rounded-lg transition-colors border border-emerald-950"
                title="Share on X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareLinkedIn}
                className="p-2 bg-[#06100d] hover:bg-emerald-950 hover:text-white rounded-lg transition-colors border border-emerald-950"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareFacebook}
                className="p-2 bg-[#06100d] hover:bg-emerald-950 hover:text-white rounded-lg transition-colors border border-emerald-950"
                title="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#06100d] hover:bg-emerald-950 hover:text-white rounded-lg transition-colors border border-emerald-950"
                title="Copy Link"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy URL</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Hero Image */}
        <figure className="max-w-5xl mx-auto my-10">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#07130f] border border-emerald-950">
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="text-xs text-stone-400 mt-2.5 text-center italic">
            {article.imageCaption}
          </figcaption>
        </figure>

        {/* Layout Grid: Content + Table of Contents Sidebar */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          {/* Main Article Body Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Key Takeaways Callout Box */}
            <section className="p-6 rounded-xl bg-[#0c1a15] border border-emerald-900/60 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Executive Technical Takeaways</span>
              </div>
              <ul className="space-y-3">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Article Headings & Content Sections */}
            {article.contentSections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 space-y-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight pt-2 border-b border-emerald-950/60 pb-3">
                  {section.heading}
                </h2>

                <div className={`space-y-4 text-stone-300 ${contentFontSizeClass}`}>
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Metrics Strip if present */}
                {section.metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                    {section.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-4 rounded-xl bg-[#07130f] border border-emerald-950"
                      >
                        <div className="text-xs text-stone-400">{metric.label}</div>
                        <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">
                          {metric.value}
                        </div>
                        <div className="text-xs text-stone-400 mt-1">{metric.subtext}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technical Callout */}
                {section.callout && (
                  <aside
                    className={`p-5 rounded-xl border my-6 ${
                      section.callout.type === 'technical'
                        ? 'bg-[#0a1813] border-emerald-800/80'
                        : section.callout.type === 'pro-tip'
                        ? 'bg-[#081813] border-emerald-600/60'
                        : section.callout.type === 'safety'
                        ? 'bg-[#1b1509] border-amber-900/60 text-amber-200'
                        : 'bg-[#0c1c17] border-emerald-900/80'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-emerald-400 mb-2">
                      {section.callout.type === 'technical' && <Gauge className="w-4 h-4" />}
                      {section.callout.type === 'pro-tip' && <Lightbulb className="w-4 h-4" />}
                      {section.callout.type === 'safety' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                      <span>{section.callout.title}</span>
                    </div>
                    <p className="text-sm text-stone-300 leading-relaxed">
                      {section.callout.text}
                    </p>
                  </aside>
                )}
              </section>
            ))}

            {/* Interactive Dyno Simulator Insight Card */}
            <section className="p-6 rounded-2xl bg-[#081612] border border-emerald-800/60 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <Sliders className="w-5 h-5 text-emerald-400" />
                  <span>Interactive Engine RPM & Horsepower Calculator</span>
                </div>
                <span className="text-xs text-emerald-400 font-mono">Equation: HP = (Torque × RPM) / 5,252</span>
              </div>
              <p className="text-xs text-stone-400">
                Drag the engine speed slider to see how torque and horsepower interact at various RPMs. Notice how at 5,252 RPM, horsepower and torque converge!
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span>Engine Speed: <strong className="text-emerald-400 text-sm">{simRpm.toLocaleString()} RPM</strong></span>
                  <span className="text-stone-500">Redline: 11,000 RPM</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="11000"
                  step="250"
                  value={simRpm}
                  onChange={(e) => setSimRpm(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 bg-[#050e0c] rounded-xl border border-emerald-950">
                  <div className="text-xs text-stone-400">Crankshaft Torque</div>
                  <div className="text-2xl font-bold font-mono text-white mt-1">{calcTorque} <span className="text-xs font-normal text-stone-400">lb-ft</span></div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Rotational force</div>
                </div>

                <div className="p-3.5 bg-[#050e0c] rounded-xl border border-emerald-950">
                  <div className="text-xs text-stone-400">Calculated Horsepower</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{calcHp} <span className="text-xs font-normal text-stone-400">HP</span></div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Rate of work done</div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3.5 bg-[#050e0c] rounded-xl border border-emerald-950">
                  <div className="text-xs text-stone-400">Crossover Relation</div>
                  <div className="text-sm font-semibold text-stone-200 mt-2">
                    {simRpm < 5252 ? 'Torque > HP' : simRpm === 5252 ? 'Torque = HP' : 'HP > Torque'}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    {simRpm < 5252 ? 'Low-RPM pulling grunt' : 'High-RPM velocity build'}
                  </div>
                </div>
              </div>
            </section>

            {/* Product Recommendations / Benchmark Motorcycle Cards */}
            <section id="product-recommendations" className="scroll-mt-24 space-y-6">
              <div className="border-b border-emerald-950/60 pb-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Benchmark Motorcycles & Product Specifications
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  Real production models illustrating the horsepower characteristics discussed in this guide.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {article.productRecommendations.map((prod, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[#0c1a15] border border-emerald-900/60 flex flex-col justify-between space-y-4 hover:border-emerald-700 transition-colors"
                  >
                    <div>
                      <div className="text-xs text-emerald-400 font-medium">{prod.category}</div>
                      <h3 className="text-lg font-bold text-white mt-0.5">{prod.model}</h3>
                      <div className="text-xs font-mono text-stone-400 mt-1">{prod.engine}</div>

                      <div className="mt-4 pt-3 border-t border-emerald-950/80 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-stone-400">Horsepower:</span>
                          <span className="font-mono font-bold text-emerald-400">{prod.horsepower}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Torque:</span>
                          <span className="font-mono text-stone-200">{prod.torque}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Curb Weight:</span>
                          <span className="font-mono text-stone-200">{prod.curbWeight}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Top Speed:</span>
                          <span className="font-mono text-stone-200">{prod.topSpeed}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-emerald-950/50">
                          <span className="text-stone-400">Est. MSRP:</span>
                          <span className="font-mono font-semibold text-white">{prod.msrp}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-emerald-950/80">
                      <div className="text-[11px] text-stone-400 italic">
                        <strong>Highlight:</strong> {prod.keyFeature}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pros and Cons Section */}
            <section id="pros-cons" className="scroll-mt-24 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-b border-emerald-950/60 pb-3">
                Pros and Cons Breakdown
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Pros */}
                <div className="p-6 rounded-xl bg-[#091813] border border-emerald-800/80 space-y-4">
                  <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{article.prosAndCons.prosTitle}</span>
                  </h3>
                  <ul className="space-y-3">
                    {article.prosAndCons.pros.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300">
                        <span className="text-emerald-400 font-bold shrink-0">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="p-6 rounded-xl bg-[#14120c] border border-amber-900/60 space-y-4">
                  <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>{article.prosAndCons.consTitle}</span>
                  </h3>
                  <ul className="space-y-3">
                    {article.prosAndCons.cons.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300">
                        <span className="text-amber-400 font-bold shrink-0">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQs Section */}
            <section id="faqs" className="scroll-mt-24 space-y-6">
              <div className="border-b border-emerald-950/60 pb-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  Expert answers to the most common rider inquiries on this topic.
                </p>
              </div>

              <div className="space-y-3">
                {article.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl bg-[#0a1612] border border-emerald-950 overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-emerald-950/40 transition-colors cursor-pointer"
                      >
                        <span className="font-semibold text-sm sm:text-base text-white">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-emerald-950/60">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Author Bio Box */}
            <div className="p-6 rounded-2xl bg-[#081511] border border-emerald-950/80 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-cover border-2 border-emerald-700/60 shrink-0"
              />
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="text-sm font-bold text-white">{article.author.name}</div>
                <div className="text-xs text-emerald-400">{article.author.role}</div>
                <p className="text-xs text-stone-400 leading-relaxed pt-1">
                  Specializes in chassis dynamics, motorcycle telemetry analysis, and track instruction. With {article.author.experience}, Julian and the ApexLine Moto team focus on empirical motorcycle physics rather than marketing hyperbole.
                </p>
              </div>
            </div>

            {/* Next / Previous Article Navigation */}
            <div className="pt-8 border-t border-emerald-950/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <button
                  onClick={() => onSelectArticle(prevArticle.slug)}
                  className="p-4 rounded-xl bg-[#081511] border border-emerald-950 hover:border-emerald-800 text-left transition-colors cursor-pointer group"
                >
                  <div className="text-xs text-stone-400 flex items-center gap-1 group-hover:text-emerald-400">
                    <ArrowLeft className="w-3 h-3" />
                    <span>Previous Guide</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {prevArticle.title}
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextArticle && (
                <button
                  onClick={() => onSelectArticle(nextArticle.slug)}
                  className="p-4 rounded-xl bg-[#081511] border border-emerald-950 hover:border-emerald-800 text-right transition-colors cursor-pointer group"
                >
                  <div className="text-xs text-stone-400 flex items-center justify-end gap-1 group-hover:text-emerald-400">
                    <span>Next Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="text-sm font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {nextArticle.title}
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Sticky Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="p-5 rounded-xl bg-[#0a1612] border border-emerald-950">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 pb-2 border-b border-emerald-950">
                  Table of Contents
                </div>
                <nav className="space-y-1">
                  {article.tableOfContents.map((item) => {
                    const isActive = activeHeadingId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left py-1.5 px-2.5 rounded-md text-xs transition-colors cursor-pointer truncate ${
                          isActive
                            ? 'bg-emerald-950/80 text-emerald-400 font-semibold'
                            : 'text-stone-400 hover:text-white hover:bg-emerald-950/30'
                        }`}
                      >
                        {item.title}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Spec Card */}
              <div className="p-5 rounded-xl bg-[#07130f] border border-emerald-950 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Article Quick Facts
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-stone-400">
                    <span>Category:</span>
                    <span className="text-stone-200 font-medium">{article.category}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Horsepower Tier:</span>
                    <span className="text-emerald-400 font-mono">{article.hpTier}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Estimated Read:</span>
                    <span className="text-stone-200 font-mono">{article.readTime}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Published:</span>
                    <span className="text-stone-200">{article.publishDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles Strip */}
        {relatedArticles.length > 0 && (
          <section className="mt-20 pt-12 border-t border-emerald-950/80">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Continue Exploring</span>
                <h2 className="text-2xl font-bold text-white mt-1">Related Horsepower & Performance Guides</h2>
              </div>
              <button
                onClick={onBackToHome}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                <span>View all 10 guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel.slug)}
                  className="group bg-[#0a1612] border border-emerald-950 hover:border-emerald-700/60 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 p-4 space-y-3"
                >
                  <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-[#06100d]">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-xs text-emerald-400 font-medium">
                    {rel.category} · {rel.hpTier}
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
