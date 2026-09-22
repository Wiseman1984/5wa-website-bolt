import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, BrainCircuit, Database, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { AIChatBox, type Message } from "@/components/AIChatBox";
import { supabase } from "@/lib/supabase";
import { filterPhysicalSecurityIncidents } from "@shared/threatRelevance";
import { getOpsecGuide, type OpsecRegionId, type OpsecScenarioId } from "@shared/opsecGuide";
import { getOpsecUiCopy } from "@shared/opsecUi";
import type { Language } from "@shared/i18n";

interface PublicThreatIncident {
  title: string;
  country: string;
  published_at: string;
  attack_type: string;
  severity: number | null;
  ai_summary: string | null;
}

interface GuardianAiPanelProps {
  regionId: OpsecRegionId;
  scenarioId: OpsecScenarioId;
  language: Language;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

async function askGuardianEdge(payload: {
  question: string;
  regionId: OpsecRegionId;
  scenarioId: OpsecScenarioId;
  language: Language;
  conversation: Array<{ role: "user" | "assistant"; content: string }>;
  incidents: Array<{ title: string; country: string; publishedAt: string; attackType: string; severity: number | null; summary: string | null }>;
}): Promise<{ answer: string; model: string }> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase not configured");
  }
  const res = await fetch(`${SUPABASE_URL}/functions/v1/guardian-ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.text();
    let msg = `Request failed (${res.status})`;
    try { msg = JSON.parse(body).error || msg; } catch { /* use default */ }
    throw new Error(msg);
  }
  const data = await res.json();
  if (!data.answer) throw new Error("Empty response from Guardian AI");
  return data;
}

export default function GuardianAiPanel({ regionId, scenarioId, language }: GuardianAiPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [incidents, setIncidents] = useState<PublicThreatIncident[]>([]);
  const [incidentStatus, setIncidentStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const copy = getOpsecUiCopy(language).guardian;
  const guide = useMemo(() => getOpsecGuide(regionId, scenarioId, language), [regionId, scenarioId, language]);

  useEffect(() => {
    let active = true;

    async function loadPublicThreatContext() {
      setIncidentStatus("loading");
      const { data, error } = await supabase
        .from("threat_incidents")
        .select("title, country, published_at, attack_type, severity, ai_summary")
        .gte("published_at", "2024-01-01")
        .neq("country", "Unknown")
        .order("published_at", { ascending: false })
        .limit(400);

      if (!active) return;
      if (error) {
        console.warn("[Guardian AI] Public threat context unavailable:", error.message);
        setIncidents([]);
        setIncidentStatus("unavailable");
        return;
      }

      setIncidents(filterPhysicalSecurityIncidents((data ?? []) as PublicThreatIncident[]));
      setIncidentStatus("ready");
    }

    void loadPublicThreatContext();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setMessages([]);
  }, [regionId, scenarioId, language]);

  const relevantIncidents = useMemo(() => {
    const allowedCountries = new Set(guide.region.countries.map((country) => country.toLowerCase()));
    const regionIncidents = regionId === "global"
      ? incidents
      : incidents.filter((incident) => allowedCountries.has(incident.country.toLowerCase()));

    return [...regionIncidents]
      .sort((a, b) => {
        const severityDifference = (b.severity ?? 0) - (a.severity ?? 0);
        if (severityDifference !== 0) return severityDifference;
        return b.published_at.localeCompare(a.published_at);
      })
      .slice(0, 12);
  }, [guide.region.countries, incidents, regionId]);

  const handleSendMessage = async (question: string) => {
    const userMessage: Message = { role: "user", content: question };
    const priorConversation = messages
      .filter((message) => (message.role === "user" || message.role === "assistant") && typeof message.content === "string")
      .slice(-6)
      .map((message) => ({ role: message.role as "user" | "assistant", content: message.content as string }));

    setMessages((current) => [...current, userMessage]);
    setIsLoading(true);

    try {
      const result = await askGuardianEdge({
        question,
        regionId,
        scenarioId,
        language,
        conversation: priorConversation,
        incidents: relevantIncidents.map((incident) => ({
          title: incident.title,
          country: incident.country,
          publishedAt: incident.published_at,
          attackType: incident.attack_type,
          severity: incident.severity,
          summary: incident.ai_summary,
        })),
      });

      setMessages((current) => [...current, { role: "assistant", content: result.answer }]);
    } catch (error: unknown) {
      console.error("[Guardian AI] Chat request failed:", error);
      const serverMsg = error && typeof error === "object" && "message" in error ? String((error as { message: string }).message) : "";
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: serverMsg || copy.unavailable,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="guardian-ai" className="mt-8 overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#050b14]/95 shadow-[0_0_48px_rgba(6,182,212,0.1)]">
      <div className="grid border-b border-cyan-500/15 lg:grid-cols-[1fr_auto]">
        <div className="p-5 md:p-7">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-500/10">
              <BrainCircuit className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-50">Guardian AI</h3>
                <span className="rounded-full border border-green-500/25 bg-green-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-green-300">{copy.readOnlyBeta}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{copy.modelLine}</p>
            </div>
          </div>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-400">
            {copy.followUpPrefix} <strong className="text-slate-200">{guide.region.label}</strong> {copy.followUpMiddle} <strong className="text-slate-200">{guide.scenario.label}</strong> {copy.followUpSuffix}
          </p>
        </div>

        <div className="grid min-w-64 grid-cols-2 border-t border-cyan-500/15 bg-black/20 lg:border-l lg:border-t-0">
          <div className="flex flex-col justify-center border-r border-cyan-500/10 px-5 py-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-slate-500">
              <Database className="h-3.5 w-3.5" /> {copy.threatContext}
            </div>
            <div className="mt-1 text-sm font-bold text-slate-200">
              {incidentStatus === "loading" ? copy.loading : incidentStatus === "ready" ? `${relevantIncidents.length} ${copy.publicRecords}` : copy.guideOnly}
            </div>
          </div>
          <div className="flex flex-col justify-center px-5 py-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-slate-500">
              <LockKeyhole className="h-3.5 w-3.5" /> {copy.session}
            </div>
            <div className="mt-1 text-sm font-bold text-green-300">{copy.notStored}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-0 xl:grid-cols-[280px_1fr]">
        <aside className="space-y-4 border-b border-cyan-500/15 bg-[#07101b] p-5 xl:border-b-0 xl:border-r">
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-green-300">
              <ShieldCheck className="h-4 w-4" /> {copy.canDo}
            </div>
            <p className="text-xs leading-relaxed text-slate-400">{copy.canDoText}</p>
          </div>
          <div className="rounded-xl border border-slate-700/60 bg-black/20 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-200">
              <EyeOff className="h-4 w-4 text-cyan-400" /> {copy.cannotDo}
            </div>
            <p className="text-xs leading-relaxed text-slate-400">{copy.cannotDoText}</p>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-300">
              <AlertTriangle className="h-4 w-4" /> {copy.doNotEnter}
            </div>
            <p className="text-xs leading-relaxed text-slate-400">{copy.doNotEnterText}</p>
          </div>
          <p className="px-1 text-[11px] leading-relaxed text-slate-600">{copy.requestNote}</p>
        </aside>

        <div className="min-w-0 p-3 md:p-5">
          <AIChatBox
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            suggestedPrompts={guide.suggestedQuestions}
            placeholder={copy.placeholder}
            emptyStateMessage={copy.emptyState}
            height="500px"
            maxInputLength={800}
          />
        </div>
      </div>

      <div className="border-t border-red-500/15 bg-red-500/5 px-5 py-3 text-xs leading-relaxed text-red-200/80">
        <strong>{copy.immediateDangerLabel}</strong> {copy.immediateDangerText}
      </div>
    </div>
  );
}
