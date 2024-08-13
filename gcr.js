var fs = require("fs");
const ligneReplace = require('line-replace');
var arguments = process.argv ;

var dir_component = arguments[2].toLowerCase();
var name_components = dir_component.charAt(0).toUpperCase() + dir_component.slice(1);
var dir = 'src/components/'+dir_component

if(fs.existsSync(dir)){
  console.log("Warning :","Components Already exists! ")
  return
}

fs.mkdir('src/components/'+dir_component, { recursive: true }, (err) => {
    if (err) throw err;
  });

var writeFile = fs.createWriteStream('src/components/'+dir_component +'/'+ dir_component +'.js');

defaultContent =""+
 "import React from \"react\"; \n" + 
 "import { TitlePage } from \"../templates/templates\"; \n"+
"const " + name_components + "= ({MenuCollapse,theme,logo}) => {\n"+
"   return(\n" +
"       <div className={!MenuCollapse ? \"content\" : \"contentCollapse\"}>\n" +
"           <TitlePage theme={theme} title=\""+ name_components +"\"/>\n" +
"           <div className=\"card shadow\">\n"+
"               <div className=\"card-body\">\n"+
"                   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus vero eum unde cum reprehenderit nulla corrupti? Sed maxime voluptatem nam voluptatum velit nobis nisi. Error quam ipsum, iusto vel culpa velit, sunt maiores architecto eligendi ratione numquam neque explicabo similique quibusdam saepe. Culpa at fugit ut in aut exercitationem praesentium sed. Sint nam explicabo cumque amet veniam. Nam explicabo deserunt ab, dolores facere reiciendis debitis quis. At est reiciendis totam, laboriosam tenetur voluptate reprehenderit a, similique ducimus culpa libero veritatis, facere provident nobis! Veritatis iure consectetur voluptate eveniet vel repudiandae doloremque corporis culpa amet quia. Odit porro facilis natus magnam.\n"+
"               </div>\n"+
"           </div>\n"+
"       </div>\n"+
"   );\n"+
"};\n"+
"export default "+ name_components+";"

writeFile.write(defaultContent);
writeFile.end();
var data = fs.readFileSync('src/components/route/route.js').toString().split("\n");
const array = []
for(let index = 0; index < data.length; index++){
  if(data[index] == "\r"){
  		array.push(index)
  }
}
var import_components = "import "+ name_components + " from \"../"+dir_component+"/"+ dir_component + "\";\r"
var generate_route = "            <Route path={Route_Server + \""+ dir_component+"\"} element = {<"+ name_components +" MenuCollapse={MenuCollapse} theme={theme} logo={logo}/>}></Route>\r" 
data.splice(array[0], 0, import_components)
data.splice(array[1]+1,0, generate_route)

var text = data.join("\n");
fs.writeFile('src/components/route/route.js', text, function (err) {
  if (err) return console.log(err);
});
