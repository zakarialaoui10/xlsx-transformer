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
          if (workbook.Sheets[sheetName]?.A1) {
            const [header, ...data] = XLSX.utils.sheet_to_json(
              workbook.Sheets[sheetName],
              { header: 1 }
            );
            sheets[sheetName] = { header, data };
          }
        });
        
        return {
          code: `
            import { Matrix } from 'ziko';
            const sheetsRaw = ${JSON.stringify(sheets)};
            Object.keys(sheetsRaw).forEach(name => {
              sheetsRaw[name].data = new Matrix(sheetsRaw[name].data);
            });
            export default sheetsRaw;
          `,
          map: null,
        };
      }
    },
  };
}
