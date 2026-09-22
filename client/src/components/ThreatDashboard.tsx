import { useState, useMemo, useCallback } from "react";
import {
  Filter,
  X,
  ExternalLink,
  TrendingUp,
  AlertTriangle,
  Globe,
  Calendar,
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react";

export interface ThreatIncident {
  id: string;
  country: string;
  published_at: string;
  attack_type: string;
  title: string;
  source_url?: string;
  latitude?: number | null;
  longitude?: number | null;
  severity?: number | null;
  ai_summary?: string | null;
}

interface ThreatDashboardProps {
  incidents: ThreatIncident[];
  filteredIncidents: ThreatIncident[];
  onFilterChange: (filtered: ThreatIncident[]) => void;
}

type SeverityFilter = "all" | "high" | "medium" | "low";
type DateRange = "all" | "7d" | "30d" | "90d" | "1y";

function getSeverityColor(severity: number | null | undefined): string {
  if (severity == null) return "#ef4444";
  if (severity >= 7) return "#ef4444";
  if (severity >= 4) return "#f59e0b";
  return "#eab308";
}

function getSeverityLabel(severity: number | null | undefined): string {
  if (severity == null) return "High (default)";
  if (severity >= 7) return "High";
  if (severity >= 4) return "Medium";
  return "Low";
}

export default function ThreatDashboard({
  incidents,
  filteredIncidents,
  onFilterChange,
}: ThreatDashboardProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<ThreatIncident | null>(null);

  const [attackTypeFilter, setAttackTypeFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const [dateRange, setDateRange] = useState<DateRange>("all");

  const attackTypes = useMemo(() => {
    const types = new Set(incidents.map((i) => i.attack_type).filter(Boolean));
    return Array.from(types).sort();
  }, [incidents]);

  const applyFilters = useCallback(() => {
    let filtered = incidents;

    if (attackTypeFilter !== "all") {
      filtered = filtered.filter((i) => i.attack_type === attackTypeFilter);
    }

    if (severityFilter !== "all") {
      filtered = filtered.filter((i) => {
        const sev = i.severity;
        if (severityFilter === "high") return sev == null || sev >= 7;
        if (severityFilter === "medium") return sev != null && sev >= 4 && sev < 7;
        if (severityFilter === "low") return sev != null && sev < 4;
        return true;
      });
    }

    if (dateRange !== "all") {
      const now = new Date();
      const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : dateRange === "90d" ? 90 : 365;
      const cutoff = new Date(now);
      cutoff.setDate(cutoff.getDate() - days);
      filtered = filtered.filter((i) => new Date(i.published_at) >= cutoff);
    }

    onFilterChange(filtered);
  }, [incidents, attackTypeFilter, severityFilter, dateRange, onFilterChange]);

  const resetFilters = useCallback(() => {
    setAttackTypeFilter("all");
    setSeverityFilter("all");
    setDateRange("all");
    onFilterChange(incidents);
  }, [incidents, onFilterChange]);

  // Trend statistics
  const trendStats = useMemo(() => {
    const monthlyCounts: Record<string, number> = {};
    const attackTypeCounts: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};

    for (const incident of filteredIncidents) {
      const date = new Date(incident.published_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      monthlyCounts[monthKey] = (monthlyCounts[monthKey] || 0) + 1;

      if (incident.attack_type) {
        attackTypeCounts[incident.attack_type] = (attackTypeCounts[incident.attack_type] || 0) + 1;
      }
      if (incident.country) {
        countryCounts[incident.country] = (countryCounts[incident.country] || 0) + 1;
      }
    }

    const monthlyData = Object.entries(monthlyCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12);

    const maxMonthly = Math.max(...monthlyData.map(([, c]) => c), 1);

    const attackTypeData = Object.entries(attackTypeCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6);

    const maxAttackType = Math.max(...attackTypeData.map(([, c]) => c), 1);

    const countryData = Object.entries(countryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);

    const maxCountry = Math.max(...countryData.map(([, c]) => c), 1);

    return { monthlyData, maxMonthly, attackTypeData, maxAttackType, countryData, maxCountry };
  }, [filteredIncidents]);

  const activeFilterCount =
    (attackTypeFilter !== "all" ? 1 : 0) +
    (severityFilter !== "all" ? 1 : 0) +
    (dateRange !== "all" ? 1 : 0);

  // Related incidents: same attack_type or same country, excluding the selected one
  const relatedIncidents = useMemo(() => {
    if (!selectedIncident) return [];
    return incidents
      .filter(
        (i) =>
          i.id !== selectedIncident.id &&
          (i.attack_type === selectedIncident.attack_type ||
            i.country === selectedIncident.country),
      )
      .slice(0, 4);
  }, [incidents, selectedIncident]);

  return (
    <>
      {/* Filter Toggle Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="flex items-center gap-2 bg-[#0c1220]/90 border border-cyan-500/40 text-cyan-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-500/10 transition-colors backdrop-blur-sm"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-cyan-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
          {showFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-gray-400 hover:text-cyan-400 transition-colors"
          >
            Reset filters
          </button>
        )}

        <div className="text-xs text-gray-500 ml-auto">
          Showing <span className="text-cyan-400 font-semibold">{filteredIncidents.length}</span> of{" "}
          {incidents.length} incidents
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-[#0c1220]/95 border border-cyan-500/30 rounded-lg p-4 mb-4 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Attack Type Filter */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                Attack Type
              </label>
              <select
                value={attackTypeFilter}
                onChange={(e) => setAttackTypeFilter(e.target.value)}
                className="w-full bg-[#060b14] border border-cyan-500/30 text-cyan-300 rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
              >
                <option value="all">All Types</option>
                {attackTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                Severity
              </label>
              <div className="flex gap-2">
                {(["all", "high", "medium", "low"] as SeverityFilter[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSeverityFilter(level)}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      severityFilter === level
                        ? "border-cyan-500 bg-cyan-500/15 text-cyan-300"
                        : "border-cyan-500/20 text-gray-400 hover:border-cyan-500/40"
                    }`}
                  >
                    {level === "all" ? "All" : level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                Date Range
              </label>
              <div className="flex flex-wrap gap-2">
                {([
                  { key: "all", label: "All" },
                  { key: "7d", label: "7D" },
                  { key: "30d", label: "30D" },
                  { key: "90d", label: "90D" },
                  { key: "1y", label: "1Y" },
                ] as { key: DateRange; label: string }[]).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setDateRange(key)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      dateRange === key
                        ? "border-cyan-500 bg-cyan-500/15 text-cyan-300"
                        : "border-cyan-500/20 text-gray-400 hover:border-cyan-500/40"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={applyFilters}
              className="bg-cyan-500/15 border border-cyan-500/50 text-cyan-300 px-5 py-2 rounded-lg text-sm font-medium hover:bg-cyan-500/25 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Trend Statistics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Monthly Trend Chart */}
        <div className="bg-[#0c1220]/80 border border-cyan-500/25 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-cyan-300">Monthly Incidents</h3>
          </div>
          <div className="space-y-1.5">
            {trendStats.monthlyData.length === 0 ? (
              <div className="text-xs text-gray-500 py-4 text-center">No data</div>
            ) : (
              trendStats.monthlyData.map(([month, count]) => {
                const [year, mon] = month.split("-");
                const dateLabel = new Date(parseInt(year), parseInt(mon) - 1).toLocaleDateString("en-US", {
                  month: "short",
                  year: "2-digit",
                });
                return (
                  <div key={month} className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 w-12 text-right shrink-0">{dateLabel}</span>
                    <div className="flex-1 bg-[#060b14] rounded h-4 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500/60 to-cyan-400/80 rounded transition-all"
                        style={{ width: `${(count / trendStats.maxMonthly) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-cyan-300 font-medium w-6 text-right">{count}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Attack Type Distribution */}
        <div className="bg-[#0c1220]/80 border border-cyan-500/25 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-semibold text-cyan-300">Attack Types</h3>
          </div>
          <div className="space-y-1.5">
            {trendStats.attackTypeData.length === 0 ? (
              <div className="text-xs text-gray-500 py-4 text-center">No data</div>
            ) : (
              trendStats.attackTypeData.map(([type, count]) => (
                <div key={type} className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 w-24 truncate shrink-0" title={type}>
                    {type}
                  </span>
                  <div className="flex-1 bg-[#060b14] rounded h-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500/60 to-amber-400/80 rounded transition-all"
                      style={{ width: `${(count / trendStats.maxAttackType) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-orange-300 font-medium w-6 text-right">{count}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Regional Hotspots */}
        <div className="bg-[#0c1220]/80 border border-cyan-500/25 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-semibold text-cyan-300">Regional Hotspots</h3>
          </div>
          <div className="space-y-1.5">
            {trendStats.countryData.length === 0 ? (
              <div className="text-xs text-gray-500 py-4 text-center">No data</div>
            ) : (
              trendStats.countryData.map(([country, count], idx) => (
                <div key={country} className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 w-4 text-right shrink-0">{idx + 1}</span>
                  <span className="text-[10px] text-gray-300 w-20 truncate shrink-0" title={country}>
                    {country}
                  </span>
                  <div className="flex-1 bg-[#060b14] rounded h-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500/60 to-rose-400/80 rounded transition-all"
                      style={{ width: `${(count / trendStats.maxCountry) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-red-300 font-medium w-6 text-right">{count}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Incident List with click-to-detail */}
      <div className="bg-[#0c1220]/80 border border-cyan-500/25 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-cyan-300">Recent Incidents</h3>
        </div>
        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
          {filteredIncidents.length === 0 ? (
            <div className="text-xs text-gray-500 py-4 text-center">No incidents match the current filters</div>
          ) : (
            filteredIncidents.slice(0, 30).map((incident) => (
              <button
                key={incident.id}
                onClick={() => setSelectedIncident(incident)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-cyan-500/8 transition-colors text-left group"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: getSeverityColor(incident.severity) }}
                />
                <span className="text-xs text-gray-300 truncate flex-1 group-hover:text-cyan-300 transition-colors">
                  {incident.title}
                </span>
                <span className="text-[10px] text-gray-500 shrink-0">
                  {new Date(incident.published_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="text-[10px] text-gray-600 shrink-0 hidden sm:inline">
                  {incident.country}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedIncident && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedIncident(null)}
        >
          <div
            className="bg-[#0c1220] border border-cyan-500/40 rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-5 border-b border-cyan-500/20">
              <div className="flex-1 pr-3">
                <h3 className="text-base font-bold text-cyan-300 mb-1">{selectedIncident.title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(selectedIncident.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {selectedIncident.country}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {selectedIncident.attack_type}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-gray-500 hover:text-cyan-400 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {/* Severity Badge */}
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    color: getSeverityColor(selectedIncident.severity),
                    background: `${getSeverityColor(selectedIncident.severity)}18`,
                    border: `1px solid ${getSeverityColor(selectedIncident.severity)}44`,
                  }}
                >
                  Severity: {getSeverityLabel(selectedIncident.severity)}
                  {selectedIncident.severity != null && ` (${selectedIncident.severity}/10)`}
                </span>
              </div>

              {/* AI Summary */}
              {selectedIncident.ai_summary && (
                <div>
                  <h4 className="text-xs text-cyan-400 uppercase tracking-wider mb-2">AI Summary</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedIncident.ai_summary}</p>
                </div>
              )}

              {/* Source Link */}
              {selectedIncident.source_url && (
                <div>
                  <h4 className="text-xs text-cyan-400 uppercase tracking-wider mb-2">Source</h4>
                  <a
                    href={selectedIncident.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors break-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{selectedIncident.source_url}</span>
                  </a>
                </div>
              )}

              {/* Related Incidents */}
              {relatedIncidents.length > 0 && (
                <div>
                  <h4 className="text-xs text-cyan-400 uppercase tracking-wider mb-2">
                    Related Incidents
                  </h4>
                  <div className="space-y-1.5">
                    {relatedIncidents.map((rel) => (
                      <button
                        key={rel.id}
                        onClick={() => setSelectedIncident(rel)}
                        className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-cyan-500/8 transition-colors text-left"
                      >
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: getSeverityColor(rel.severity) }}
                        />
                        <span className="text-xs text-gray-300 truncate flex-1">{rel.title}</span>
                        <span className="text-[10px] text-gray-500 shrink-0">
                          {new Date(rel.published_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
