export function range(start: number, end: number): number[] {
    const array: number[] = []

    for (let i = start; i < end; ++i) {
        array.push(i)
    }

    return array
}

export function formatCurrency(amount: number, compact: boolean = false): string {
    return new Intl.NumberFormat(
        'en-US',
        { style: 'currency', currency: 'USD', notation: compact ? 'compact' : 'standard' }
    ).format(amount)
}

export function formatPercentage(percent: number): string {
    return `${(percent * 100).toFixed(2)}%`
}

export function saveToFile(fileName: string, url: string): void {
    let a = document.createElement('a')
    a.setAttribute('display', 'none')

    document.body.appendChild(a)

    a.href = url
    a.download = fileName

    a.click()
    window.URL.revokeObjectURL(url)
    a.remove()
}
