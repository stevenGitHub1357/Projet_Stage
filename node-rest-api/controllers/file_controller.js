const fs = require('fs');
const path = require('path');

  const uploadFile= (req,res,next) =>{
    try {
        if (!req.file) {
          return res.status(400).json({ message: "Aucun fichier sélectionné" });
        }
    
        res.status(200).json({
          message: "Fichier uploadé avec succès",
          file: req.file,
        });
      } catch (error) {
        res.status(500).json({ message: "Erreur d'upload", error: error.message });
      }
    };

  const moveFile= (req,res,next) =>{
    let {folderPath,fileName} = req.body.item
    const sourceFolder = path.join(__dirname, '../uploadsKPI/default');
    const destinationFolder = path.join(__dirname, '../uploadsKPI/'+folderPath); 
    const sourcePath = path.join(sourceFolder, fileName);
    const destinationPath = path.join(destinationFolder, fileName); 
    
    try {
        if (!fs.existsSync(destinationFolder)) {
          fs.mkdirSync(destinationFolder, { recursive: true });
          console.log(`Dossier créé : ${destinationFolder}`);
        }
        fs.rename(sourcePath, destinationPath, (err) => {
          if (err) {
            console.error(`Erreur lors du déplacement : ${err.message}`);
            return;
          }
          console.log(`Fichier déplacé de ${sourcePath} à ${destinationPath}`);
        });
    
        res.status(200).json({
          message: "Fichier uploadé avec succès",
          file: req.file,
        });
      } catch (error) {
        res.status(500).json({ message: "Erreur d'upload", error: error.message });
      }
  };

  const downloadFile = (req, res) => {
    let fileName = req.body.item
    // fileName = "MQ/1/41/file-1730195557197-894870849.xlsx"
    const filePath = path.join(__dirname, '../uploadsKPI/', fileName);
  
    console.log(filePath)
    // Vérifier si le fichier existe
    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        return res.status(404).json({ message: "Fichier non trouvé" });
      }
      if(stat.isFile()){
        const downloadUrl = `${req.protocol}://${req.get('host')}/uploadsKPI/${fileName}`;
        return res.status(200).json({ url: downloadUrl });
      }
  
      res.download(filePath, (err) => {
        if (err) {
          res.status(500).json({ message: "Erreur lors du téléchargement", error: err.message });
        }
      });

      
    });
   
  };


module.exports = {uploadFile, moveFile, downloadFile}
  