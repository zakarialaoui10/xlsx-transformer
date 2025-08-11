import * as XLSX from 'xlsx';

export const sheet_to_html_table = (sheet) => {
    const HtmlString =  XLSX.utils.sheet_to_html(sheet);
    const parser = new DOMParser()
    const doc = parser.parseFromString(HtmlString, "text/html");
    const HTMLTable = doc.querySelector("table").outerHTML; 
    return HTMLTable
}