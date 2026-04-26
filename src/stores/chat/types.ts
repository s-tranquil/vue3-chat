export enum SenderType {
    User = "user",
    Bot = "bot",
}

export type ChatMessage = {
    id: string,
    sender: SenderType,
    text: string,
    timestamp: string,
};

export type ChatItem = {
    id: string,
    title: string,
    messages: ChatMessage[],
};
