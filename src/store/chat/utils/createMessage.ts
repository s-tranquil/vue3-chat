import { type ChatMessage, SenderType } from "../types";

export function createMessage(sender: SenderType, text: string): ChatMessage {
    return {
        id: crypto.randomUUID(),
        sender,
        text,
        timestamp: new Date().toISOString(),
    };
}
