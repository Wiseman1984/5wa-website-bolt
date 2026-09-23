import { useMemo, useState, useCallback } from "react";
import { Calendar, Play, Pause, RotateCcw, Flame } from "lucide-react";
import type { ThreatIncident } from "@/components/ThreatDashboard";

interface TimelineSliderProps {
  incidents: ThreatIncident[];
  onTimeFilter: (filtered: ThreatIncident[]) => void;
}

export default function TimelineSlider({ incidents, onTimeFilter }: TimelineSliderProps) {
  const sortedDates = useMemo(() => {
    return incidents
      .map((i) => new Date(i.published_at).getTime())
      .filter((t) => !isNaN(t))
      .sort((a, b) => a - b);
  }, [incidents]);

  const dateRange = useMemo(() => {
    if (sortedDates.length === 0) return null;
    return { min: sortedDates[0], max: sortedDates[sortedDates.length - 1] };
  }, [sortedDates]);

  const [rangeEnd, setRangeEnd] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const effectiveEnd = rangeEnd ?? dateRange?.max ?? 0;

  const filteredByTime = useMemo(() => {
    if (!dateRange) return incidents;
    return incidents.filter((i) => {
      const t = new Date(i.published_at).getTime();
      return t >= dateRange.min && t <= effectiveEnd;
    });
  }, [incidents, dateRange, effectiveEnd]);

  const heatmapData = useMemo(() => {
    if (!showHeatmap) return null;
    const buckets: Record<string, { count: number; lat: number; lng: number }> = {};
    for (const inc of filteredByTime) {
      if (inc.latitude == null || inc.longitude == null) continue;
      const key = `${Math.round(inc.latitude)},${Math.round(inc.longitude)}`;
      if (!buckets[key]) {
        buckets[key] = { count: 0, lat: inc.latitude, lng: inc.longitude };
      }
      buckets[key].count++;
    }
    return Object.values(buckets).sort((a, b) => b.count - a.count);
  }, [filteredByTime, showHeatmap]);

  const handlePlay = useCallback(() => {
    if (!dateRange || isPlaying) return;
    setIsPlaying(true);
    const span = dateRange.max - dateRange.min;
    const step = span / 60;
    let current = dateRange.min;
    const interval = setInterval(() => {
      current += step;
      if (current >= dateRange.max) {
        setRangeEnd(dateRange.max);
        setIsPlaying(false);
        clearInterval(interval);
        return;
      }
      setRangeEnd(current);
    }, 200);
    return () => clearInterval(interval);
  }, [dateRange, isPlaying]);

  const handleReset = useCallback(() => {
    setRangeEnd(null);
    setIsPlaying(false);
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const progress = dateRange
    ? ((effectiveEnd - dateRange.min) / (dateRange.max - dateRange.min)) * 100
    : 0;

  const visibleCount = filteredByTime.length;
  const totalCount = incidents.length;

  return (
    <div className="bg-[#0c1220]/90 border border-cyan-500/25 rounded-lg p-4 mb-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
          <Calendar className="w-4 h-4" />
          Timeline Replay
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHeatmap((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              showHeatmap
                ? "bg-orange-500/15 border-orange-500/50 text-orange-400"
                : "bg-slate-800/30 border-slate-700/50 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Heatmap
          </button>
        </div>
      </div>

      {dateRange ? (
        <>
          {/* Slider */}
          <div className="relative mb-3">
            <input
              type="range"
              min={dateRange.min}
              max={dateRange.max}
              value={effectiveEnd}
              onChange={(e) => {
                setIsPlaying(false);
                setRangeEnd(Number(e.target.value));
              }}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-700/50 accent-cyan-500"
              style={{
                background: `linear-gradient(to right, #06b6d4 ${progress}%, #334155 ${progress}%)`,
              }}
            />
            <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
              <span>{formatDate(dateRange.min)}</span>
              <span className="font-semibold text-cyan-300">{formatDate(effectiveEnd)}</span>
              <span>{formatDate(dateRange.max)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className="flex items-center gap-1.5 bg-cyan-500/15 border border-cyan-500/50 text-cyan-300 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-cyan-500/25 transition-colors disabled:opacity-50"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? "Playing..." : "Play Timeline"}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 bg-slate-800/30 border border-slate-700/50 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-medium hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <div className="text-xs text-slate-500 ml-auto">
              Showing <span className="text-cyan-400 font-semibold">{visibleCount}</span> / {totalCount} incidents
            </div>
          </div>

          {/* Heatmap display */}
          {showHeatmap && heatmapData && (
            <div className="border-t border-slate-700/50 pt-3">
              <div className="text-xs text-slate-400 mb-2">Top Hotspots (by incident density)</div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {heatmapData.slice(0, 10).map((spot, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-slate-500 w-6">{idx + 1}</span>
                    <div className="flex-1 bg-slate-800/30 rounded h-5 overflow-hidden relative">
                      <div
                        className="h-full rounded bg-gradient-to-r from-orange-500/40 to-red-500/60 transition-all duration-300"
                        style={{ width: `${(spot.count / heatmapData[0].count) * 100}%` }}
                      />
                      <span className="absolute left-2 top-0.5 text-[10px] text-slate-300 font-medium">
                        {spot.count} incident{spot.count > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-xs text-slate-500 py-4 text-center">No timeline data available</div>
      )}
    </div>
  );
}
