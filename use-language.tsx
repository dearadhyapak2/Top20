import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (en: string, hi: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem("lang") as Language) || "en";
  });

  const updateLang = (l: Language) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang: updateLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
