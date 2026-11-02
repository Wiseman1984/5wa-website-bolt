import { useState, useEffect, useCallback } from "react";
import { Bell, Check, Globe, Save, Shield } from "lucide-react";

interface GuardianPreferences {
  watchRegions: string[];
  minSeverity: number;
  alertTypes: string[];
  autoRefresh: boolean;
}

const DEFAULT_PREFS: GuardianPreferences = {
  watchRegions: [],
  minSeverity: 4,
  alertTypes: ["kidnapping", "robbery", "home-invasion"],
  autoRefresh: true,
};

const STORAGE_KEY = "guardian-prefs";

const REGION_OPTIONS = [
  { id: "global", label: "Global" },
  { id: "asia", label: "Asia" },
  { id: "europe", label: "Europe" },
  { id: "north-america", label: "North America" },
  { id: "latin-america", label: "Latin America" },
  { id: "africa", label: "Africa" },
  { id: "oceania", label: "Oceania" },
];

const ALERT_TYPE_OPTIONS = [
  { id: "kidnapping", label: "Kidnapping" },
  { id: "robbery", label: "Robbery" },
  { id: "home-invasion", label: "Home Invasion" },
  { id: "extortion", label: "Extortion" },
  { id: "physical-assault", label: "Physical Assault" },
  { id: "device-seizure", label: "Device Seizure" },
];

export default function GuardianPrefsPanel() {
  const [prefs, setPrefs] = useState<GuardianPreferences>(DEFAULT_PREFS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPrefs({ ...DEFAULT_PREFS, ...JSON.parse(stored) });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const save = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // localStorage unavailable
    }
  }, [prefs]);

  const toggleRegion = (regionId: string) => {
    setPrefs((prev) => ({
      ...prev,
      watchRegions: prev.watchRegions.includes(regionId)
        ? prev.watchRegions.filter((r) => r !== regionId)
        : [...prev.watchRegions, regionId],
    }));
  };

  const toggleAlertType = (typeId: string) => {
    setPrefs((prev) => ({
      ...prev,
      alertTypes: prev.alertTypes.includes(typeId)
        ? prev.alertTypes.filter((t) => t !== typeId)
        : [...prev.alertTypes, typeId],
    }));
  };

  return (
    <div className="mt-3 space-y-5">
      <p className="text-xs text-slate-400 leading-relaxed">
        Customize which regions and threat types you care about. Stored locally only — no account needed.
      </p>

      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-2">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          Watch Regions
        </div>
        <div className="flex flex-wrap gap-2">
          {REGION_OPTIONS.map((region) => (
            <button
              key={region.id}
              onClick={() => toggleRegion(region.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                prefs.watchRegions.includes(region.id)
                  ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-300"
                  : "bg-slate-800/30 border-slate-700/50 text-slate-400 hover:text-slate-200"
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>
        {prefs.watchRegions.length === 0 && (
          <p className="text-[10px] text-slate-500 mt-1.5">No regions selected — you'll see all regions by default.</p>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-2">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          Minimum Severity: <span className="text-cyan-300 font-bold ml-1">{prefs.minSeverity}/10</span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          value={prefs.minSeverity}
          onChange={(e) => setPrefs((prev) => ({ ...prev, minSeverity: Number(e.target.value) }))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-700/50 accent-cyan-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>Low (1)</span>
          <span>High (10)</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-2">
          <Bell className="w-3.5 h-3.5 text-cyan-400" />
          Alert Me About
        </div>
        <div className="flex flex-wrap gap-2">
          {ALERT_TYPE_OPTIONS.map((type) => (
            <button
              key={type.id}
              onClick={() => toggleAlertType(type.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                prefs.alertTypes.includes(type.id)
                  ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-300"
                  : "bg-slate-800/30 border-slate-700/50 text-slate-400 hover:text-slate-200"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-slate-700/50">
        <button
          onClick={save}
          className="flex items-center gap-2 bg-cyan-500/15 border border-cyan-500/50 text-cyan-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-500/25 transition-colors"
        >
          {saved ? <Check className="w-4 h-4 text-green-400" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Preferences"}
        </button>
        <span className="text-[10px] text-slate-500">Stored locally · No account required</span>
      </div>
    </div>
  );
}
