import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Global_url from "./global_url"
var Url = Global_url

function Deploy() {
    const [manifest, setManifest] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {

    },[])
    
    async function deployment () {
        // await axios.get(Url+"/getDeploy")
        const exec = require('child_process').exec;
    
        // Exécuter la commande custom-build
        exec('npm run custom-build', (error, stdout, stderr) => {
          if (error) {
            console.error(`Erreur lors de l'exécution : ${error}`);
            return;
          }
          console.log(`stdout : ${stdout}`);
          console.error(`stderr : ${stderr}`);
        });

    }

  return (
    <div className="log">
        <button className="btn  btn-sm form-control text-white" onClick={deployment}>
            <i className="bi bi-box-arrow-right"></i> <span>Deploy</span>
        </button>
    </div>
  );
}

export default Deploy;