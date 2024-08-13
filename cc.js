var fs = require("fs");
const ligneReplace = require('line-replace');
var arguments = process.argv ;

var dir_component = arguments[2].toLowerCase();
var name_file = arguments[3].toLowerCase()
var  new_component = arguments[3].charAt(0).toUpperCase() + arguments[3].slice(1); ;

var dir = 'src/components/'+dir_component
var file = dir+"/"+name_file+".js"

if(fs.existsSync(file)){
  console.log("This file is already exist")
  return
}

var writeFile = fs.createWriteStream('src/components/'+dir_component +'/'+ name_file +'.js');

defaultContent =""+
 "import React from \"react\"; \n" + 
"const " + new_component + "= () => {\n"+
"   return(\n" +
"     <h2>Welcome</h2>\n"+
"   );\n"+
"};\n"+
"export default "+ new_component+";"

writeFile.write(defaultContent);
writeFile.end();

