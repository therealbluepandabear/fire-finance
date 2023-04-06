export function range(start: number, end: number): number[] {
    const array: number[] = []

    for (let i = start; i < end; ++i) {
        array.push(i)
    }

    return array
}

export function currency(amount: number): string {
    return new Intl.NumberFormat(
        'en-US', 
        { style: 'currency', currency: 'USD' }
    ).format(amount).replace('.00', '')
}