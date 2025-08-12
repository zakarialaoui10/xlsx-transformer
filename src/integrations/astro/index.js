import XlsxTransformer from "../vite/index.js";
const AstroXlsxTransformer = ({firstSheetOnly = true} = {}) => ({
    name: "astro-xlsx-transformer",
    hooks: {
        "astro:config:setup": async ({ updateConfig }) => {
          updateConfig({
            vite : {
              plugins : [
                XlsxTransformer({firstSheetOnly})
              ]
            }
          })
        },
    },
});
export default AstroXlsxTransformer;