import * as XLSX from 'xlsx';
import { Matrix } from "ziko"

export const sheet_to_html_matrix = (sheet) => {
    const [header, ...data] =  XLSX.utils.sheet_to_json(sheet, {header : 1});
    return {
        header, 
        data : new Matrix(data)
    }
}