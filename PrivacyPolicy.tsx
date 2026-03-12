import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link to="/">
          <Button variant="ghost" className="gap-2 mb-8 -ml-2">
            <ArrowLeft className="h-4 w-4" />
            {t("Back", "वापस")}
          </Button>
        </Link>

        <h1
          className="text-4xl font-bold text-foreground mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t("Privacy Policy", "गोपनीयता नीति")}
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <p className="text-foreground font-medium">
            {t(
              "This policy explains how Top Indian Essay keeps your information secure.",
              "यह पॉलिसी बताती है कि Top Indian Essay आपकी जानकारी को कैसे सुरक्षित रखता है।"
            )}
          </p>

          <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                {t("Data Collection", "डेटा संग्रहण")}
              </h2>
              <p>
                {t(
                  "We do not collect any of your personal information without your permission.",
                  "हम आपकी कोई भी व्यक्तिगत जानकारी बिना अनुमति के इकट्ठा नहीं करते हैं।"
                )}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Cookies</h2>
              <p>
                {t(
                  "We may use basic cookies for a better experience.",
                  "बेहतर अनुभव के लिए हम बुनियादी कुकीज़ का उपयोग कर सकते हैं।"
                )}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                {t("Analytics & Ads", "Analytics और Ads")}
              </h2>
              <p>
                {t(
                  "We use Google Analytics to improve our site's performance and Google AdSense to display ads.",
                  "हम अपनी साइट के प्रदर्शन को सुधारने के लिए Google Analytics और विज्ञापन दिखाने के लिए Google AdSense का उपयोग करते हैं।"
                )}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                {t("Security", "सुरक्षा")}
              </h2>
              <p>
                {t(
                  "We take full care of your privacy and do not share data with any third party.",
                  "हम आपकी गोपनीयता का पूरा ध्यान रखते हैं और किसी भी तीसरे पक्ष के साथ डेटा साझा नहीं करते हैं।"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
