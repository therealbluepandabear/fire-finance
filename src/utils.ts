import { Workbook } from 'exceljs'
import { RetirementCalculatorOutputs } from './models/Calculator'

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
        { 
            style: 'currency',
            currency: 'USD' 
        }
    ).format(amount).replace('.00', '')
}

function getWorkbook(outputs: RetirementCalculatorOutputs): Workbook {
    const workbook = new Workbook()
    workbook.created = new Date()

    const worksheet = workbook.addWorksheet('FIRE Outlook')
    worksheet.headerFooter.oddHeader = 'FIRE Outlook'
    worksheet.columns = [
        { header: 'Age', key: 'age' },
        { header: 'Networth', key: 'networth' }
    ]

    outputs.data.forEach(value => {
        worksheet.addRow({ age: value.age, networth: currency(value.networth) })
    })

    const retirementAgeRowIndex = outputs.retirementAge - (outputs.data[0].age) + 2
    const rowToHighlight = worksheet.getRow(retirementAgeRowIndex)

    rowToHighlight.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffd700' }
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