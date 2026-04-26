import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SenderType } from "../types";
import { createMessage } from "./createMessage";

const MOCK_UUID = "00000000-0000-0000-0000-000000000000";
const MOCK_TIMESTAMP = "2024-01-01T00:00:00.000Z";

describe("createMessage", () => {
    beforeEach(() => {
        vi.spyOn(crypto, "randomUUID").mockReturnValue(MOCK_UUID);
        vi.useFakeTimers();
        vi.setSystemTime(new Date(MOCK_TIMESTAMP));
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it("sets sender and text from arguments", () => {
        const msg = createMessage(SenderType.User, "hello");
        expect(msg.sender).toBe(SenderType.User);
        expect(msg.text).toBe("hello");
    });

    it("uses crypto.randomUUID for id", () => {
        const msg = createMessage(SenderType.Bot, "hi");
        expect(msg.id).toBe(MOCK_UUID);
    });

    it("uses current time for timestamp", () => {
        const msg = createMessage(SenderType.User, "test");
        expect(msg.timestamp).toBe(MOCK_TIMESTAMP);
    });

    it("produces independent messages (different ids)", () => {
        vi.spyOn(crypto, "randomUUID")
            .mockReturnValueOnce("aaaaaaaa-0000-0000-0000-000000000000")
            .mockReturnValueOnce("bbbbbbbb-0000-0000-0000-000000000000");
        const a = createMessage(SenderType.User, "a");
        const b = createMessage(SenderType.Bot, "b");
        expect(a.id).not.toBe(b.id);
    });
});
