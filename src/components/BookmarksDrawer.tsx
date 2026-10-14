import { X, Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { Article } from '../types/article';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (slug: string) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export function BookmarksDrawer({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}: BookmarksDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a1713] border-l border-emerald-950 p-6 flex flex-col justify-between shadow-2xl">
          {/* Top Bar */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-emerald-950">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  Reading List ({savedArticles.length})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-emerald-950/60 transition-colors cursor-pointer"
                aria-label="Close saved drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="mt-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
              {savedArticles.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Bookmark className="w-10 h-10 text-stone-600 mx-auto" />
                  <p className="text-sm text-stone-400">
                    No articles bookmarked yet.
                  </p>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Click the bookmark icon on any article card to save it for offline or later reading.
                  </p>
                </div>
              ) : (
                savedArticles.map((article) => (
                  <div
                    key={article.id}
                    className="p-3.5 rounded-xl bg-[#06100d] border border-emerald-950 hover:border-emerald-800 transition-colors flex items-start justify-between gap-3 group"
                  >
                    <div
                      onClick={() => {
                        onSelectArticle(article.slug);
                        onClose();
                      }}
                      className="cursor-pointer space-y-1 flex-1"
                    >
                      <div className="text-[11px] text-emerald-400 font-medium">
                        {article.category} · {article.hpTier}
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="text-xs text-stone-500 font-mono">
                        {article.readTime}
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveBookmark(article.id)}
                      className="text-stone-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          {savedArticles.length > 0 && (
            <div className="pt-4 border-t border-emerald-950 flex items-center justify-between">
              <button
                onClick={onClearAll}
                className="text-xs text-stone-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                Clear all saved
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
