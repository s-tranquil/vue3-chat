import { describe, it, expect, vi, afterEach } from "vitest";
import { getRandomDelay } from "./getRandomDelay";

describe("getRandomDelay", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns min when Math.random() is 0", () => {
        vi.spyOn(Math, "random").mockReturnValue(0);
        expect(getRandomDelay(200, 600)).toBe(200);
    });

    it("returns max when Math.random() is 1", () => {
        vi.spyOn(Math, "random").mockReturnValue(1);
        expect(getRandomDelay(200, 600)).toBe(600);
    });

    it("returns midpoint when Math.random() is 0.5", () => {
        vi.spyOn(Math, "random").mockReturnValue(0.5);
        expect(getRandomDelay(200, 600)).toBe(400);
    });

    it("returns min when min equals max", () => {
        vi.spyOn(Math, "random").mockReturnValue(0.5);
        expect(getRandomDelay(300, 300)).toBe(300);
    });

    it("result is within [min, max] for real random values", () => {
        for (let i = 0; i < 10; i++) {
            const result = getRandomDelay(200, 600);
            expect(result).toBeGreaterThanOrEqual(200);
            expect(result).toBeLessThanOrEqual(600);
        }
    });
});
