import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { Calendar, Play, Pause, RotateCcw, Flame, Snail, Rabbit, Gauge } from "lucide-react";
import type { ThreatIncident } from "@/components/ThreatDashboard";

interface TimelineSliderProps {
  incidents: ThreatIncident[];
  onTimeFilter: (filtered: ThreatIncident[]) => void;
  onPlayStateChange?: (playing: boolean) => void;
}

type Speed = "slow" | "normal" | "fast";

const SPEED_CONFIG: Record<Speed, { steps: number; intervalMs: number; label: string }> = {
  slow: { steps: 120, intervalMs: 600, label: "Slow (~72s)" },
  normal: { steps: 100, intervalMs: 400, label: "Normal (~40s)" },
  fast: { steps: 80, intervalMs: 200, label: "Fast (~16s)" },
};

export default function TimelineSlider({ incidents, onTimeFilter, onPlayStateChange }: TimelineSliderProps) {
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
  const [isPaused, setIsPaused] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [speed, setSpeed] = useState<Speed>("normal");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentRef = useRef(0);

  const effectiveEnd = rangeEnd ?? dateRange?.max ?? 0;

  const filteredByTime = useMemo(() => {
    if (!dateRange) return incidents;
    return incidents.filter((i) => {
      const t = new Date(i.published_at).getTime();
      return t >= dateRange.min && t <= effectiveEnd;
    });
  }, [incidents, dateRange, effectiveEnd]);

  useEffect(() => {
    onTimeFilter(filteredByTime);
  }, [filteredByTime, onTimeFilter]);

  useEffect(() => {
    onPlayStateChange?.(isPlaying && !isPaused);
  }, [isPlaying, isPaused, onPlayStateChange]);

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

  const clearPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startPlayback = useCallback((fromValue: number) => {
    if (!dateRange) return;
    clearPlayback();
    const config = SPEED_CONFIG[speed];
    const span = dateRange.max - dateRange.min;
    const step = span / config.steps;
    currentRef.current = fromValue;
    intervalRef.current = setInterval(() => {
      currentRef.current += step;
      if (currentRef.current >= dateRange.max) {
        setRangeEnd(dateRange.max);
        setIsPlaying(false);
        setIsPaused(false);
        clearPlayback();
        return;
      }
      setRangeEnd(currentRef.current);
    }, config.intervalMs);
  }, [dateRange, speed, clearPlayback]);

  const handlePlay = useCallback(() => {
    if (!dateRange) return;
    if (isPlaying && !isPaused) return;
    if (isPlaying && isPaused) {
      setIsPaused(false);
      startPlayback(currentRef.current);
      return;
    }
    setIsPlaying(true);
    setIsPaused(false);
    const startVal = rangeEnd != null && rangeEnd < dateRange.max ? rangeEnd : dateRange.min;
    currentRef.current = startVal;
    setRangeEnd(startVal);
    startPlayback(startVal);
  }, [dateRange, isPlaying, isPaused, rangeEnd, startPlayback]);

  const handlePause = useCallback(() => {
    setIsPaused(true);
    clearPlayback();
  }, [clearPlayback]);

  const handleReset = useCallback(() => {
    clearPlayback();
    setRangeEnd(null);
    setIsPlaying(false);
    setIsPaused(false);
    currentRef.current = 0;
  }, [clearPlayback]);

  useEffect(() => {
    return () => clearPlayback();
  }, [clearPlayback]);

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
  const isActuallyPlaying = isPlaying && !isPaused;

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
                clearPlayback();
                setIsPlaying(false);
                setIsPaused(false);
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
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {/* Play / Pause button */}
            {!isActuallyPlaying ? (
              <button
                onClick={handlePlay}
                className="flex items-center gap-1.5 bg-cyan-500/15 border border-cyan-500/50 text-cyan-300 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-cyan-500/25 transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                {isPaused ? "Resume" : "Play Timeline"}
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/50 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-amber-500/25 transition-colors"
              >
                <Pause className="w-3.5 h-3.5" />
                Pause
              </button>
            )}
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 bg-slate-800/30 border border-slate-700/50 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-medium hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>

            {/* Speed selector */}
            <div className="flex items-center gap-1.5 bg-slate-800/30 border border-slate-700/50 rounded-lg p-0.5">
              {([
                { key: "slow", icon: Snail },
                { key: "normal", icon: Gauge },
                { key: "fast", icon: Rabbit },
              ] as const).map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setSpeed(opt.key);
                    if (isActuallyPlaying) {
                      clearPlayback();
                      startPlayback(currentRef.current);
                    }
                  }}
                  title={SPEED_CONFIG[opt.key].label}
                  className={`flex items-center justify-center w-8 h-7 rounded-md text-xs transition-all ${
                    speed === opt.key
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <opt.icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>

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
