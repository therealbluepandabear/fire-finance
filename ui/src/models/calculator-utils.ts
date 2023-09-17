export function adjustForInflation(returnRate: number, inflationRate: number): number {
    return ((1 + returnRate) / (1 + inflationRate)) - 1
}