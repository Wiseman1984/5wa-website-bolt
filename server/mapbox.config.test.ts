import { describe, expect, it } from "vitest";
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

describe("Mapbox flat-map configuration", () => {
  it("uses a rectangular Mercator projection with city-level zoom limits", () => {
    expect(MAPBOX_DARK_STYLE).toBe("mapbox://styles/mapbox/dark-v11");
    expect(FLAT_MAP_PROJECTION).toBe("mercator");
    expect(FLAT_MAP_MIN_ZOOM).toBe(1.5);
    expect(FLAT_MAP_MAX_ZOOM).toBe(12);
    expect(FLAT_MAP_RENDER_WORLD_COPIES).toBe(false);
    expect(MAPBOX_WATER_COLOR).toBe("#050a14");
    expect(MAPBOX_LAND_COLOR).toBe("#0f172a");
    expect(MAPBOX_COUNTRY_BORDER_COLOR).toBe("#0c7a8a");
    expect(MAPBOX_COASTLINE_COLOR).toBe("#0a5060");
  });
});
