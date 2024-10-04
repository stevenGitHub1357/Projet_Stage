const fs = require('fs');


const deploy = async (req, res, next) => {
    console.log("deploy")
    try {
        await runBuildReact(req,res)
        await fetchUrl(req,res,2)
    } catch (error) {
        console.log("continue")
        // await fetchUrl(req,res,2)
        // res.status(400).send(false);
    }finally{
        // await fetchManifest(req,res)
        await fetchAccess(req, res)
        await fetchIndex(req,res)
        await fetchCss(req, res)
        await fetchUrl(req,res,2)
        res.status(200).send(true); 
    }
    
}



const runBuildReact = async (req,res) => {
    console.log("runBuild")
    await fetchUrl(req,res,1)
    const path = require('path');
    const filePath = path.join(__dirname, '..', '..', 'deploy.bat');
    const exec = require('child_process').exec;
    console.log(filePath)
    await exec(`"${filePath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur lors de l'exécution du fichier .bat : ${error}`);
            // res.status(500).send({ error: 'Erreur lors de l exécution du fichier .bat' });
        } else {
            console.log(`Sortie du fichier .bat : ${stdout}`);
            
        }
    });
    
    await new Promise(resolve => setTimeout(resolve, 60000));
    for(let i=0; i<10000; i++){
        const pathCss = await getCssPath(req,res)
        const check = await checkFileExists(pathCss.toString());
        console.log("deploy : "+pathCss.toString()+" : "+check);
        if(check===false){
            console.log("loading continue")
            await new Promise(resolve => setTimeout(resolve, 10000));
        }else{
            console.log("Break fin")
            break
        }
    }
}


async function checkFileExists(filePath) {
    const fs = require('fs').promises;
    console.log("check : "+filePath)
    try {
        console.log("ok")
        await fs.access(filePath);
        return true;
    } catch {
        console.log("erreur")
        return false;
    }
}



const fetchManifest = async (req,res) => {
    try {
        console.log("manifest")
        const fsP = require('fs').promises;
        let jsonData = {};
        jsonData = fs.readFileSync('../build/asset-manifest.json', 'utf8')
        console.log(jsonData) 
        let newData = replaceWordsManifest(jsonData)
        // console.log("newdata "+newData)
        fsP.writeFile('../build/asset-manifest.json', JSON.parse(JSON.stringify(newData, null, 2)))
            .then(() => {
                console.log('Fichier JSON mis à jour avec succès');
            })
            .catch(err => {
                console.error('Erreur lors de l\'écriture du fichier:', err);
            });
        console.log("manifest-fini")
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
    }
}  
const replaceWordsManifest = (data) => {
    console.log("manifest-replace")
    const word =  '"/static';
    const replacement = '"./static';
    let rep = JSON.stringify(data)
    for(let i = 0; i<15; i++){
        rep = rep.replace(word, replacement)
    }  
    return JSON.parse(rep) 
};




const fetchIndex = async (req,res) => {
    console.log("index")
    let data = {};
    data = fs.readFileSync('../build/index.html', 'utf8')
    // console.log(data)
    let newData = replaceWordsIndex(data);
    // console.log(newData)
    fs.writeFile('../build/index.html', newData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        
        console.log('Contenu du fichier HTML mis à jour avec succès');
    });  
    console.log("index-fini")     
}
const replaceWordsIndex = (data) => {
    console.log("index-replace")
    const word =  '="/';
    const replacement = '="./';
    let rep = data
    for(let i = 0; i<15; i++){
        rep = rep.replace(word, replacement)
    }  
    return rep 
};



const fetchAccess = async (req,res) => {
    console.log("Access")
    let data = {};
    data = fs.readFileSync('../build/.htaccess', 'utf8')
    // console.log(data)
    let newData = replaceWordsAccess(data);
    // console.log(newData)
    fs.writeFile('../build/.htaccess', newData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        
        console.log('Contenu du fichier HTML mis à jour avec succès');
    });  
    console.log("Access-fini")     
}
const replaceWordsAccess = (data) => {
    console.log("Access-replace")
    const word =  'react_app';
    const replacement = 'Luminess_KPI';
    let rep = data
    for(let i = 0; i<15; i++){
        rep = rep.replace(word, replacement)
    }  
    return rep 
};



const getCssPath = async (req,res) => {
    console.log("cssPath")
    const fss = require('fs').promises;
    const folder = '../build/static/css/'
    try{
        const files = await fss.readdir(folder);
        let file = files.filter(file => file.endsWith('.css'))
        file = ""+file[0]
        // console.log(file)
        const path = folder+file
        console.log("css ="+path)
        return path
    }catch(error){
        console.log("erreur : "+error)
        return ""
    }   
}



const fetchCss = async (req,res) => {
    console.log("css")
    let data = {};
    
    const path = await getCssPath(req,res)
    console.log("path = "+path)
    data = fs.readFileSync(path, 'utf8')
    // console.log(data)
    let newData = replaceWordsCss(data);
    // console.log(newData)
    fs.writeFile(path, newData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Contenu du fichier CSS mis à jour avec succès');
    });  

    console.log("css-fini")     
}
const replaceWordsCss = (data) => {
    console.log("css-replace")
    const word =  'url(/static/media/bootstrap';
    const replacement = 'url(../../static/media/bootstrap';
    let rep = data
    for(let i = 0; i<3; i++){
        rep = rep.replace(word, replacement)
    }  
    return rep 
};

const fetchUrl = async (req,res,niveau) => {
    console.log("css")
    let data = {};
    data = fs.readFileSync('../src/global_url.js', 'utf8')
    // console.log(data)
    let word =  'param = "a"';
    let replacement = 'param = ""';
    let newData = "";
    if(niveau === 1){
        newData = replaceWordsUrl(data, word, replacement);
    }
    if(niveau === 2){
        newData = replaceWordsUrl(data, replacement, word);
    }
    
    console.log(newData)
    fs.writeFile('../src/global_url.js', newData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Contenu du fichier Url mis à jour avec succès');
    });  
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("url-fini")     
}
const replaceWordsUrl = (data,word, replacement) => {
    console.log("url-replace")

    let rep = data.replace(word, replacement) 
    return rep 
};



module.exports = {deploy}