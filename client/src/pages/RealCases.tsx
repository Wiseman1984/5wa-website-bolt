import { ENGLISH_CONTENT } from "@shared/i18n";
import { TriangleAlert as AlertTriangle, ExternalLink, MapPin, Calendar, DollarSign } from "lucide-react";
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
