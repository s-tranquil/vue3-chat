import { describe, it, expect, vi, afterEach } from "vitest";
import { pickRandom } from "./pickRandom";

describe("pickRandom", () => {
    afterEach(() => vi.restoreAllMocks());

    it("returns the only element from a single-item array", () => {
        expect(pickRandom(["only"])).toBe("only");
    });

    it("returns the first element when Math.random() is 0", () => {
        vi.spyOn(Math, "random").mockReturnValue(0);
        expect(pickRandom(["a", "b", "c"])).toBe("a");
    });

    it("returns the last element when Math.random() approaches 1", () => {
        vi.spyOn(Math, "random").mockReturnValue(0.999);
        expect(pickRandom(["a", "b", "c"])).toBe("c");
    });

    it("always returns an element that exists in the array", () => {
        const arr = ["x", "y", "z"];
        for (let i = 0; i < 50; i++) {
            expect(arr).toContain(pickRandom(arr));
        }
    });
});
