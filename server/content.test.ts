import { describe, it, expect } from "vitest";
import { siteContent } from "../shared/content";

describe("Site Content", () => {
  it("should have brand information", () => {
    expect(siteContent.brand.name).toBe("$5 Wrench Attack");
    expect(siteContent.brand.shortName).toBe("5WA");
    expect(siteContent.brand.tagline).toBe("Physical Security. Digital Trust.");
  });

  it("should have homepage content", () => {
    expect(siteContent.homepage.hero.title).toBe("$5 Wrench Attack");
    expect(siteContent.homepage.features.length).toBe(4);
  });

  it("should have tokenomics data", () => {
    expect(siteContent.tokenomics.overview.totalSupply).toBe("8 Billion");
    expect(siteContent.tokenomics.overview.burned).toBe("2 Billion (25%)");
    expect(siteContent.tokenomics.overview.locked).toBe("5 Billion (62.5%)");
  });

  it("should have burn mechanism details", () => {
    expect(siteContent.burnMechanism.mechanism.steps.length).toBe(4);
    expect(siteContent.burnMechanism.mechanism.monthlyBurn).toBe("~1.04 Million tokens per month");
  });

  it("should have verification links", () => {
    expect(siteContent.verification.verificationLinks.length).toBe(3);
    expect(siteContent.verification.verificationLinks[0].network).toBe("Ethereum");
  });

  it("should have purchase guide steps", () => {
    expect(siteContent.buyGuide.steps.length).toBe(7);
    expect(siteContent.buyGuide.steps[0].number).toBe(1);
    expect(siteContent.buyGuide.steps[0].title).toBe("Set Up a Wallet");
  });

  it("should have navigation items", () => {
    expect(siteContent.navigation.home).toBe("Home");
    expect(siteContent.navigation.tokenomics).toBe("Tokenomics");
    expect(siteContent.navigation.burnMechanism).toBe("Burn Mechanism");
    expect(siteContent.navigation.verification).toBe("Verification");
    expect(siteContent.navigation.buyGuide).toBe("How to Buy");
  });

  it("should have footer content", () => {
    expect(siteContent.footer.copyright).toBeDefined();
    expect(siteContent.footer.disclaimer).toBeDefined();
  });
});
