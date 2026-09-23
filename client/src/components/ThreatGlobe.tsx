import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Globe as GlobeIcon, Map } from "lucide-react";
import {
  FLAT_MAP_MAX_ZOOM,
  FLAT_MAP_MIN_ZOOM,
  FLAT_MAP_PROJECTION,
  FLAT_MAP_RENDER_WORLD_COPIES,
  MAPBOX_DARK_STYLE,
  MAPBOX_WATER_COLOR,
  MAPBOX_LAND_COLOR,
  MAPBOX_COUNTRY_BORDER_COLOR,
  MAPBOX_COASTLINE_COLOR,
} from "@shared/mapboxConfig";
import {
  GLOBE_AUTO_ROTATE_RESUME_DELAY,
  GLOBE_AUTO_ROTATE_SPEED,
  GLOBE_INITIAL_VIEW,
  GLOBE_MAP_TRANSITION_DISTANCE,
  GLOBE_MAX_CAMERA_DISTANCE,
  GLOBE_MIN_CAMERA_DISTANCE,
  GLOBE_PCB_TRACE_ALTITUDE,
  GLOBE_VIEWPORT_ASPECT_RATIO,
  GLOBE_VIEWPORT_MAX_HEIGHT,
  GLOBE_VIEWPORT_MIN_HEIGHT,
  PCB_TRACE_PATHS,
} from "@shared/globeConfig";
import { createLandPcbTraces, createPcbGlobeTexture } from "@/lib/globeTexture";

// Mapbox GL CSS loaded dynamically when switching to flat map view (external dep)

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

interface ThreatGlobeProps {
  incidents: ThreatIncident[];
  forcedViewMode?: "globe" | "map" | null;
}

function GlobeAmbientCircuit() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 1600 800" preserveAspectRatio="none" className="h-full w-full opacity-100">
        <defs>
          <linearGradient id="globe-ambient-cyan" x1="0" x2="1">
            <stop offset="0" stopColor="#0ea5e9" stopOpacity="0" />
            <stop offset="0.42" stopColor="#22d3ee" stopOpacity="0.48" />
            <stop offset="1" stopColor="#0ea5e9" stopOpacity="0" />
          </linearGradient>
          <filter id="globe-ambient-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g fill="none" stroke="url(#globe-ambient-cyan)" strokeWidth="1.45" opacity="0.88">
          <path d="M0 180H154V128H260V220H356" />
          <path d="M0 290H104V350H215V410H352" />
          <path d="M0 580H172V520H274V610H365" />
          <path d="M1240 180H1360V112H1518V70H1600" />
          <path d="M1248 324H1392V390H1516V442H1600" />
          <path d="M1235 588H1358V650H1478V710H1600" />
        </g>

        <g fill="none" stroke="#0ea5e9" strokeDasharray="5 12" strokeWidth="1.15" opacity="0.5">
          <ellipse cx="800" cy="400" rx="430" ry="320" />
          <ellipse cx="800" cy="400" rx="500" ry="365" />
        </g>

        <g fill="#22d3ee" filter="url(#globe-ambient-glow)">
          <circle cx="154" cy="180" r="3" /><circle cx="260" cy="128" r="2.5" /><circle cx="215" cy="410" r="3" />
          <circle cx="172" cy="580" r="2.5" /><circle cx="1360" cy="180" r="3" /><circle cx="1518" cy="70" r="2.5" />
          <circle cx="1392" cy="324" r="3" /><circle cx="1478" cy="710" r="2.5" />
        </g>

        <g fill="none" stroke="#38bdf8" strokeDasharray="10 30" strokeWidth="1.7" opacity="0.56">
          <path d="M300 270C420 220 470 250 560 315"><animate attributeName="stroke-dashoffset" from="0" to="-160" dur="5s" repeatCount="indefinite" /></path>
          <path d="M1040 505C1140 560 1200 545 1310 485"><animate attributeName="stroke-dashoffset" from="0" to="-160" dur="6.5s" repeatCount="indefinite" /></path>
          <path d="M360 530C450 610 505 625 580 642"><animate attributeName="stroke-dashoffset" from="0" to="-160" dur="7s" repeatCount="indefinite" /></path>
        </g>
      </svg>
    </div>
  );
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

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

function getPulseTiming(id: string): { period: number; speed: number; offset: number } {
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) | 0;
  }
  const normalized = Math.abs(hash);
  return {
    period: 1100 + (normalized % 1300),
    speed: 1.15 + (normalized % 70) / 100,
    offset: (normalized % 1000) / 1000,
  };
}

export default function ThreatGlobe({ incidents, forcedViewMode }: ThreatGlobeProps) {
  const [internalViewMode, setInternalViewMode] = useState<"globe" | "map">("globe");
  const viewMode = forcedViewMode ?? internalViewMode;
  const [transitioning, setTransitioning] = useState(false);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; incident: ThreatIncident } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  const restoreScrollPosition = useCallback(() => {
    const top = scrollPositionRef.current;
    requestAnimationFrame(() => window.scrollTo({ top, left: 0, behavior: "auto" }));
    window.setTimeout(() => window.scrollTo({ top, left: 0, behavior: "auto" }), 450);
  }, []);

  const handleTransitionToMap = useCallback(() => {
    if (viewMode === "map" || transitioning) return;
    scrollPositionRef.current = window.scrollY;
    setTransitioning(true);
    window.setTimeout(() => {
      setInternalViewMode("map");
      setTransitioning(false);
      setTooltip(null);
      restoreScrollPosition();
    }, 400);
  }, [restoreScrollPosition, transitioning, viewMode]);

  const handleTransitionToGlobe = useCallback(() => {
    if (viewMode === "globe" || transitioning) return;
    scrollPositionRef.current = window.scrollY;
    setTransitioning(true);
    window.setTimeout(() => {
      setInternalViewMode("globe");
      setTransitioning(false);
      setTooltip(null);
      restoreScrollPosition();
    }, 400);
  }, [restoreScrollPosition, transitioning, viewMode]);

  // Responsive dimensions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const height = Math.min(
        Math.max(width * GLOBE_VIEWPORT_ASPECT_RATIO, GLOBE_VIEWPORT_MIN_HEIGHT),
        GLOBE_VIEWPORT_MAX_HEIGHT,
      );
      setDimensions({ width, height });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Wheel gestures first reach the active Globe/Mapbox canvas, then this non-passive parent
  // listener cancels document scrolling. This keeps wheel zoom responsive without page jumps.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const preventPageWheel = (event: WheelEvent) => {
      if (event.cancelable) event.preventDefault();
      event.stopPropagation();
    };
    viewport.addEventListener("wheel", preventPageWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", preventPageWheel);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => mapRef.current?.resize?.());
  }, [dimensions.height, dimensions.width]);

  // Points data for the globe
  const pointsData = useMemo(() => {
    return incidents
      .filter((i) => i.latitude != null && i.longitude != null)
      .map((i) => {
        const pulse = getPulseTiming(i.id);
        return {
          lat: i.latitude!,
          lng: i.longitude!,
          color: getSeverityColor(i.severity),
          size: 0.4,
          pulsePeriod: pulse.period,
          pulseSpeed: pulse.speed,
          incident: i,
        };
      });
  }, [incidents]);

  // Initialize globe
  useEffect(() => {
    if (viewMode !== "globe" || !globeContainerRef.current) return;

    // Dynamic import to avoid SSR issues
    let mounted = true;
    let cleanupGlobeInteractions: (() => void) | undefined;
    Promise.all([
      import("globe.gl"),
      fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((response) => response.json()),
      import("topojson-client"),
    ]).then(([GlobeModule, worldData, topojsonClient]) => {
      if (!mounted || !globeContainerRef.current) return;

      // Clear previous
      globeContainerRef.current.innerHTML = "";

      const Globe = GlobeModule.default;
      const countries = topojsonClient.feature(worldData, worldData.objects.countries) as any;
      const pcbTextureUrl = createPcbGlobeTexture(countries);
      const pcbPaths = [...PCB_TRACE_PATHS, ...createLandPcbTraces(countries.features || [])];
      const elevatedPcbPaths = pcbPaths.map((path) => ({
        ...path,
        points: path.points.map((point) => ({ ...point, alt: GLOBE_PCB_TRACE_ALTITUDE })),
      }));
      const globe = new Globe(globeContainerRef.current)
        .width(dimensions.width)
        .height(dimensions.height)
        .backgroundColor("rgba(0,0,0,0)")
        .globeImageUrl(pcbTextureUrl)
        .showGlobe(true)
        .showAtmosphere(true)
        .atmosphereColor("#0ea5e9")
        .atmosphereAltitude(0.15)
        // Polygon layer for countries
        .polygonCapColor(() => "rgba(7, 21, 36, 0.025)")
        .polygonSideColor(() => "rgba(14, 165, 233, 0.08)")
        .polygonStrokeColor(() => "rgba(12, 122, 138, 0.62)")
        .polygonAltitude(0.005)
        .polygonsData(countries.features || [])
        // PCB/circuit traces sit just above the continent polygons.
        .pathsData(elevatedPcbPaths)
        .pathPoints("points")
        .pathPointLat("lat")
        .pathPointLng("lng")
        .pathPointAlt("alt")
        .pathColor("color")
        .pathStroke((path: any) => path.stroke * 1.55)
        .pathDashLength(1)
        .pathDashGap(0)
        .pathDashAnimateTime(0)
        .pathTransitionDuration(0)
        // Points layer for incidents
        .pointsData(pointsData)
        .pointLat("lat")
        .pointLng("lng")
        .pointColor("color")
        .pointAltitude(0.01)
        .pointRadius("size")
        .pointsMerge(false)
        // Pulsing rings around each incident point
        .ringsData(pointsData)
        .ringLat("lat")
        .ringLng("lng")
        .ringColor("color")
        .ringMaxRadius(2.5)
        .ringPropagationSpeed((point: any) => point.pulseSpeed)
        .ringRepeatPeriod((point: any) => point.pulsePeriod)
        .ringAltitude(0.015);

      // Auto-rotate
      const controls = globe.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = GLOBE_AUTO_ROTATE_SPEED;
      controls.enableDamping = true;
      controls.dampingFactor = 0.055;
      controls.enableZoom = true;
      controls.minDistance = GLOBE_MIN_CAMERA_DISTANCE;
      controls.maxDistance = GLOBE_MAX_CAMERA_DISTANCE;

      const applyInitialCamera = () => {
        if (!mounted) return;
        // Globe.gl positions the camera relative to its active target. Let pointOfView own this
        // relationship; directly setting camera.position length was clipping the globe surface.
        globe.pointOfView(GLOBE_INITIAL_VIEW, 0);
        controls.update();
      };

      applyInitialCamera();
      requestAnimationFrame(applyInitialCamera);
      window.setTimeout(applyInitialCamera, 250);
      window.setTimeout(applyInitialCamera, 700);

      // Point hover
      globe.onPointHover((point: any, prevPoint: any) => {
        if (point && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          // Get mouse position from the globe's pointer event
          const event = (globe as any)._lastPointerEvent;
          if (event) {
            setTooltip({
              x: event.clientX - rect.left,
              y: event.clientY - rect.top - 10,
              incident: point.incident,
            });
          }
        } else {
          setTooltip(null);
        }
      });

      // Zoom detection for transition: use distance to the active controls target rather than
      // camera length, which changes after a user rotates the globe.
      const maybeTransitionToMap = () => {
        const distance = globe.camera().position.distanceTo(controls.target);
        if (distance <= GLOBE_MAP_TRANSITION_DISTANCE) {
          handleTransitionToMap();
        }
      };
      controls.addEventListener("change", maybeTransitionToMap);

      // Keep rotation visible while still respecting manual rotation. It pauses during pointer
      // interaction and resumes after the user releases the globe.
      const interactionTarget = (globe as any).renderer?.()?.domElement ?? globeContainerRef.current;
      let resumeRotationTimer: number | undefined;
      const pauseAutoRotate = () => {
        window.clearTimeout(resumeRotationTimer);
        controls.autoRotate = false;
      };
      const resumeAutoRotate = () => {
        window.clearTimeout(resumeRotationTimer);
        resumeRotationTimer = window.setTimeout(() => {
          controls.autoRotate = true;
          controls.autoRotateSpeed = GLOBE_AUTO_ROTATE_SPEED;
        }, GLOBE_AUTO_ROTATE_RESUME_DELAY);
      };
      const detectWheelZoom = () => requestAnimationFrame(maybeTransitionToMap);
      interactionTarget?.addEventListener("pointerdown", pauseAutoRotate);
      interactionTarget?.addEventListener("pointerup", resumeAutoRotate);
      interactionTarget?.addEventListener("pointerleave", resumeAutoRotate);
      interactionTarget?.addEventListener("wheel", detectWheelZoom, { passive: true });
      cleanupGlobeInteractions = () => {
        window.clearTimeout(resumeRotationTimer);
        controls.removeEventListener("change", maybeTransitionToMap);
        interactionTarget?.removeEventListener("pointerdown", pauseAutoRotate);
        interactionTarget?.removeEventListener("pointerup", resumeAutoRotate);
        interactionTarget?.removeEventListener("pointerleave", resumeAutoRotate);
        interactionTarget?.removeEventListener("wheel", detectWheelZoom);
      };

      globeRef.current = globe;
    }).catch((error) => {
      console.error("Failed to initialize Threat Globe", error);
    });

      return () => {
        mounted = false;
        cleanupGlobeInteractions?.();
        if (globeRef.current) {
        globeRef.current._destructor?.();
        globeRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, dimensions.width, dimensions.height]);

  // Update globe points data without reinitializing
  useEffect(() => {
    if (viewMode !== "globe" || !globeRef.current) return;
    globeRef.current.pointsData(pointsData).ringsData(pointsData);
  }, [pointsData, viewMode]);

  // Initialize Mapbox flat map
  useEffect(() => {
    if (viewMode !== "map" || !mapContainerRef.current || !MAPBOX_TOKEN) return;

    let mounted = true;
    // Inject mapbox CSS dynamically since mapbox-gl is an external dep
    if (!document.querySelector('link[href*="mapbox-gl"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/mapbox-gl@3.28.1/dist/mapbox-gl.css";
      document.head.appendChild(link);
    }
    import("mapbox-gl").then((mapboxgl) => {
      if (!mounted || !mapContainerRef.current) return;

      mapboxgl.default.accessToken = MAPBOX_TOKEN;

      const map = new mapboxgl.default.Map({
        container: mapContainerRef.current,
        // Built-in style ensures Mapbox vector tiles, cities, roads, and labels load at every zoom level.
        style: MAPBOX_DARK_STYLE,
        // Explicitly opt out of Mapbox GL v3's globe projection so Flat Map remains a full rectangle.
        projection: FLAT_MAP_PROJECTION,
        center: [20, 20],
        zoom: FLAT_MAP_MIN_ZOOM,
        minZoom: FLAT_MAP_MIN_ZOOM,
        maxZoom: FLAT_MAP_MAX_ZOOM,
        renderWorldCopies: FLAT_MAP_RENDER_WORLD_COPIES,
        accessToken: MAPBOX_TOKEN,
        attributionControl: false,
      });

      map.on("load", () => {
        if (!mounted) return;

        // Recolor the real Mapbox Dark v11 data without removing its detailed vector tiles.
        for (const layer of map.getStyle().layers ?? []) {
          const layerId = layer.id.toLowerCase();
          try {
            if (layer.type === "background") {
              map.setPaintProperty(layer.id, "background-color", "#0a0e1a");
            } else if (layer.type === "fill" && /water/.test(layerId)) {
              // Deepen the ocean slightly so the native water polygons reveal the coastline.
              map.setPaintProperty(layer.id, "fill-color", MAPBOX_WATER_COLOR);
            } else if (layer.type === "fill" && /(land|landcover|park|national)/.test(layerId)) {
              map.setPaintProperty(layer.id, "fill-color", MAPBOX_LAND_COLOR);
            } else if (layer.type === "line" && /waterway/.test(layerId)) {
              map.setLayoutProperty(layer.id, "visibility", "visible");
              map.setPaintProperty(layer.id, "line-color", MAPBOX_COASTLINE_COLOR);
              map.setPaintProperty(layer.id, "line-opacity", [
                "interpolate", ["linear"], ["zoom"],
                1, 0.22,
                8, 0.42,
                12, 0.55,
              ]);
              map.setPaintProperty(layer.id, "line-width", [
                "interpolate", ["linear"], ["zoom"],
                1, 0.25,
                8, 0.6,
                12, 0.9,
              ]);
            } else if (layer.type === "line" && /road/.test(layerId)) {
              // Keep native Mapbox road data visible at city zoom while preserving a dark tactical style.
              map.setLayoutProperty(layer.id, "visibility", "visible");
              const isMajorRoad = /(motorway|trunk)/.test(layerId);
              const isPrimaryRoad = /(primary|secondary|tertiary)/.test(layerId);
              map.setPaintProperty(
                layer.id,
                "line-color",
                isMajorRoad ? "#263c4d" : isPrimaryRoad ? "#1f3344" : "#182a3a",
              );
              map.setPaintProperty(layer.id, "line-opacity", [
                "interpolate", ["linear"], ["zoom"],
                1, 0.12,
                5, 0.25,
                8, isMajorRoad ? 0.72 : isPrimaryRoad ? 0.62 : 0.48,
                14, isMajorRoad ? 0.82 : isPrimaryRoad ? 0.72 : 0.58,
              ]);
              map.setPaintProperty(layer.id, "line-width", [
                "interpolate", ["linear"], ["zoom"],
                1, isMajorRoad ? 0.4 : isPrimaryRoad ? 0.25 : 0.15,
                8, isMajorRoad ? 1.25 : isPrimaryRoad ? 0.9 : 0.65,
                14, isMajorRoad ? 2.2 : isPrimaryRoad ? 1.55 : 1.1,
              ]);
            } else if (layer.type === "line" && /admin-0-boundary|admin-1-boundary/.test(layerId)) {
              // Apply the same native Mapbox boundary treatment worldwide; no regional GeoJSON overlay is used.
              map.setLayoutProperty(layer.id, "visibility", "visible");
              map.setPaintProperty(layer.id, "line-color", MAPBOX_COUNTRY_BORDER_COLOR);
              map.setPaintProperty(layer.id, "line-opacity", [
                "interpolate", ["linear"], ["zoom"],
                1, 0.58,
                4, 0.5,
                8, 0.34,
                12, 0.24,
              ]);
              map.setPaintProperty(layer.id, "line-width", [
                "interpolate", ["linear"], ["zoom"],
                1, 1,
                4, 1,
                8, 0.72,
                12, 0.5,
              ]);
            } else if (layer.type === "line" && /(admin|boundary|border)/.test(layerId)) {
              map.setPaintProperty(layer.id, "line-color", MAPBOX_COUNTRY_BORDER_COLOR);
              map.setPaintProperty(layer.id, "line-opacity", 0.28);
              map.setPaintProperty(layer.id, "line-width", 0.75);
            } else if (layer.type === "symbol" && /(label|place|settlement)/.test(layerId)) {
              map.setPaintProperty(layer.id, "text-color", "#94a3b8");
              map.setPaintProperty(layer.id, "text-halo-color", "#0a0e1a");
              map.setPaintProperty(layer.id, "text-halo-width", 1);
            }
          } catch {
            // Some style layers do not expose every paint property; retain Mapbox defaults for those layers.
          }
        }

        // Native water polygons are outlined with a subtle teal coastline so continents and islands remain legible.
        const firstSymbolLayerId = map.getStyle().layers?.find((layer) => layer.type === "symbol")?.id;
        if (map.getSource("composite") && !map.getLayer("5wa-coastline")) {
          map.addLayer({
            id: "5wa-coastline",
            type: "line",
            source: "composite",
            "source-layer": "water",
            minzoom: 0,
            paint: {
              "line-color": MAPBOX_COASTLINE_COLOR,
              "line-opacity": [
                "interpolate", ["linear"], ["zoom"],
                1, 0.62,
                4, 0.5,
                8, 0.32,
                12, 0.24,
              ],
              "line-width": [
                "interpolate", ["linear"], ["zoom"],
                1, 0.85,
                4, 0.72,
                8, 0.58,
                12, 0.42,
              ],
            },
          }, firstSymbolLayerId);
        }

        // Add threat incident points
        const geojsonData: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: incidents
            .filter((i) => i.latitude != null && i.longitude != null)
            .map((i) => ({
              type: "Feature" as const,
              geometry: {
                type: "Point" as const,
                coordinates: [i.longitude!, i.latitude!],
              },
              properties: {
                id: i.id,
                title: i.title,
                country: i.country,
                attack_type: i.attack_type,
                severity: i.severity,
                published_at: i.published_at,
                ai_summary: i.ai_summary || "",
                color: getSeverityColor(i.severity),
                pulseOffset: getPulseTiming(i.id).offset,
              },
            })),
        };

        map.addSource("incidents", { type: "geojson", data: geojsonData });
        mapRef.current = map;

        // Glow layer
        map.addLayer({
          id: "incidents-glow",
          type: "circle",
          source: "incidents",
          paint: {
            "circle-radius": 10,
            "circle-color": ["get", "color"],
            "circle-opacity": 0.12,
            "circle-blur": 1,
          },
        });

        // Pulsing outer ring layer
        map.addLayer({
          id: "incidents-pulse",
          type: "circle",
          source: "incidents",
          paint: {
            "circle-radius": 4,
            "circle-color": "transparent",
            "circle-opacity": 0.6,
            "circle-stroke-width": 2,
            "circle-stroke-color": ["get", "color"],
            "circle-stroke-opacity": 0.6,
          },
        });

        // Core dot layer
        map.addLayer({
          id: "incidents-core",
          type: "circle",
          source: "incidents",
          paint: {
            "circle-radius": 4,
            "circle-color": ["get", "color"],
            "circle-opacity": 0.9,
            "circle-stroke-width": 1,
            "circle-stroke-color": ["get", "color"],
            "circle-stroke-opacity": 0.5,
          },
        });

        // Animate the pulse ring — each feature has a fixed pulseOffset so they desync
        let pulseFrame: number;
        const animatePulse = (timestamp: number) => {
          const t = (timestamp % 2000) / 2000;
          // Data-driven radius: base 4 + phase * 14, where phase = (t + offset) mod 1
          map.setPaintProperty("incidents-pulse", "circle-radius", [
            "interpolate", ["linear"],
            ["%", ["+", t, ["get", "pulseOffset"]], 1],
            0, 4,
            0.5, 4 + 0.5 * 14,
            1, 4 + 14,
          ] as any);
          map.setPaintProperty("incidents-pulse", "circle-stroke-opacity", [
            "interpolate", ["linear"],
            ["%", ["+", t, ["get", "pulseOffset"]], 1],
            0, 0.6,
            0.5, 0.3,
            1, 0,
          ] as any);
          pulseFrame = requestAnimationFrame(animatePulse);
        };
        pulseFrame = requestAnimationFrame(animatePulse);
        map.on("remove", () => cancelAnimationFrame(pulseFrame));

        // Popup on hover
        const popup = new mapboxgl.default.Popup({
          closeButton: false,
          closeOnClick: false,
          className: "threat-popup",
          maxWidth: "320px",
        });

        map.on("mouseenter", "incidents-core", (e) => {
          map.getCanvas().style.cursor = "pointer";
          const feature = e.features?.[0];
          if (!feature) return;
          const coords = (feature.geometry as any).coordinates.slice();
          const props = feature.properties!;
          const date = new Date(props.published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          const severityLabel = getSeverityLabel(props.severity);
          const summary = props.ai_summary || props.title;

          popup
            .setLngLat(coords)
            .setHTML(`
              <div style="background:#0c1220;border:1px solid #0ea5e9;border-radius:8px;padding:12px;color:#e2e8f0;font-size:13px;max-width:300px;">
                <div style="font-weight:700;color:#0ea5e9;margin-bottom:4px;">${props.title}</div>
                <div style="color:#94a3b8;font-size:11px;margin-bottom:6px;">${date} · ${props.country} · ${props.attack_type}</div>
                <div style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;background:${getSeverityColor(props.severity)}22;color:${getSeverityColor(props.severity)};border:1px solid ${getSeverityColor(props.severity)}44;">
                  Severity: ${severityLabel}${props.severity != null ? ` (${props.severity}/10)` : ""}
                </div>
                ${props.ai_summary ? `<div style="margin-top:6px;font-size:11px;color:#cbd5e1;line-height:1.4;">${props.ai_summary}</div>` : ""}
              </div>
            `)
            .addTo(map);
        });

        map.on("mouseleave", "incidents-core", () => {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });

        // Mapbox is mounted in the same fixed viewport as the globe. Resize after opacity/layout
        // settles so it never leaves blank bands above or below the map.
        const settleMapViewport = () => {
          map.resize();
          restoreScrollPosition();
        };
        requestAnimationFrame(settleMapViewport);
        window.setTimeout(settleMapViewport, 450);
      });

      // Add zoom/nav controls
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), "top-right");

      map.on("zoomend", () => {
        if (map.getZoom() <= FLAT_MAP_MIN_ZOOM + 0.01) {
          handleTransitionToGlobe();
        }
      });

      mapRef.current = map;
    });

    return () => {
      mounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleTransitionToGlobe, restoreScrollPosition, viewMode]);

  // Update mapbox incident data without reinitializing
  useEffect(() => {
    if (viewMode !== "map" || !mapRef.current) return;
    const source = mapRef.current.getSource("incidents");
    if (!source) return;
    const geojsonData: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: incidents
        .filter((i) => i.latitude != null && i.longitude != null)
        .map((i) => ({
          type: "Feature" as const,
          geometry: { type: "Point" as const, coordinates: [i.longitude!, i.latitude!] },
          properties: {
            id: i.id,
            title: i.title,
            country: i.country,
            attack_type: i.attack_type,
            severity: i.severity,
            published_at: i.published_at,
            ai_summary: i.ai_summary || "",
            color: getSeverityColor(i.severity),
            pulseOffset: getPulseTiming(i.id).offset,
          },
        })),
    };
    source.setData(geojsonData);
  }, [incidents, viewMode]);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#060b14] border border-cyan-500/20 rounded-xl overflow-hidden"
      style={{ height: dimensions.height }}
    >
      <GlobeAmbientCircuit />
      <div ref={viewportRef} className="absolute inset-0 z-10 overflow-hidden touch-none">
      {/* View mode toggle buttons */}
      <div className="absolute top-3 right-3 z-30 flex gap-2">
        {viewMode === "map" && (
          <button
            onClick={handleTransitionToGlobe}
            className="flex items-center gap-1.5 bg-[#0c1220]/90 border border-cyan-500/40 text-cyan-400 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-cyan-500/10 transition-colors backdrop-blur-sm"
          >
            <GlobeIcon className="w-3.5 h-3.5" />
            Globe View
          </button>
        )}
        {viewMode === "globe" && (
          <button
            onClick={handleTransitionToMap}
            className="flex items-center gap-1.5 bg-[#0c1220]/90 border border-cyan-500/40 text-cyan-400 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-cyan-500/10 transition-colors backdrop-blur-sm"
          >
            <Map className="w-3.5 h-3.5" />
            Flat Map
          </button>
        )}
      </div>

      {/* Globe View */}
        <div
          ref={globeContainerRef}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-400 ${viewMode === "globe" && !transitioning ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{ width: dimensions.width, height: dimensions.height }}
        />

      {/* Mapbox Flat Map View */}
        <div
          ref={mapContainerRef}
          className={`threat-mapbox-viewport absolute inset-0 rounded-none transition-opacity duration-400 ${viewMode === "map" && !transitioning ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{ width: dimensions.width, height: dimensions.height, borderRadius: 0, clipPath: "none" }}
        />

      {/* Fallback when Mapbox token is missing */}
      {viewMode === "map" && !MAPBOX_TOKEN && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#060b14]">
          <div className="text-center max-w-md px-6">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Flat Map Unavailable</h3>
            <p className="text-sm text-gray-400 mb-4">The detailed flat map requires a Mapbox access token which is not configured yet. Switch back to Globe view to explore threat incidents.</p>
            <button
              onClick={handleTransitionToGlobe}
              className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-500/20 transition-colors"
            >
              <GlobeIcon className="w-4 h-4" />
              Back to Globe
            </button>
          </div>
        </div>
      )}
      </div>

      {/* Globe tooltip */}
      {tooltip && viewMode === "globe" && (
        <div
          className="absolute z-40 pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -100%)" }}
        >
          <div className="bg-[#0c1220] border border-cyan-500/50 rounded-lg p-3 text-xs max-w-[280px] shadow-lg">
            <div className="font-bold text-cyan-400 mb-1">{tooltip.incident.title}</div>
            <div className="text-gray-400 text-[10px] mb-1.5">
              {new Date(tooltip.incident.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              {" · "}{tooltip.incident.country} · {tooltip.incident.attack_type}
            </div>
            <span
              className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold"
              style={{
                color: getSeverityColor(tooltip.incident.severity),
                background: `${getSeverityColor(tooltip.incident.severity)}22`,
                border: `1px solid ${getSeverityColor(tooltip.incident.severity)}44`,
              }}
            >
              Severity: {getSeverityLabel(tooltip.incident.severity)}
              {tooltip.incident.severity != null && ` (${tooltip.incident.severity}/10)`}
            </span>
            {tooltip.incident.ai_summary && (
              <div className="mt-1.5 text-gray-300 text-[10px] leading-relaxed line-clamp-3">
                {tooltip.incident.ai_summary}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-30 bg-[#0c1220]/90 border border-cyan-500/30 rounded-lg px-3 py-2 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-3 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.6)]"></span>
            <span className="text-gray-400">High (7-10)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_4px_rgba(245,158,11,0.6)]"></span>
            <span className="text-gray-400">Medium (4-6)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_4px_rgba(234,179,8,0.6)]"></span>
            <span className="text-gray-400">Low (1-3)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-cyan-500/60"></span>
            <span className="text-gray-400">Borders</span>
          </div>
        </div>
      </div>

      {/* View mode indicator */}
      <div className="absolute bottom-3 right-3 z-30 text-[10px] text-gray-500">
        {viewMode === "globe" ? "Drag to rotate · Scroll to zoom" : "Scroll to zoom · Drag to pan"}
      </div>
    </div>
  );
}
