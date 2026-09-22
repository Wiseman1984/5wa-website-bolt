import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { geoNaturalEarth1, geoPath, type GeoPermissibleObjects } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { getCursorFocusedZoomTransform } from "@shared/mapZoom";

// Import world-atlas TopoJSON (110m resolution — lightweight)
import worldData from "world-atlas/land-110m.json";
import countriesData from "world-atlas/countries-110m.json";

interface ThreatIncident {
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

// Country name → [longitude, latitude] for positioning threat dots
const COUNTRY_COORDS: Record<string, [number, number]> = {
  "United States": [-98, 38],
  "USA": [-98, 38],
  "US": [-98, 38],
  "Canada": [-106, 56],
  "Mexico": [-102, 23],
  "Brazil": [-51, -14],
  "Argentina": [-64, -34],
  "Colombia": [-74, 4],
  "Venezuela": [-66, 8],
  "Chile": [-71, -35],
  "Peru": [-76, -10],
  "United Kingdom": [-3, 54],
  "UK": [-3, 54],
  "France": [2, 46],
  "Germany": [10, 51],
  "Spain": [-4, 40],
  "Italy": [12, 42],
  "Netherlands": [5, 52],
  "Sweden": [18, 62],
  "Norway": [8, 62],
  "Poland": [20, 52],
  "Ukraine": [32, 49],
  "Romania": [25, 46],
  "Greece": [22, 39],
  "Portugal": [-8, 39],
  "Switzerland": [8, 47],
  "Belgium": [4, 51],
  "Czech Republic": [15, 50],
  "Austria": [14, 47],
  "Nigeria": [8, 10],
  "South Africa": [24, -29],
  "Kenya": [38, 0],
  "Egypt": [30, 27],
  "Ghana": [-2, 8],
  "Tanzania": [35, -6],
  "Ethiopia": [40, 9],
  "Morocco": [-5, 32],
  "India": [79, 21],
  "China": [104, 35],
  "Japan": [138, 36],
  "South Korea": [128, 36],
  "Thailand": [101, 15],
  "Vietnam": [108, 14],
  "Philippines": [122, 13],
  "Indonesia": [120, -5],
  "Singapore": [104, 1],
  "Malaysia": [102, 4],
  "Australia": [133, -25],
  "New Zealand": [174, -41],
  "Russia": [105, 60],
  "Turkey": [35, 39],
  "UAE": [54, 24],
  "Saudi Arabia": [45, 24],
  "Iran": [53, 32],
  "Iraq": [44, 33],
  "Israel": [35, 31],
  "Hong Kong": [114, 22],
  "Taiwan": [121, 24],
  "Pakistan": [70, 30],
  "Bangladesh": [90, 24],
  "Myanmar": [96, 20],
  "Cambodia": [105, 13],
};

function getCoords(country: string): [number, number] {
  if (COUNTRY_COORDS[country]) return COUNTRY_COORDS[country];
  let hash = 0;
  for (let i = 0; i < country.length; i++) hash = ((hash << 5) - hash + country.charCodeAt(i)) | 0;
  const lng = -160 + Math.abs(hash % 320);
  const lat = -50 + Math.abs((hash >> 8) % 100);
  return [lng, lat];
}

interface ThreatMapProps {
  incidents: ThreatIncident[];
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 20;

// Severity-based color grading
function getSeverityColor(severity: number | null | undefined): { fill: string; stroke: string; pulse: string; glow: string } {
  if (severity == null || severity >= 7) {
    // Red (high severity or unknown)
    return { fill: "rgba(255, 70, 40, 0.95)", stroke: "rgba(255, 120, 80, 0.6)", pulse: "rgba(255, 60, 30, 0.3)", glow: "rgba(255, 60, 30, 0.8)" };
  } else if (severity >= 4) {
    // Orange/amber (medium severity)
    return { fill: "rgba(245, 158, 11, 0.95)", stroke: "rgba(251, 191, 36, 0.6)", pulse: "rgba(245, 158, 11, 0.3)", glow: "rgba(245, 158, 11, 0.8)" };
  } else {
    // Yellow (low severity)
    return { fill: "rgba(234, 179, 8, 0.95)", stroke: "rgba(253, 224, 71, 0.6)", pulse: "rgba(234, 179, 8, 0.3)", glow: "rgba(234, 179, 8, 0.7)" };
  }
}

function getPulseTiming(id: string): { duration: string; delay: number } {
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) | 0;
  }
  const normalized = Math.abs(hash);
  const duration = 2.5 + (normalized % 24) / 10;
  return { duration: `${duration}s`, delay: (normalized % 30) / 10 };
}

export default function ThreatMap({ incidents }: ThreatMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 460 });
  const [hoveredIncident, setHoveredIncident] = useState<ThreatIncident | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Zoom/pan state
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const pinchStart = useRef({ dist: 0, scale: 1 });

  // Responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setDimensions({ width: w, height: Math.max(300, w * 0.5) });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // D3 projection
  const projection = useMemo(() => {
    return geoNaturalEarth1()
      .fitSize([dimensions.width, dimensions.height], {
        type: "Sphere",
      } as GeoPermissibleObjects);
  }, [dimensions]);

  const pathGenerator = useMemo(() => geoPath(projection), [projection]);

  // Convert TopoJSON to GeoJSON features
  const landFeatures = useMemo(() => {
    const topo = worldData as unknown as Topology;
    return feature(topo, topo.objects.land as GeometryCollection) as unknown as FeatureCollection<Geometry>;
  }, []);

  const countryFeatures = useMemo(() => {
    const topo = countriesData as unknown as Topology;
    return feature(topo, topo.objects.countries as GeometryCollection) as unknown as FeatureCollection<Geometry>;
  }, []);

  // Project incident coordinates to SVG positions
  // Primary: use lat/lng from DB; fallback to country-center lookup if null
  const projectedIncidents = useMemo(() => {
    return incidents.map((incident) => {
      let lng: number, lat: number;
      if (incident.longitude != null && incident.latitude != null) {
        lng = incident.longitude;
        lat = incident.latitude;
      } else {
        [lng, lat] = getCoords(incident.country);
      }
      const pos = projection([lng, lat]);
      return { incident, x: pos?.[0] ?? 0, y: pos?.[1] ?? 0 };
    });
  }, [incidents, projection]);

  // Constrain pan so map doesn't go off-screen
  const constrainTransform = useCallback((tx: number, ty: number, scale: number) => {
    const maxPanX = (dimensions.width * (scale - 1)) / 2;
    const maxPanY = (dimensions.height * (scale - 1)) / 2;
    return {
      x: Math.max(-maxPanX, Math.min(maxPanX, tx)),
      y: Math.max(-maxPanY, Math.min(maxPanY, ty)),
      scale,
    };
  }, [dimensions]);

  // Wheel zoom (desktop). This must be a native non-passive listener: React's
  // delegated wheel events are passive in modern browsers, so preventDefault()
  // alone cannot reliably stop the page from scrolling.
  const handleNativeWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    const delta = e.deltaY > 0 ? 0.85 : 1.18;
    setTransform((prev) => {
      const newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev.scale * delta));
      // Keep the geographic point directly below the cursor fixed while the
      // scale changes. Convert browser pixels to SVG viewBox coordinates first
      // because the responsive SVG can be rendered at a different CSS size.
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect && rect.width > 0 && rect.height > 0) {
        const mx = ((e.clientX - rect.left) / rect.width) * dimensions.width;
        const my = ((e.clientY - rect.top) / rect.height) * dimensions.height;
        const next = getCursorFocusedZoomTransform(
          prev,
          newScale,
          mx,
          my,
          dimensions.width,
          dimensions.height,
        );
        return constrainTransform(next.x, next.y, next.scale);
      }
      return constrainTransform(prev.x, prev.y, newScale);
    });
  }, [dimensions, constrainTransform]);

  // Capture wheel events while the pointer is within the map only. The
  // `{ passive: false }` flag is critical: it allows preventDefault() to block
  // the browser's normal document scroll, while scrolling works normally as
  // soon as the pointer leaves this container.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleNativeWheel, {
      passive: false,
      capture: true,
    });

    return () => {
      container.removeEventListener("wheel", handleNativeWheel, true);
    };
  }, [handleNativeWheel]);

  // Pointer events for pan (works for both mouse and touch)
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch" || e.button === 0) {
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY, tx: transform.x, ty: transform.y };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    }
  }, [transform]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPanning) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    setTransform((prev) => constrainTransform(panStart.current.tx + dx, panStart.current.ty + dy, prev.scale));
  }, [isPanning, constrainTransform]);

  const handlePointerUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Touch pinch-to-zoom
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStart.current = { dist: Math.hypot(dx, dy), scale: transform.scale };
    }
  }, [transform.scale]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, pinchStart.current.scale * (dist / pinchStart.current.dist)));
      setTransform((prev) => constrainTransform(prev.x, prev.y, newScale));
    }
  }, [constrainTransform]);

  // Button controls
  const zoomIn = useCallback(() => {
    setTransform((prev) => {
      const newScale = Math.min(MAX_ZOOM, prev.scale * 1.4);
      return constrainTransform(prev.x, prev.y, newScale);
    });
  }, [constrainTransform]);

  const zoomOut = useCallback(() => {
    setTransform((prev) => {
      const newScale = Math.max(MIN_ZOOM, prev.scale / 1.4);
      return constrainTransform(prev.x, prev.y, newScale);
    });
  }, [constrainTransform]);

  const resetView = useCallback(() => {
    setTransform({ x: 0, y: 0, scale: 1 });
  }, []);

  const handleDotHover = (incident: ThreatIncident, e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 70,
      });
    }
    setHoveredIncident(incident);
  };

  const isZoomed = transform.scale > 1.05;
  // Incident coordinates must move with the zoomed geography, while their
  // visual markers stay readable. This inverse scale cancels the parent map
  // group's zoom for dot radii, glow, and pulse animations only.
  const incidentInverseScale = 1 / transform.scale;
  const pulseOpacity = Math.max(0.2, 0.7 / Math.sqrt(transform.scale));
  const glowBlur = Math.max(1.5, 4 / Math.sqrt(transform.scale));

  return (
    <div ref={containerRef} className="relative bg-[#060b14] border border-cyan-500/20 rounded-xl overflow-hidden select-none">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,255,255,0.4) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,255,255,0.4) 40px)`,
      }}></div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)`,
      }}></div>

      {/* SVG Map with zoom/pan */}
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="relative z-10 touch-none"
        style={{ cursor: isPanning ? "grabbing" : "grab" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <g
          transform={`translate(${dimensions.width / 2 + transform.x}, ${dimensions.height / 2 + transform.y}) scale(${transform.scale}) translate(${-dimensions.width / 2}, ${-dimensions.height / 2})`}
          style={{ transition: isPanning ? "none" : "transform 0.2s ease-out" }}
        >
          {/* Outer glow sphere boundary */}
          <ellipse
            cx={dimensions.width / 2}
            cy={dimensions.height / 2}
            rx={dimensions.width * 0.48}
            ry={dimensions.height * 0.47}
            fill="none"
            stroke="rgba(0, 255, 255, 0.08)"
            strokeWidth="1"
          />

          {/* Country boundaries — thin dark lines */}
          {countryFeatures.features.map((feat: any, i: number) => (
            <path
              key={`country-${i}`}
              d={pathGenerator(feat as GeoPermissibleObjects) || ""}
              fill="rgba(0, 255, 255, 0.02)"
              stroke="rgba(0, 255, 255, 0.12)"
              strokeWidth="0.5"
            />
          ))}

          {/* Land masses — main continent outlines with glow */}
          {landFeatures.features.map((feat: any, i: number) => (
            <path
              key={`land-${i}`}
              d={pathGenerator(feat as GeoPermissibleObjects) || ""}
              fill="rgba(0, 255, 255, 0.03)"
              stroke="rgba(0, 255, 255, 0.45)"
              strokeWidth="1.2"
              style={{ filter: "drop-shadow(0 0 2px rgba(0, 255, 255, 0.4))" }}
            />
          ))}

          {/* Incident dots */}
          {projectedIncidents.map(({ incident, x, y }, i) => (
            <g
              key={incident.id || i}
              transform={`translate(${x} ${y}) scale(${incidentInverseScale}) translate(${-x} ${-y})`}
            >
              {(() => {
                const colors = getSeverityColor(incident.severity);
                const pulse = getPulseTiming(incident.id);
                return (
                  <>
                    {/* Outer pulse ring */}
                    <circle cx={x} cy={y} r="8" fill="none" stroke={colors.pulse} strokeWidth="0.8" opacity={pulseOpacity}>
                      <animate attributeName="r" values="3;9;3" dur={pulse.duration} begin={pulse.delay} repeatCount="indefinite" />
                      <animate attributeName="opacity" values={`${pulseOpacity};0;${pulseOpacity}`} dur={pulse.duration} begin={pulse.delay} repeatCount="indefinite" />
                    </circle>
                    {/* Inner glow */}
                    <circle cx={x} cy={y} r="3.75" fill={colors.pulse} stroke="none" opacity={Math.min(0.7, pulseOpacity + 0.1)} />
                    {/* Core dot */}
                    <circle
                      cx={x} cy={y} r="2.75"
                      fill={colors.fill} stroke={colors.stroke} strokeWidth="0.8"
                      className="cursor-pointer"
                      style={{ filter: `drop-shadow(0 0 ${glowBlur}px ${colors.glow})` }}
                      onMouseEnter={(e) => handleDotHover(incident, e)}
                      onMouseLeave={() => setHoveredIncident(null)}
                    />
                  </>
                );
              })()}
            </g>
          ))}
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredIncident && (
        <div
          className="absolute z-50 bg-[#0c1220] border border-cyan-500/40 rounded-lg p-3 shadow-xl max-w-xs pointer-events-none"
          style={{ left: tooltipPos.x, top: tooltipPos.y, transform: "translateX(-50%)" }}
        >
          <div className="text-sm font-semibold text-foreground mb-1">
            {hoveredIncident.title}
          </div>
          {hoveredIncident.ai_summary && (
            <div className="text-xs text-gray-300 mb-1.5 leading-relaxed">
              {hoveredIncident.ai_summary}
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-cyan-400">{hoveredIncident.country}</span>
            <span>|</span>
            <span>{new Date(hoveredIncident.published_at).toLocaleDateString()}</span>
            <span>|</span>
            <span className="text-orange-400">{hoveredIncident.attack_type}</span>
          </div>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="absolute top-3 right-2 flex flex-col gap-1 z-20">
        <button
          onClick={zoomIn}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-[#0c1220]/90 border border-cyan-500/30 rounded text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/60 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={zoomOut}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-[#0c1220]/90 border border-cyan-500/30 rounded text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/60 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        {isZoomed && (
          <button
            onClick={resetView}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-[#0c1220]/90 border border-orange-500/30 rounded text-orange-400 hover:bg-orange-500/20 hover:border-orange-500/60 transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        )}
      </div>

      {/* Zoom level indicator */}
      {isZoomed && (
        <div className="absolute top-3 left-14 text-xs text-cyan-400/70 bg-[#0c1220]/80 px-2 py-1 rounded border border-cyan-500/20 z-20">
          {transform.scale.toFixed(1)}x
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-3 left-4 flex items-center gap-4 text-xs text-muted-foreground z-20">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(255,60,30,0.8)]" title="Severity 7-10"></div>
          <span>High</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]" title="Severity 4-6"></div>
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(234,179,8,0.7)]" title="Severity 1-3"></div>
          <span>Low</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-[1.5px] bg-cyan-400/60 shadow-[0_0_3px_rgba(0,255,255,0.5)]"></div>
          <span>Continent Outline</span>
        </div>
      </div>

      {/* Scroll to zoom hint */}
      {!isZoomed && (
        <div className="absolute top-3 left-4 text-[10px] text-cyan-400/50 z-20">
          Scroll to zoom · Drag to pan
        </div>
      )}

      {/* Corner decorations */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-cyan-500/40 pointer-events-none"></div>
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-cyan-500/40 pointer-events-none"></div>
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-cyan-500/40 pointer-events-none"></div>
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-cyan-500/40 pointer-events-none"></div>
    </div>
  );
}
