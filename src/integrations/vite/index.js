import * as XLSX from 'xlsx';
import fs from 'fs';

export default function XlsxTransformer({ firstSheetOnly = true } = {}) {
  return {
    name: 'XLSX-TRANSFORMER',
    transform(src, id) {
      if (id.endsWith('.xls') || id.endsWith('.xlsx')) {
        const buffer = fs.readFileSync(id);
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetNames = workbook.SheetNames;

        const outputSheets = {};
        sheetNames.forEach(sheetName => {
          if (workbook.Sheets[sheetName]?.A1) {
            const [header, ...data] = XLSX.utils.sheet_to_json(
              workbook.Sheets[sheetName],
              { header: 1 }
            );
            outputSheets[sheetName] = { header, data };
          }
        });

        if (firstSheetOnly) {
          const firstSheetName = sheetNames[0];
          const firstSheet = outputSheets[firstSheetName];
          return {
            code: `
              import { Matrix } from 'ziko';
              export const header = ${JSON.stringify(firstSheet.header)};
              export const data = new Matrix(${JSON.stringify(firstSheet.data)});
            `,
            map: null,
          };
        } else {
          return {
            code: `
              import { Matrix } from 'ziko';
              const Sheets = ${JSON.stringify(outputSheets)};
              Object.keys(Sheets).forEach(name => {
                Sheets[name].data = new Matrix(Sheets[name].data);
              });
              export {Sheets};
            `,
            map: null,
          };
        }
      }
    },
  };
}
