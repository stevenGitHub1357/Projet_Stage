const fs = require('fs');


const deploy = async (res, req) => {
    fetchManifest(res,req)
    fetchIndex(res,req)
    fetchCss(res, req)
}

const fetchManifest = async (res,req) => {
    try {
        console.log("manifest")
        const fsP = require('fs').promises;
        console.log("Deploy")
        let jsonData = {};
        jsonData = fs.readFileSync('../build/asset-manifest.json', 'utf8')
        // console.log(jsonData) 
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
    const wordsToReplace = [
        { word: '"/', replacement: '"./' },
        // { word: '/index.html', replacement: './index.html' },
    ];
    return JSON.parse(JSON.stringify(data).replace(
        new RegExp(wordsToReplace.map(w => w.word).join('|'), 'g'),
        (match) => wordsToReplace.find(w => w.word === match)?.replacement || match
    ));
};




const fetchIndex = async (res,req) => {
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
    console.log("manifest-replace")
    const wordsToReplace = [
        { word: '="/', replacement: '="./' },
        // { word: '/index.html', replacement: './index.html' },
    ];
    return data.replace(
        new RegExp(wordsToReplace.map(w => w.word).join('|'), 'g'),
        (match) => wordsToReplace.find(w => w.word === match)?.replacement || match
    );
};





const fetchCss = async (res,req) => {
    console.log("css")
    let data = {};
    data = fs.readFileSync('../build/static/css/main.e2b4fd41.css', 'utf8')
    // console.log(data)
    let newData = replaceWordsCss(data);
    // console.log(newData)
    fs.writeFile('../build/static/css/main.e2b4fd41.css', newData, 'utf8', (err) => {
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
    let rep = data.replace(word, replacement);
    rep = rep.replace(word, replacement)
    return rep;
};

module.exports = {deploy}