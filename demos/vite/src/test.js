import { Matrix } from "ziko"
import sheets from "./wc-data.xls"
console.log(sheets["data-1"].data instanceof Matrix)
console.log(sheets["data-1"])


// import * as XLSX from 'xlsx';

// const buffer = await fetch('/wc-data.xls').then(r => r.arrayBuffer());
// const workbook = XLSX.read(buffer, { type: 'array' });
// const sheet = workbook.Sheets[workbook.SheetNames[0]];
// const HtmlString = XLSX.utils.sheet_to_html(sheet);

// const parser = new DOMParser()
// const doc = parser.parseFromString(HtmlString, "text/html");
// const table = doc.querySelector("table")

// console.log(table)
