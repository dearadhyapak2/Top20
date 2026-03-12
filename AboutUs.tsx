import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

const AboutUs = () => {
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
          {t("About Us", "हमारे बारे में")}
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <p className="text-xl text-foreground font-medium">
            Top Indian Essay {t("welcomes you!", "में आपका स्वागत है!")}
          </p>
          <p>
            {t(
              "Our aim is to provide high-quality essays to help Indian students in their education and exams. Whether it's a school project or a competitive exam, we provide information in simple and effective language.",
              "हमारा उद्देश्य भारतीय छात्रों को उनकी शिक्षा और परीक्षाओं में मदद करने के लिए उच्च गुणवत्ता वाले निबंध (Essays) प्रदान करना है। चाहे वह स्कूल प्रोजेक्ट हो या प्रतियोगी परीक्षा, हम सरल और प्रभावी भाषा में जानकारी उपलब्ध कराते हैं।"
            )}
          </p>

          <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                {t("Our Goal", "हमारा लक्ष्य")}
              </h2>
              <p>
                {t(
                  "To provide the best educational content to every student in their mother tongue and English.",
                  "हर छात्र को उसकी मातृभाषा और अंग्रेजी में बेहतरीन शैक्षिक सामग्री देना।"
                )}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                {t("Topics", "विषय")}
              </h2>
              <p>
                {t(
                  "We write essays on various topics such as social issues, science, Indian culture, and great personalities.",
                  "हम सामाजिक मुद्दों, विज्ञान, भारतीय संस्कृति और महान हस्तियों जैसे विभिन्न विषयों पर निबंध लिखते हैं।"
                )}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                {t("Trust", "भरोसा")}
              </h2>
              <p>
                {t(
                  "Our content is prepared by experienced writers so that you get accurate information.",
                  "हमारी सामग्री अनुभवी लेखकों द्वारा तैयार की जाती है ताकि आपको सटीक जानकारी मिले।"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
