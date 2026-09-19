import { ENGLISH_CONTENT } from "@shared/i18n";
import { AlertTriangle, ExternalLink, MapPin, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function RealCases() {
  const content = ENGLISH_CONTENT;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500/30 bg-red-500/5';
      case 'high':
        return 'border-orange-500/30 bg-orange-500/5';
      case 'medium':
        return 'border-yellow-500/30 bg-yellow-500/5';
      default:
        return 'border-gray-500/30 bg-gray-500/5';
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'Critical';
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      default:
        return severity;
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col">
      <Navigation />
      {/* Header */}
      <div className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, #3b82f6 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <AlertTriangle className="w-12 h-12 text-red-500 mr-4" />
            <h1 className="text-4xl sm:text-5xl font-bold">{content.realCases.title}</h1>
          </div>
          <p className="text-xl text-blue-400 mb-6">{content.realCases.subtitle}</p>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {content.realCases.description}
          </p>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid gap-6">
          {content.realCases.cases.map((caseItem, index) => (
            <div
              key={caseItem.id}
              className={`group border rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 ${getSeverityColor(caseItem.severity)}`}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Case Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-white">{caseItem.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getSeverityBadgeColor(caseItem.severity)}`}>
                      {getSeverityLabel(caseItem.severity)}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{caseItem.description}</p>
                </div>
              </div>

              {/* Case Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 py-4 border-t border-b border-gray-700/30">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-semibold text-white">{caseItem.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-semibold text-white">{caseItem.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="text-sm font-semibold text-white">{caseItem.amount}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Source</p>
                  <p className="text-sm font-semibold text-white truncate">{caseItem.source}</p>
                </div>
              </div>

              {/* Case Details List */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-blue-400 mb-3">
                  Incident Details
                </p>
                <ul className="space-y-2">
                  {caseItem.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                      <span className="text-blue-400 font-bold mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Source Link */}
              <div className="flex justify-end">
                <a href={caseItem.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Source
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Warning Section */}
        <div className="mt-16 p-6 border border-yellow-500/30 bg-yellow-500/5 rounded-lg">
          <div className="flex gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-2">
                Security Warning
              </h3>
              <p className="text-gray-300 leading-relaxed">
                These cases remind us that physical security is as important as digital security. Never flaunt your wealth on social media or disclose your cryptocurrency holdings. Keep a low profile, use secure storage solutions, and consider multi-layered security measures.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <Footer />
    </div>
  );
}

const contentEN = {
  realCases: {
    title: "Real Cases",
    subtitle: "Why Physical Security Matters",
    description:
      "These are real-world cases of cryptocurrency holders who fell victim to physical attacks, kidnappings, and extortion. Their stories highlight the critical importance of physical security alongside digital security. We share these cases to raise awareness and emphasize that no amount of digital encryption can protect against physical threats.",
    cases: [
      {
        id: "case-1",
        title: "Canadian $2 Million Bitcoin Hostage-Taking",
        description:
          "A Canadian family was held hostage overnight by four intruders who subjected them to waterboarding, sexual assault, and death threats. The attackers stole approximately $2 million in cryptocurrency.",
        date: "November 2025",
        location: "British Columbia, Canada",
        amount: "$2 Million",
        severity: "critical",
        source: "CBC News, Fortune Magazine",
        sourceUrl: "https://www.cbc.ca/news/canada/british-columbia/bitcoin-hostage-millions-cryptocurrency-9.6987994",
        details: [
          "4 intruders invaded the home",
          "Victims subjected to waterboarding and sexual assault",
          "Death threats used to coerce cryptocurrency transfers",
          "Approximately $2 million in crypto stolen",
        ],
      },
      {
        id: "case-2",
        title: "NYC Crypto Kidnapping and Torture Case",
        description:
          "Two men were indicted for kidnapping and torturing Bitcoin investors in a Manhattan home. They targeted wealthy crypto holders and used extreme violence to force them to reveal their digital assets.",
        date: "May 2025",
        location: "Manhattan, New York",
        amount: "Multiple victims",
        severity: "critical",
        source: "ABC News, The Guardian",
        sourceUrl: "https://abcnews.com/US/nyc-crypto-kidnapping-torture-case/story?id=122280419",
        details: [
          "Perpetrators: John Woeltz (37) and William Duplessie (33)",
          "Torture used to extract cryptocurrency access",
          "Targeted wealthy crypto investors in Manhattan",
          "Multiple victims subjected to violence",
        ],
      },
    ],
  },
};

const contentZH = {
  realCases: {
    title: "案例分享",
    subtitle: "為什麼物理安全很重要",
    description:
      "這些是加密貨幣持有者遭遇物理攻擊、綁架和勒索的真實案例。他們的故事強調了物理安全與數位安全同樣重要。我們分享這些案例是為了提高認識，強調沒有任何數位加密能夠保護免受物理威脅。",
    cases: [
      {
        id: "case-1",
        title: "加拿大 200 萬美元比特幣人質事件",
        description:
          "一個加拿大家庭被四名入侵者挾持一整夜，遭受水刑、性侵犯和死亡威脅。攻擊者竊取了約 200 萬美元的加密貨幣。",
        date: "2025 年 11 月",
        location: "加拿大不列顛哥倫比亞省",
        amount: "200 萬美元",
        severity: "critical",
        source: "CBC 新聞、Fortune 雜誌",
        sourceUrl: "https://www.cbc.ca/news/canada/british-columbia/bitcoin-hostage-millions-cryptocurrency-9.6987994",
        details: [
          "4 名入侵者入侵家庭",
          "受害者遭受水刑和性侵犯",
          "使用死亡威脅強迫加密貨幣轉帳",
          "約 200 萬美元的加密貨幣被竊取",
        ],
      },
      {
        id: "case-2",
        title: "紐約加密貨幣綁架和刑訊逼供案",
        description:
          "兩名男子因在曼哈頓公寓內綁架和刑訊逼供比特幣投資者而被起訴。他們針對富有的加密貨幣持有者，使用極端暴力強迫他們透露數位資產。",
        date: "2025 年 5 月",
        location: "紐約曼哈頓",
        amount: "多名受害者",
        severity: "critical",
        source: "ABC 新聞、衛報",
        sourceUrl: "https://abcnews.com/US/nyc-crypto-kidnapping-torture-case/story?id=122280419",
        details: [
          "犯人：John Woeltz（37 歲）和 William Duplessie（33 歲）",
          "使用刑訊逼供提取加密貨幣訪問權限",
          "針對曼哈頓富有的加密貨幣投資者",
          "多名受害者遭受暴力",
        ],
      },
    ],
  },
};
