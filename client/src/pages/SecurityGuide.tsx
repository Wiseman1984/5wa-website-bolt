import { ENGLISH_CONTENT } from "@shared/i18n";
import { Lock, Shield, AlertCircle, Smartphone, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function SecurityGuide() {
  const content = ENGLISH_CONTENT.securityGuide;

  const iconMap: Record<string, React.ReactNode> = {
    "identity-protection": <Shield className="w-8 h-8 text-blue-400" />,
    "physical-security": <Lock className="w-8 h-8 text-blue-400" />,
    "social-media-safety": <Smartphone className="w-8 h-8 text-blue-400" />,
    "threat-response": <AlertCircle className="w-8 h-8 text-blue-400" />,
    "travel-safety": <MapPin className="w-8 h-8 text-blue-400" />,
  };

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col">
      <Navigation />
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8 border-b border-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            {content.title}
          </h1>
          <p className="text-xl text-blue-300 mb-6">{content.subtitle}</p>
          <p className="text-gray-300 text-lg leading-relaxed">
            {content.introduction}
          </p>
        </div>
      </section>

      {/* Security Sections */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          {content.sections.map((section) => (
            <div
              key={section.id}
              className="border border-blue-900/50 rounded-lg p-8 bg-gradient-to-br from-blue-950/10 to-black hover:border-blue-700/50 transition-colors"
            >
              {/* Section Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  {iconMap[section.id] || <Shield className="w-8 h-8 text-blue-400" />}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {section.title}
                  </h2>
                  <p className="text-gray-400">{section.description}</p>
                </div>
              </div>

              {/* Tips Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {section.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="bg-black/50 border border-blue-800/30 rounded-lg p-6 hover:border-blue-600/50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-blue-300 mb-3">
                      {tip.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {tip.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 px-4 md:px-8 border-t border-blue-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Important Reminder
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Your personal safety is more valuable than any cryptocurrency. If you face
              physical threats or coercion:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex gap-3">
                <span className="text-red-400 font-bold">1.</span>
                <span>Comply with demands to protect your life</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold">2.</span>
                <span>Contact law enforcement immediately</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold">3.</span>
                <span>Seek medical attention if injured</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold">4.</span>
                <span>Preserve evidence for police investigations</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 border-t border-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Learn from Real Cases
          </h3>
          <p className="text-gray-300 mb-8 text-lg">
            Understand how physical attacks happen in the crypto world. Review documented cases
            to recognize warning signs and protect yourself.
          </p>
          <a
            href="/real-cases"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            View Real Cases →
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
