"use client";

import React, { useEffect, useState, useRef } from "react";
import { Globe, ChevronDown, Check, Search, RotateCcw } from "lucide-react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

interface LanguageOption {
  code: string;
  name: string;
}

// All 100+ Google Translate Languages Sorted Alphabetically (A to Z)
const MASTER_LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English" },
  { code: "af", name: "Afrikaans" },
  { code: "sq", name: "Albanian (Shqip)" },
  { code: "am", name: "Amharic (አማርኛ)" },
  { code: "ar", name: "Arabic (العربية)" },
  { code: "hy", name: "Armenian (Հայերեն)" },
  { code: "as", name: "Assamese (অসমীয়া)" },
  { code: "ay", name: "Aymara" },
  { code: "az", name: "Azerbaijani (Azərbaycan)" },
  { code: "bm", name: "Bambara" },
  { code: "eu", name: "Basque (Euskara)" },
  { code: "be", name: "Belarusian (Беларуская)" },
  { code: "bn", name: "Bengali (বাংলা)" },
  { code: "bho", name: "Bhojpuri (भोजपुरी)" },
  { code: "bs", name: "Bosnian (Bosanski)" },
  { code: "bg", name: "Bulgarian (Български)" },
  { code: "ca", name: "Catalan (Català)" },
  { code: "ceb", name: "Cebuano" },
  { code: "zh-CN", name: "Chinese Simplified (简体中文)" },
  { code: "zh-TW", name: "Chinese Traditional (繁體中文)" },
  { code: "co", name: "Corsican" },
  { code: "hr", name: "Croatian (Hrvatski)" },
  { code: "cs", name: "Czech (Čeština)" },
  { code: "da", name: "Danish (Dansk)" },
  { code: "dv", name: "Dhivehi" },
  { code: "doi", name: "Dogri (डोगरी)" },
  { code: "nl", name: "Dutch (Nederlands)" },
  { code: "eo", name: "Esperanto" },
  { code: "et", name: "Estonian (Eesti)" },
  { code: "ee", name: "Ewe" },
  { code: "fil", name: "Filipino (Tagalog)" },
  { code: "fi", name: "Finnish (Suomi)" },
  { code: "fr", name: "French (Français)" },
  { code: "fy", name: "Frisian" },
  { code: "gl", name: "Galician (Galego)" },
  { code: "ka", name: "Georgian (ქართული)" },
  { code: "de", name: "German (Deutsch)" },
  { code: "el", name: "Greek (Ελληνικά)" },
  { code: "gn", name: "Guarani" },
  { code: "gu", name: "Gujarati (ગુજરાતી)" },
  { code: "ht", name: "Haitian Creole" },
  { code: "ha", name: "Hausa" },
  { code: "haw", name: "Hawaiian" },
  { code: "he", name: "Hebrew (עברית)" },
  { code: "hi", name: "Hindi (हिंदी)" },
  { code: "hmn", name: "Hmong" },
  { code: "hu", name: "Hungarian (Magyar)" },
  { code: "is", name: "Icelandic (Íslenska)" },
  { code: "ig", name: "Igbo" },
  { code: "ilo", name: "Ilocano" },
  { code: "id", name: "Indonesian (Bahasa Indonesia)" },
  { code: "ga", name: "Irish (Gaeilge)" },
  { code: "it", name: "Italian (Italiano)" },
  { code: "ja", name: "Japanese (日本語)" },
  { code: "jw", name: "Javanese" },
  { code: "kn", name: "Kannada (கன்னடம்)" },
  { code: "kk", name: "Kazakh (Қазақ)" },
  { code: "km", name: "Khmer (ខ្មែរ)" },
  { code: "rw", name: "Kinyarwanda" },
  { code: "gom", name: "Konkani (कोंकणी)" },
  { code: "ko", name: "Korean (한국어)" },
  { code: "kri", name: "Krio" },
  { code: "ku", name: "Kurdish (Kurdî)" },
  { code: "ckb", name: "Kurdish Sorani" },
  { code: "ky", name: "Kyrgyz (Кыргызча)" },
  { code: "lo", name: "Lao (ລາວ)" },
  { code: "la", name: "Latin" },
  { code: "lv", name: "Latvian (Latviešu)" },
  { code: "ln", name: "Lingala" },
  { code: "lt", name: "Lithuanian (Lietuvių)" },
  { code: "lg", name: "Luganda" },
  { code: "lb", name: "Luxembourgish" },
  { code: "mk", name: "Macedonian (Македонски)" },
  { code: "mai", name: "Maithili (मैथिली)" },
  { code: "mg", name: "Malagasy" },
  { code: "ms", name: "Malay (Bahasa Melayu)" },
  { code: "ml", name: "Malayalam (മലയാളം)" },
  { code: "mt", name: "Maltese (Malti)" },
  { code: "mi", name: "Maori" },
  { code: "mr", name: "Marathi (मराठी)" },
  { code: "mni-Mtei", name: "Meiteilon (Manipuri)" },
  { code: "lus", name: "Mizo" },
  { code: "mn", name: "Mongolian (Монгол)" },
  { code: "my", name: "Myanmar (Burmese)" },
  { code: "ne", name: "Nepali (नेपाली)" },
  { code: "no", name: "Norwegian (Norsk)" },
  { code: "ny", name: "Nyanja (Chichewa)" },
  { code: "or", name: "Odia (ଓଡ଼ିଆ)" },
  { code: "om", name: "Oromo" },
  { code: "ps", name: "Pashto (پښتو)" },
  { code: "fa", name: "Persian (فارسی)" },
  { code: "pl", name: "Polish (Polski)" },
  { code: "pt", name: "Portuguese (Português)" },
  { code: "pa", name: "Punjabi (ਪੰਜਾਬੀ)" },
  { code: "qu", name: "Quechua" },
  { code: "ro", name: "Romanian (Română)" },
  { code: "ru", name: "Russian (Русский)" },
  { code: "sm", name: "Samoan" },
  { code: "sa", name: "Sanskrit (संस्कृतम्)" },
  { code: "gd", name: "Scots Gaelic" },
  { code: "nso", name: "Sepedi" },
  { code: "sr", name: "Serbian (Српски)" },
  { code: "st", name: "Sesotho" },
  { code: "sn", name: "Shona" },
  { code: "sd", name: "Sindhi (سنڌي)" },
  { code: "si", name: "Sinhala (සිංහල)" },
  { code: "sk", name: "Slovak (Slovenčina)" },
  { code: "sl", name: "Slovenian (Slovenščina)" },
  { code: "so", name: "Somali" },
  { code: "es", name: "Spanish (Español)" },
  { code: "su", name: "Sundanese" },
  { code: "sw", name: "Swahili (Kiswahili)" },
  { code: "sv", name: "Swedish (Svenska)" },
  { code: "tg", name: "Tajik (Тоҷикӣ)" },
  { code: "ta", name: "Tamil (தமிழ்)" },
  { code: "tt", name: "Tatar" },
  { code: "te", name: "Telugu (తెలుగు)" },
  { code: "th", name: "Thai (ไทย)" },
  { code: "ti", name: "Tigrinya" },
  { code: "ts", name: "Tsonga" },
  { code: "tr", name: "Turkish (Türkçe)" },
  { code: "tk", name: "Turkmen" },
  { code: "ak", name: "Twi (Akan)" },
  { code: "uk", name: "Ukrainian (Українська)" },
  { code: "ur", name: "Urdu (اردو)" },
  { code: "ug", name: "Uyghur" },
  { code: "uz", name: "Uzbek (Oʻzbek)" },
  { code: "vi", name: "Vietnamese (Tiếng Việt)" },
  { code: "cy", name: "Welsh (Cymraeg)" },
  { code: "xh", name: "Xhosa" },
  { code: "yi", name: "Yiddish" },
  { code: "yo", name: "Yoruba" },
  { code: "zu", name: "Zulu" },
];

export default function GoogleTranslator() {
  const [selectedLang, setSelectedLang] = useState<LanguageOption>({
    code: "en",
    name: "English",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )googtrans=([^;]*)/);
    if (match) {
      const langCode = match[1].split("/").pop();
      if (langCode) {
        const found = MASTER_LANGUAGES.find((l) => l.code === langCode);
        setSelectedLang(found || { code: langCode, name: langCode.toUpperCase() });
      }
    }

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_hidden_element"
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lang: LanguageOption) => {
    if (lang.code === "en") {
      resetToOriginal();
      return;
    }

    setSelectedLang(lang);
    setIsOpen(false);

    document.cookie = `googtrans=/en/${lang.code}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/en/${lang.code}; path=/;`;
    window.location.reload();
  };

  const resetToOriginal = () => {
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setSelectedLang({ code: "en", name: "English" });
    setIsOpen(false);
    window.location.reload();
  };

  const filteredLanguages = MASTER_LANGUAGES.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left pointer-events-auto z-[9999]" ref={dropdownRef}>
      <div id="google_translate_hidden_element" className="hidden pointer-events-none" />

      {/* Button Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1b2027] px-3.5 py-2 text-xs font-medium text-[#edeff2] transition-colors hover:border-[#e8a33d] active:scale-95"
      >
        <Globe className="h-4 w-4 shrink-0 text-[#e8a33d]" />
        <span className="max-w-[85px] truncate">{selectedLang.name.split(" ")[0]}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-white/50 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Responsive Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mt-2 w-[85vw] max-w-[260px] sm:w-60 origin-top rounded-xl border border-white/10 bg-[#14181d] p-2 shadow-2xl z-[999999] pointer-events-auto">
          
          {/* Search Box */}
          <div className="relative mb-2">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/40" />
            <input
              type="text"
              placeholder="Search language..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 py-1.5 pl-8 pr-3 text-xs text-white placeholder-white/40 focus:border-[#e8a33d] focus:outline-none"
            />
          </div>

          {/* Reset Button Option */}
          {selectedLang.code !== "en" && (
            <button
              onClick={resetToOriginal}
              className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#e8a33d]/20 px-3 py-2 text-xs font-semibold text-[#e8a33d] transition-colors hover:bg-[#e8a33d]/30"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset to Original (English)</span>
            </button>
          )}

          {/* Languages List */}
          <div className="max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected = selectedLang.code === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                      isSelected
                        ? "bg-[#e8a33d]/15 font-semibold text-[#e8a33d]"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{lang.name}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-[#e8a33d]" />}
                  </button>
                );
              })
            ) : (
              <div className="p-3 text-center text-xs text-white/40">
                No language found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}