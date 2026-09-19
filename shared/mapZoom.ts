export interface MapTransform {
  x: number;
  y: number;
  scale: number;
}

/**
 * Returns the next pan offset for a zoom operation that preserves the map
 * coordinate under the supplied cursor position. Cursor coordinates must be
 * normalized to the SVG viewBox coordinate system.
 */
export function getCursorFocusedZoomTransform(
  previous: MapTransform,
  nextScale: number,
  cursorX: number,
  cursorY: number,
  width: number,
  height: number,
): MapTransform {
  const centerX = width / 2;
  const centerY = height / 2;
  const factor = nextScale / previous.scale;

  return {
    x: (cursorX - centerX) - factor * (cursorX - centerX - previous.x),
    y: (cursorY - centerY) - factor * (cursorY - centerY - previous.y),
    scale: nextScale,
  };
}
