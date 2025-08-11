import * as XLSX from 'xlsx';
import fs from 'fs';

export default function XlsxTransformer() {
  return {
    name: 'XLSX-TRANSFORMER',
    transform(src, id) {
      if (id.endsWith('.xls') || id.endsWith('.xlsx')) {
        const buffer = fs.readFileSync(id);
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheets = {};
        workbook.SheetNames.forEach(sheetName => {
          sheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          // sheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        });
        // console.log(JSON.stringify(sheets))
        // Export JSON
        return {
          code: `
          const sheets = ${JSON.stringify(sheets)}
          export default sheets
          `,
          map: null,
        };
      }
    },
  };
}
