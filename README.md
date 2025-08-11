# xls-transformer
A plugin that allows you to import `.xls` / `.xlsx` files directly in JavaScript/TypeScript as either:
- **First sheet only :** returns header and data as named exports.
```js
import {header, data} from './data.xls'
```

- **Multiple sheets :** returns a named export `Sheets`, an object where each sheet contains header (array) and data (a Matrix instance from ZikoJS).
```js
import { Sheets } from './data.xls'
```
## Install 
```bash
npm i xlsx-transformer
```
## Integrations 
### Vite 
```js
import { defineConfig } from "vite";
import XlsxTranformer from "xlsx-transformer/vite"
export default defineConfig({
    plugins:[
        XlsxTranformer({
            firstSheetOnly : false  // Optional, the default is true
        })
    ]
});

```
<!-- ### Astro 
```

``` -->