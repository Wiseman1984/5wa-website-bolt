export const GLOBE_INITIAL_VIEW = {
  lat: 18,
  lng: -38,
  altitude: 1.05,
} as const;

// Globe.gl uses world units for OrbitControls distance (globe radius is 100).
// Keeping maxDistance equal to the initial view prevents the globe shrinking into a tiny dot.
export const GLOBE_MAX_CAMERA_DISTANCE = 220;
export const GLOBE_MIN_CAMERA_DISTANCE = 115;
// Transition before the camera can penetrate the sphere: keeps the interaction intentional.
export const GLOBE_MAP_TRANSITION_DISTANCE = 138;
export const GLOBE_AUTO_ROTATE_SPEED = 0.38;
export const GLOBE_AUTO_ROTATE_RESUME_DELAY = 1200;
export const GLOBE_PCB_TRACE_ALTITUDE = 0.018;
export const GLOBE_VIEWPORT_ASPECT_RATIO = 0.54;
export const GLOBE_VIEWPORT_MIN_HEIGHT = 360;
export const GLOBE_VIEWPORT_MAX_HEIGHT = 560;

export interface PcbTracePoint {
  lat: number;
  lng: number;
  alt?: number;
}

export interface PcbTracePath {
  id: string;
  color: string;
  stroke: number;
  points: PcbTracePoint[];
}

const cyan = "rgba(0, 212, 255, 0.92)";
const teal = "rgba(20, 184, 166, 0.72)";

export const PCB_TRACE_PATHS: PcbTracePath[] = [
  { id: "na-1", color: cyan, stroke: 0.28, points: [{ lat: 58, lng: -128 }, { lat: 52, lng: -128 }, { lat: 52, lng: -105 }, { lat: 45, lng: -105 }, { lat: 45, lng: -82 }] },
  { id: "na-2", color: teal, stroke: 0.22, points: [{ lat: 42, lng: -124 }, { lat: 36, lng: -124 }, { lat: 36, lng: -108 }, { lat: 30, lng: -108 }, { lat: 30, lng: -91 }] },
  { id: "na-3", color: cyan, stroke: 0.2, points: [{ lat: 62, lng: -112 }, { lat: 56, lng: -112 }, { lat: 56, lng: -92 }, { lat: 49, lng: -92 }, { lat: 49, lng: -72 }] },
  { id: "na-4", color: teal, stroke: 0.18, points: [{ lat: 26, lng: -104 }, { lat: 24, lng: -96 }, { lat: 20, lng: -96 }, { lat: 18, lng: -88 }] },
  { id: "sa-1", color: cyan, stroke: 0.24, points: [{ lat: 8, lng: -76 }, { lat: -4, lng: -76 }, { lat: -4, lng: -62 }, { lat: -18, lng: -62 }, { lat: -18, lng: -48 }] },
  { id: "sa-2", color: teal, stroke: 0.2, points: [{ lat: -10, lng: -70 }, { lat: -22, lng: -70 }, { lat: -22, lng: -58 }, { lat: -36, lng: -58 }, { lat: -36, lng: -49 }] },
  { id: "sa-3", color: cyan, stroke: 0.18, points: [{ lat: 1, lng: -58 }, { lat: -8, lng: -58 }, { lat: -8, lng: -48 }, { lat: -20, lng: -48 }] },
  { id: "eu-1", color: cyan, stroke: 0.24, points: [{ lat: 58, lng: -8 }, { lat: 54, lng: -8 }, { lat: 54, lng: 8 }, { lat: 49, lng: 8 }, { lat: 49, lng: 24 }] },
  { id: "eu-2", color: teal, stroke: 0.2, points: [{ lat: 61, lng: 8 }, { lat: 56, lng: 8 }, { lat: 56, lng: 23 }, { lat: 51, lng: 23 }, { lat: 51, lng: 35 }] },
  { id: "eu-3", color: cyan, stroke: 0.18, points: [{ lat: 45, lng: -4 }, { lat: 45, lng: 10 }, { lat: 40, lng: 10 }, { lat: 40, lng: 25 }] },
  { id: "af-1", color: cyan, stroke: 0.24, points: [{ lat: 31, lng: -9 }, { lat: 22, lng: -9 }, { lat: 22, lng: 8 }, { lat: 8, lng: 8 }, { lat: 8, lng: 28 }] },
  { id: "af-2", color: teal, stroke: 0.2, points: [{ lat: 16, lng: -15 }, { lat: 5, lng: -15 }, { lat: 5, lng: 3 }, { lat: -10, lng: 3 }, { lat: -10, lng: 22 }] },
  { id: "af-3", color: cyan, stroke: 0.18, points: [{ lat: 2, lng: 31 }, { lat: -12, lng: 31 }, { lat: -12, lng: 22 }, { lat: -27, lng: 22 }, { lat: -27, lng: 30 }] },
  { id: "as-1", color: cyan, stroke: 0.25, points: [{ lat: 57, lng: 38 }, { lat: 57, lng: 66 }, { lat: 50, lng: 66 }, { lat: 50, lng: 94 }, { lat: 42, lng: 94 }] },
  { id: "as-2", color: teal, stroke: 0.21, points: [{ lat: 62, lng: 78 }, { lat: 55, lng: 78 }, { lat: 55, lng: 108 }, { lat: 47, lng: 108 }, { lat: 47, lng: 132 }] },
  { id: "as-3", color: cyan, stroke: 0.19, points: [{ lat: 39, lng: 49 }, { lat: 34, lng: 49 }, { lat: 34, lng: 72 }, { lat: 28, lng: 72 }, { lat: 28, lng: 92 }] },
  { id: "as-4", color: teal, stroke: 0.18, points: [{ lat: 34, lng: 102 }, { lat: 28, lng: 102 }, { lat: 28, lng: 118 }, { lat: 22, lng: 118 }, { lat: 22, lng: 130 }] },
  { id: "sea-1", color: cyan, stroke: 0.18, points: [{ lat: 22, lng: 97 }, { lat: 15, lng: 97 }, { lat: 15, lng: 108 }, { lat: 7, lng: 108 }, { lat: 7, lng: 118 }] },
  { id: "oc-1", color: cyan, stroke: 0.22, points: [{ lat: -14, lng: 116 }, { lat: -23, lng: 116 }, { lat: -23, lng: 134 }, { lat: -33, lng: 134 }, { lat: -33, lng: 151 }] },
  { id: "oc-2", color: teal, stroke: 0.18, points: [{ lat: -18, lng: 128 }, { lat: -27, lng: 128 }, { lat: -27, lng: 143 }, { lat: -36, lng: 143 }] },
];
