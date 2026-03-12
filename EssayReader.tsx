import { useParams, Link } from "react-router-dom";
import { essays } from "@/data/essays";
import { essayHindi, categoryHindi } from "@/data/essays-hindi";
import { authorImages } from "@/data/author-images";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bookmark, BookmarkCheck, Sun, Moon, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";

const EssayReader = () => {
  const { id } = useParams<{ id: string }>();
  const essay = essays.find((e) => e.id === id);
  const [progress, setProgress] = useState(0);
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { isDark, toggle: toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!essay) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">{t("Essay not found", "निबंध नहीं मिला")}</h1>
          <Button asChild variant="outline">
            <Link to="/">{t("Back to collection", "संग्रह पर वापस जाएं")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const hi = essayHindi[essay.id];
  const title = lang === "hi" && hi ? hi.title : essay.title;
  const author = lang === "hi" && hi ? hi.author : essay.author;
  const category = lang === "hi" ? categoryHindi[essay.category] || essay.category : essay.category;
  const bookmarked = isBookmarked(essay.id);
  const imgSrc = authorImages[essay.id];
  const paragraphs = essay.content.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={progress} className="h-1 rounded-none bg-transparent" />
      </div>

      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-3 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="rounded-xl gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              {t("Back", "वापस")}
            </Link>
          </Button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleBookmark(essay.id)}
              className="p-2 rounded-xl hover:bg-muted transition-colors"
            >
              {bookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-primary" />
              ) : (
                <Bookmark className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl" onClick={() => setLang(lang === "en" ? "hi" : "en")}>
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl" onClick={toggleTheme}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </nav>

      <header className="mx-auto max-w-3xl px-6 pt-14 pb-10">
        <Badge variant="outline" className="mb-5 rounded-lg">{category}</Badge>
        <h1
          className="text-4xl md:text-5xl font-bold text-foreground leading-[1.15]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h1>

        {/* Author card */}
        <div className="mt-8 flex items-center gap-4 p-4 rounded-2xl bg-card border border-border">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted border border-border flex-shrink-0">
            <img src={imgSrc} alt={essay.author} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground">{author}</p>
            <p className="text-sm text-muted-foreground">{essay.year}</p>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-5 italic">
          {essay.authorBio}
        </p>
      </header>

      <div className="mx-auto max-w-3xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <article className="mx-auto max-w-3xl px-6 py-12">
        <div className="space-y-7" style={{ fontFamily: "'Playfair Display', serif" }}>
          {paragraphs.map((para, i) => {
            const isQuote = para.startsWith('"') && para.endsWith('"') && para.length < 300;
            if (isQuote) {
              return (
                <blockquote
                  key={i}
                  className="border-l-4 border-primary/40 pl-6 py-3 text-lg italic text-foreground/75 leading-relaxed"
                >
                  {para}
                </blockquote>
              );
            }
            return (
              <p key={i} className="text-base md:text-[17px] leading-[1.9] text-foreground/85">
                {para}
              </p>
            );
          })}
        </div>
      </article>

      <footer className="mx-auto max-w-3xl px-6 py-10 border-t border-border">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/">← {t("All Essays", "सभी निबंध")}</Link>
          </Button>
          {(() => {
            const idx = essays.findIndex((e) => e.id === id);
            const next = essays[idx + 1];
            if (!next) return null;
            const nextHi = essayHindi[next.id];
            const nextTitle = lang === "hi" && nextHi ? nextHi.title : next.title;
            return (
              <Button asChild variant="outline" className="rounded-xl">
                <Link to={`/essay/${next.id}`}>
                  {nextTitle} →
                </Link>
              </Button>
            );
          })()}
        </div>
      </footer>
    </div>
  );
};

export default EssayReader;
