# วิธีการใช้ FILE UPLOAD UI

จำเป็นต้องติดตั้ง `@craco/craco` `tsconfig-paths-webpack-plugin` ด้วย และต้องใช้ไฟล์ `craco.config.js` ตามใน Repo ด้วยเนื่องจากต้องแก้ไข `webpack.config.js` แต่ไม่ต้องการ `eject` 

ที่ต้องแก้ไข `webpack.config.js` เพราะ
1. ต้องการ Typescript Alias การตั้งแค่ใน `tsconfig.json` อย่างเดียวมันไม่พอ
2. ต้องการใช้ `postcss.config.js` เพื่อใช้ postcss-plugin อื่นๆ ทำให้สามารถ แยกไฟล์ css เป็นหลานไฟล์โดยยังใช้ tailwindcss ได้สะดวก ที่นี่ `webpack.config.js` มันดันปิดการใช้ external config
3. จะใช้ MDX (เช่นไฟล์ Term.mdx จะได้ม่ต้องบมานั่งเขียน HTMLTAG) แต่การตั้งค่าใน `webpack.config.js` มันดันมี Bug