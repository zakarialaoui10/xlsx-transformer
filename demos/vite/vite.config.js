import { defineConfig } from "vite";
import XlsxTranformer from "xlsx-transformer/vite"

export default defineConfig({
    plugins:[
        XlsxTranformer({
            firstSheetOnly : true
        })
    ]
});
