import { Workbook } from 'exceljs'
import { RetirementCalculatorOutputs } from './models/Calculator'

export function range(start: number, end: number): number[] {
    const array: number[] = []

    for (let i = start; i < end; ++i) {
        array.push(i)
    }

    return array
}

export function currency(amount: number, compact: boolean = false): string {
    return new Intl.NumberFormat(
        'en-US',
        { style: 'currency', currency: 'USD', notation: compact ? "compact" : "standard" }
    ).format(amount)
}

function getWorkbook(outputs: RetirementCalculatorOutputs): Workbook {
    const workbook = new Workbook()
    workbook.created = new Date()

    const worksheet = workbook.addWorksheet('FIRE Outlook')
    worksheet.headerFooter.oddHeader = 'FIRE Outlook'
    worksheet.columns = [
        { header: 'Age', key: 'age' },
        { header: 'Year', key: 'year' },
        { header: 'Networth', key: 'networth' }
    ]

    outputs.data.forEach((value, index) => {
        worksheet.addRow({ age: value.age, year: new Date().getFullYear() + index, networth: currency(value.networth) })
    })

    const retirementAgeRowIndex = outputs.retirementAge - (outputs.data[0].age) + 2

    const row = worksheet.getRow(retirementAgeRowIndex)
    const cellsToHighlight = [row.getCell(1), row.getCell(2), row.getCell(3)]

    const highlightColor = 'ffd700'

    for (const cell of cellsToHighlight) {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: highlightColor }
        }
    }

    return workbook
}

function saveToFile(fileName: string, blob: Blob): void {
    let a = document.createElement('a')
    a.setAttribute('display', 'none')

    document.body.appendChild(a)

    const url = URL.createObjectURL(blob)

    a.href = url
    a.download = fileName

    a.click()
    window.URL.revokeObjectURL(url)
    a.remove()
}

export async function writeXLSX(outputs: RetirementCalculatorOutputs): Promise<void> {
    const workbook = getWorkbook(outputs)

    const xlsxId = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

    const buffer = await workbook.xlsx.writeBuffer()
    const xlsxBlob = new Blob([buffer], { type: xlsxId })

    saveToFile('fire_outlook.xlsx', xlsxBlob)
}