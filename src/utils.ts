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

export function average(array: number[]) {
    return array.reduce((a, b) => a + b) / array.length
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

export function generateId(): string {
    return URL.createObjectURL(new Blob([])).slice(-36)
}

export function findIndexClosestToValue(array: number[], value: number): number {
    const arr = array.map(element => Math.abs(element - value))
    const min = Math.min(...arr)

    return arr.indexOf(min)
}

export function formatISODateToShortDateString(isoString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }

    const date = new Date(isoString)
    
    return date.toLocaleString('en-US', options)
}

export function accessNestedObject(object: object, path: string): any {
    const split = path.split('.')
    let toReturn: any = null

    split.forEach((value, index) => {
        if (index === 0) {
            toReturn = object[value as keyof object]
        } else {
            toReturn = toReturn[value]
        }
    })

    return toReturn
}
