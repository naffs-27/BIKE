import { Bookmark, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../types/article';

interface ArticleCardProps {
  article: Article;
  isSaved: boolean;
  onSelect: (slug: string) => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export function ArticleCard({ article, isSaved, onSelect, onToggleSave }: ArticleCardProps) {
  return (
    <article
      onClick={() => onSelect(article.slug)}
      className="group flex flex-col bg-[#0d1c17] border border-emerald-950/80 hover:border-emerald-700/60 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:shadow-black/40"
    >
      {/* Visual Slot with Resilient Fallback */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#07130f]">
        <img
          src={article.image}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
          loading="lazy"
          onError={(e) => {
            // Stylized CSS fallback if asset fails
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />

        {/* Floating Bookmark Action button */}
        <button
          onClick={(e) => onToggleSave(article.id, e)}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
            isSaved
              ? 'bg-emerald-600 text-white'
              : 'bg-black/45 text-white/80 hover:text-white hover:bg-black/65'
          }`}
          title={isSaved ? 'Remove from saved reading list' : 'Save to reading list'}
          aria-label={isSaved ? 'Remove bookmark' : 'Bookmark article'}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div className="space-y-2.5">
          {/* Zero-Pill Unboxed Clean Metadata */}
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <span>{article.category}</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="font-mono text-stone-400">{article.hpTier}</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-stone-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-500" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-stone-400 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Bottom strip: Author & Read link */}
        <div className="pt-5 mt-4 border-t border-emerald-950/60 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span>By {article.author.name}</span>
          </div>

          <span className="flex items-center gap-1 text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
            <span>Read guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
