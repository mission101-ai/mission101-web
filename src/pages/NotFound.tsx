import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext";
import { UzhhorodNav } from "@/components/UzhhorodNav";
import { FooterSection } from "@/components/sections/FooterSection";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { currentLanguage } = useLanguage();
  const homePath = currentLanguage === "ua" ? "/ua" : "/en";

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-[#3a6291] overflow-x-hidden light-theme flex flex-col">
      <SEO
        title={t("notFound.title")}
        description={t("notFound.description")}
      />
      <UzhhorodNav />

      <main
        className="flex-1 flex items-center justify-center px-6 py-16"
        data-testid="not-found-page"
      >
        <div className="w-full max-w-xl mx-auto text-center">
          <h1 className="mb-4 text-5xl md:text-6xl font-bold font-mono text-[#3a6291]">404</h1>
          <p className="mb-8 text-xl text-gray-600">{t("notFound.heading")}</p>
          <Link
            to={homePath}
            className="inline-flex items-center justify-center px-6 py-3 bg-[#3a6291] text-white font-mono font-semibold rounded-md hover:bg-[#2f5078] transition-all duration-300"
            data-testid="not-found-home-link"
          >
            {t("notFound.returnButton")}
          </Link>
        </div>
      </main>

      <FooterSection isUzhhorodPage={true} />
    </div>
  );
};

export default NotFound;
