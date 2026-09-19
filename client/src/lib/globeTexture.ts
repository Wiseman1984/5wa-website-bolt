import { geoBounds, geoCentroid, geoContains, geoEquirectangular, geoGraticule10, geoPath } from "d3-geo";
import type { PcbTracePath } from "@shared/globeConfig";

function seededRandom(seed = 0x5a17c0de) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}

export function createLandPcbTraces(features: any[]): PcbTracePath[] {
  const traces: PcbTracePath[] = [];

  features.forEach((feature, featureIndex) => {
    const [[west, south], [east, north]] = geoBounds(feature);
    const [centerLng, centerLat] = geoCentroid(feature);
    const width = Math.min(Math.abs(east - west), 40);
    const height = Math.min(Math.abs(north - south), 28);
    if (!Number.isFinite(centerLng) || !Number.isFinite(centerLat) || width < 1.4 || height < 1.2) return;

    const attemptCount = width > 12 && height > 8 ? 4 : 2;
    for (let attempt = 0; attempt < attemptCount; attempt += 1) {
      const offset = attempt - (attemptCount - 1) / 2;
      const startLng = centerLng - width * 0.22;
      const startLat = centerLat + offset * height * 0.16;
      const stepLng = width * (0.18 + attempt * 0.025);
      const stepLat = height * (0.13 + attempt * 0.018);
      const rawPoints = [
        { lat: startLat, lng: startLng },
        { lat: startLat, lng: startLng + stepLng },
        { lat: startLat - stepLat, lng: startLng + stepLng },
        { lat: startLat - stepLat, lng: startLng + stepLng * 2 },
        { lat: startLat - stepLat * 2, lng: startLng + stepLng * 2 },
      ];

      const landPoints = rawPoints.filter((point) => geoContains(feature, [point.lng, point.lat]));
      if (landPoints.length < 3) continue;

      traces.push({
        id: `land-${featureIndex}-${attempt}`,
        color: attempt % 2 === 0 ? "rgba(0, 212, 255, 0.78)" : "rgba(20, 184, 166, 0.62)",
        stroke: attempt === 0 ? 0.22 : 0.17,
        points: landPoints,
      });
    }
  });

  return traces;
}

export function createPcbGlobeTexture(countries: any, width = 2048, height = 1024): string {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) return "";

  const projection = geoEquirectangular()
    .scale(width / (2 * Math.PI))
    .translate([width / 2, height / 2]);
  const path = geoPath(projection, context);

  context.fillStyle = "#040812";
  context.fillRect(0, 0, width, height);

  // Subtle latitude/longitude grid across the full globe.
  context.beginPath();
  path(geoGraticule10());
  context.strokeStyle = "rgba(14, 165, 233, 0.12)";
  context.lineWidth = 1;
  context.stroke();

  // Dark PCB substrate for land masses.
  context.beginPath();
  path(countries);
  context.fillStyle = "#071524";
  context.fill();

  // Draw deterministic Manhattan-style traces clipped to all land polygons.
  context.save();
  context.beginPath();
  path(countries);
  context.clip();

  const random = seededRandom();
  for (let index = 0; index < 460; index += 1) {
    let x = random() * width;
    let y = random() * height;
    const horizontal = random() > 0.42;
    const directionX = random() > 0.5 ? 1 : -1;
    const directionY = random() > 0.5 ? 1 : -1;
    const corners: Array<[number, number]> = [[x, y]];

    context.beginPath();
    context.moveTo(x, y);
    for (let step = 0; step < 4; step += 1) {
      if ((step % 2 === 0) === horizontal) {
        x += directionX * (28 + random() * 82);
      } else {
        y += directionY * (12 + random() * 36);
      }
      context.lineTo(x, y);
      corners.push([x, y]);
    }

    context.strokeStyle = index % 3 === 0
      ? "rgba(0, 212, 255, 0.5)"
      : "rgba(20, 184, 166, 0.34)";
    context.lineWidth = index % 4 === 0 ? 1.65 : 1.05;
    context.stroke();

    context.fillStyle = index % 3 === 0
      ? "rgba(0, 212, 255, 0.66)"
      : "rgba(20, 184, 166, 0.46)";
    for (const [nodeX, nodeY] of corners) {
      context.beginPath();
      context.arc(nodeX, nodeY, index % 4 === 0 ? 1.9 : 1.2, 0, Math.PI * 2);
      context.fill();
    }
  }
  context.restore();

  // Redraw country edges above the circuit texture for geographic clarity.
  context.beginPath();
  path(countries);
  context.strokeStyle = "rgba(0, 212, 255, 0.34)";
  context.lineWidth = 0.8;
  context.stroke();

  return canvas.toDataURL("image/png");
}
