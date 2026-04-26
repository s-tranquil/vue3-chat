export function getRandomDelay(min: number, max: number) {
    return min + Math.random() * (max - min);
}
