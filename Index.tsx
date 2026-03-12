import { useState } from "react";
import logoImg from "@/assets/logo.jpeg";
import { Link } from "react-router-dom";
import { essays } from "@/data/essays";
import { essayHindi, categoryHindi } from "@/data/essays-hindi";
import { authorImages } from "@/data/author-images";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, ArrowRight, Bookmark, BookmarkCheck, Search, Sun, Moon, Globe, X } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";

const categories = ["All", "Freedom", "History", "Philosophy", "Social Reform", "Autobiography", "Literature", "Culture"];

const categoryColorMap: Record<string, string> = {
  Freedom: "bg-primary/10 text-primary border-primary/20",
  History: "bg-accent/10 text-accent border-accent/20",
  Philosophy: "bg-[hsl(var(--essay-purple))]/10 text-[hsl(var(--essay-purple))] border-[hsl(var(--essay-purple))]/20",
  "Social Reform": "bg-[hsl(var(--essay-rose))]/10 text-[hsl(var(--essay-rose))] border-[hsl(var(--essay-rose))]/20",
  Autobiography: "bg-[hsl(var(--essay-blue))]/10 text-[hsl(var(--essay-blue))] border-[hsl(var(--essay-blue))]/20",
  Literature: "bg-[hsl(var(--essay-teal))]/10 text-[hsl(var(--essay-teal))] border-[hsl(var(--essay-teal))]/20",
  Culture: "bg-secondary/20 text-secondary-foreground border-secondary/30",
};

const Index = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { isDark, toggle: toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  const filtered = essays.filter((essay) => {
    const hi = essayHindi[essay.id];
    const title = lang === "hi" && hi ? hi.title : essay.title;
    const author = lang === "hi" && hi ? hi.author : essay.author;
    const matchesSearch =
      !search ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      author.toLowerCase().includes(search.toLowerCase()) ||
      essay.title.toLowerCase().includes(search.toLowerCase()) ||
      essay.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || essay.category === activeCategory;
    const matchesBookmark = !showBookmarksOnly || isBookmarked(essay.id);
    return matchesSearch && matchesCategory && matchesBookmark;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-secondary/5 to-accent/8" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative mx-auto max-w-6xl px-6 py-6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Top Indian Man Essays" className="h-9 w-9 rounded-full object-cover border border-border shadow-sm" />
              <span className="font-semibold text-foreground text-sm tracking-wide uppercase">
                {t("Indian Essays", "भारतीय निबंध")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
              >
                <Globe className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={toggleTheme}>
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto pb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm text-primary font-medium mb-8">
              <span>✦</span>
              <span>{t("A Curated Collection", "एक संकलित संग्रह")}</span>
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("Top 10 Indian", "शीर्ष 10 भारतीय")}
              <br />
              <span className="text-primary">{t("Essays", "निबंध")}</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {t(
                "Timeless words that shaped a nation — from Gandhi's vision of self-rule to Ambedkar's call for equality.",
                "कालजयी शब्द जिन्होंने एक राष्ट्र को आकार दिया — गांधी की स्वराज की दृष्टि से अम्बेडकर की समानता की पुकार तक।"
              )}
            </p>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="mx-auto max-w-6xl px-6 -mt-4">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("Search by title or author...", "शीर्षक या लेखक से खोजें...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-background border-border h-11 rounded-xl"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            <Button
              variant={showBookmarksOnly ? "default" : "outline"}
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className="gap-2 h-11 rounded-xl px-5"
            >
              <BookmarkCheck className="h-4 w-4" />
              {t("Bookmarks", "बुकमार्क")}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const label = lang === "hi" ? (cat === "All" ? "सभी" : categoryHindi[cat] || cat) : cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Essay Grid */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">{t("No essays found.", "कोई निबंध नहीं मिला।")}</p>
            <Button variant="link" className="text-primary" onClick={() => { setSearch(""); setActiveCategory("All"); setShowBookmarksOnly(false); }}>
              {t("Clear filters", "फ़िल्टर साफ़ करें")}
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((essay) => {
              const hi = essayHindi[essay.id];
              const title = lang === "hi" && hi ? hi.title : essay.title;
              const author = lang === "hi" && hi ? hi.author : essay.author;
              const excerpt = lang === "hi" && hi ? hi.excerpt : essay.excerpt;
              const category = lang === "hi" ? categoryHindi[essay.category] || essay.category : essay.category;
              const bookmarked = isBookmarked(essay.id);
              const imgSrc = authorImages[essay.id];

              return (
                <div key={essay.id} className="group relative">
                  <Link to={`/essay/${essay.id}`}>
                    <div className="bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
                      {/* Top colored bar */}
                      <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
                      
                      <div className="p-6">
                        <div className="flex gap-4">
                          {/* Author image */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-muted border-2 border-border shadow-sm">
                              <img
                                src={imgSrc}
                                alt={essay.author}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge variant="outline" className={`text-xs rounded-lg ${categoryColorMap[essay.category] || ""}`}>
                                {category}
                              </Badge>
                              <span className="text-xs text-muted-foreground font-medium">{essay.year}</span>
                            </div>
                            <h2
                              className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {title}
                            </h2>
                            <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                              {t("by", "द्वारा")} {author}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mt-4 leading-relaxed line-clamp-2">
                          {excerpt}
                        </p>

                        {/* Read more */}
                        <div className="flex items-center gap-2 mt-4 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>{t("Read essay", "निबंध पढ़ें")}</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Bookmark button */}
                  <button
                    onClick={(e) => { e.preventDefault(); toggleBookmark(essay.id); }}
                    className="absolute top-5 right-4 z-10 p-2 rounded-xl bg-background/80 backdrop-blur-sm border border-border hover:bg-muted transition-all shadow-sm"
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="h-4 w-4 text-primary" />
                    ) : (
                      <Bookmark className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                {t("About Us", "हमारे बारे में")}
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                {t("Privacy Policy", "गोपनीयता नीति")}
              </Link>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {t(
                "A collection of essays that shaped the Indian subcontinent's intellectual history.",
                "निबंधों का एक संग्रह जिसने भारतीय उपमहाद्वीप के बौद्धिक इतिहास को आकार दिया।"
              )}
            </p>
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} MKD Digital Empire. {t("All rights reserved.", "सर्वाधिकार सुरक्षित।")}
            </p>
            <a
              href="https://t.me/MKDDigitalEmpire"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              Telegram: t.me/MKDDigitalEmpire
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
