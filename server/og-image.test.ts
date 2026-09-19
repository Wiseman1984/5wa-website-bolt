import { describe, it, expect } from "vitest";
import { getLevel, generateOgImage } from "./og-image";

describe("OG Image - getLevel", () => {
  it("returns Guardian for 6 correct answers", () => {
    expect(getLevel(6)).toBe("Guardian");
  });

  it("returns Informed for 4-5 correct answers", () => {
    expect(getLevel(5)).toBe("Informed");
    expect(getLevel(4)).toBe("Informed");
  });

  it("returns Aware for 2-3 correct answers", () => {
    expect(getLevel(3)).toBe("Aware");
    expect(getLevel(2)).toBe("Aware");
  });

  it("returns Vulnerable for 0-1 correct answers", () => {
    expect(getLevel(1)).toBe("Vulnerable");
    expect(getLevel(0)).toBe("Vulnerable");
  });
});

describe("OG Image - generateOgImage", () => {
  it("generates a valid PNG buffer for typical score", async () => {
    const buffer = await generateOgImage(850, 5, "Informed", "http://localhost:3000");
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(1000);
    // PNG magic bytes
    expect(buffer[0]).toBe(0x89);
    expect(buffer[1]).toBe(0x50); // P
    expect(buffer[2]).toBe(0x4e); // N
    expect(buffer[3]).toBe(0x47); // G
  });

  it("generates a valid PNG for perfect score (Guardian)", async () => {
    const buffer = await generateOgImage(1000, 6, "Guardian", "http://localhost:3000");
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(1000);
    expect(buffer[0]).toBe(0x89);
  });

  it("generates a valid PNG for zero score (Vulnerable)", async () => {
    const buffer = await generateOgImage(0, 0, "Vulnerable", "http://localhost:3000");
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(1000);
    expect(buffer[0]).toBe(0x89);
  });

  it("handles invalid level gracefully by using computed level", async () => {
    const buffer = await generateOgImage(500, 3, "InvalidLevel", "http://localhost:3000");
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(1000);
  });
});
