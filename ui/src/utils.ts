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

export function modifyNestedPath(object: object, path: string, newValue: any): object {
    const array = path.split('.')
    const toReturn: Record<string, any> = object

    array.reduce((acc, key, index) => {
        let value = {}

        if (index === array.length - 1) {
            value = newValue
        }

        acc[key] = value

        return acc[key]
    }, toReturn)

    return toReturn as object
}

export function convertDottedKeysToNestedObject(inputJSON: Record<string, any>): object {
    // This will be the result, it's initially empty
    const result: Record<string, any> = {}

    // We will be looping over each key in the dotted-key object, each key should be formatted like:
    // a.b or a.b.c ... etc
    for (const key in inputJSON) {
        // We split each key based on the dot icon, e.g. 'a.b.c' will be [a, b, c], this will be in array of strings
        const keys = key.split('.')

        // Every operation to 'current' also modifies 'result'
        let current = result

        // We aren't looping over EACH element, just every element except the last one
        for (let i = 0; i < keys.length - 1; i++) {
            // nestedKey will be the current key that we're on, we do this by simple array access (e.g. 'a' or 'b')
            const nestedKey = keys[i]

            // Here, we are either going to add a new empty object to current[nestedKey] if there's no initial value in current[nestedKey]
            // If there is a value, it will remain unchanged
            current[nestedKey] = current[nestedKey] || {}

            // We assign current to the current object layer
            current = current[nestedKey]
        }

        current[keys.at(-1)!] = inputJSON[key]
    }

    return result as object
}

export function triggerInputEvent(inputElement: HTMLInputElement, value: string): void {
    const desc = Object.getOwnPropertyDescriptor((inputElement as any).__proto__, 'value')

    desc?.set?.call(inputElement, value)
    inputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: false }))
}

export function triggerChangeEvent(selectElement: HTMLSelectElement, value: string): void {
    const desc = Object.getOwnPropertyDescriptor((selectElement as any).__proto__, 'value')

    desc?.set?.call(selectElement, value)
    selectElement.dispatchEvent(new Event('change', { bubbles: true, cancelable: false }))
}