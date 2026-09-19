import { describe, expect, it } from "vitest";
import {
  GLOBE_AUTO_ROTATE_RESUME_DELAY,
  GLOBE_AUTO_ROTATE_SPEED,
  GLOBE_PCB_TRACE_ALTITUDE,
  GLOBE_VIEWPORT_ASPECT_RATIO,
  GLOBE_VIEWPORT_MAX_HEIGHT,
  GLOBE_VIEWPORT_MIN_HEIGHT,
  GLOBE_INITIAL_VIEW,
  GLOBE_MAP_TRANSITION_DISTANCE,
  GLOBE_MAX_CAMERA_DISTANCE,
  GLOBE_MIN_CAMERA_DISTANCE,
  PCB_TRACE_PATHS,
} from "@shared/globeConfig";
import { createLandPcbTraces } from "../client/src/lib/globeTexture";

describe("3D globe presentation configuration", () => {
  it("locks the zoomed-out globe to the approved medium-large initial size", () => {
    expect(GLOBE_INITIAL_VIEW.altitude).toBe(1.05);
    expect(GLOBE_MAX_CAMERA_DISTANCE).toBe(220);
    expect(GLOBE_MIN_CAMERA_DISTANCE).toBeLessThan(GLOBE_MAP_TRANSITION_DISTANCE);
    expect(GLOBE_MAP_TRANSITION_DISTANCE).toBeLessThan(GLOBE_MAX_CAMERA_DISTANCE);
    expect(GLOBE_AUTO_ROTATE_SPEED).toBeGreaterThan(0.3);
    expect(GLOBE_AUTO_ROTATE_RESUME_DELAY).toBeGreaterThanOrEqual(1000);
    expect(GLOBE_PCB_TRACE_ALTITUDE).toBeGreaterThan(0);
    expect(GLOBE_VIEWPORT_ASPECT_RATIO).toBeGreaterThan(0.5);
    expect(GLOBE_VIEWPORT_MIN_HEIGHT).toBeLessThan(GLOBE_VIEWPORT_MAX_HEIGHT);
  });

  it("provides PCB traces across every major inhabited continent", () => {
    expect(PCB_TRACE_PATHS.length).toBeGreaterThanOrEqual(18);
    expect(PCB_TRACE_PATHS.every((trace) => trace.points.length >= 4)).toBe(true);
    expect(PCB_TRACE_PATHS.every((trace) => trace.color.includes("rgba"))).toBe(true);
  });

  it("creates geographic PCB traces clipped to supplied land polygons", () => {
    const squareCountry = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [[[-20, -12], [20, -12], [20, 12], [-20, 12], [-20, -12]]],
      },
    };
    const traces = createLandPcbTraces([squareCountry]);
    expect(traces.length).toBeGreaterThan(0);
    expect(traces.every((trace) => trace.points.length >= 3)).toBe(true);
  });
});
