const fs = require('fs');
const path = require('path');
		
function getEntryPages() {
  const result = {};
  try {
    console.log('master');
    const pagesPath = path.resolve(process.cwd(), './src/pages');
    if (fs.existsSync(pagesPath)) {
      fs.readdirSync(pagesPath)
        .filter((item) => item.indexOf('.') !== 0)
        .forEach((item) => {
          const url = path.join(pagesPath,item,'js','index.ts');
          let entry = ''
          if(fs.existsSync(url)){ //增加ts入口
          entry = `src/pages/${item}/js/index.ts`
		      }else{
           entry = `src/pages/${item}/js/index.js`
		      }
          result[item] = {
            // page 的入口
            entry: entry,
            // 模板来源
            template: `src/pages/${item}/index.html`,
            // 在 dist/index.html 的输出
            filename: `${item}.html`,
          };
        });
    }
  } catch (e) {
    console.log(e.message); // eslint-disable-line
  }
  return result;
}
module.exports = (api, vueOptions) => {

  const pages = getEntryPages();
  vueOptions.pages = pages;

}