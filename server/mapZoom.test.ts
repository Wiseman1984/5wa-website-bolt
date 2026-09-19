import { describe, expect, it } from "vitest";
import { getCursorFocusedZoomTransform } from "../shared/mapZoom";

function mapPointToScreen(
  mapX: number,
  mapY: number,
  transform: { x: number; y: number; scale: number },
  width: number,
  height: number,
) {
  return {
    x: width / 2 + transform.x + transform.scale * (mapX - width / 2),
    y: height / 2 + transform.y + transform.scale * (mapY - height / 2),
  };
}

describe("cursor-focused Threat Map zoom", () => {
  it("keeps the geographic point beneath an off-center cursor fixed on screen", () => {
    const width = 1200;
    const height = 630;
    const cursor = { x: 860, y: 180 };
    const previous = { x: 0, y: 0, scale: 1 };
    const next = getCursorFocusedZoomTransform(previous, 2, cursor.x, cursor.y, width, height);

    const before = mapPointToScreen(cursor.x, cursor.y, previous, width, height);
    const after = mapPointToScreen(cursor.x, cursor.y, next, width, height);

    expect(before).toEqual(cursor);
    expect(after.x).toBeCloseTo(cursor.x, 8);
    expect(after.y).toBeCloseTo(cursor.y, 8);
  });

  it("preserves the focal map point when zooming from an already panned view", () => {
    const width = 900;
    const height = 460;
    const cursor = { x: 150, y: 350 };
    const previous = { x: -120, y: 55, scale: 3 };
    const focalMapPoint = {
      x: width / 2 + (cursor.x - width / 2 - previous.x) / previous.scale,
      y: height / 2 + (cursor.y - height / 2 - previous.y) / previous.scale,
    };
    const next = getCursorFocusedZoomTransform(previous, 4.5, cursor.x, cursor.y, width, height);
    const after = mapPointToScreen(focalMapPoint.x, focalMapPoint.y, next, width, height);

    expect(after.x).toBeCloseTo(cursor.x, 8);
    expect(after.y).toBeCloseTo(cursor.y, 8);
  });
});

