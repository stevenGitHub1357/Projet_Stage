import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Global_url from "./global_url"
import WaitingModal from './components/service/waiting';
import { Success,Warning,Confirmation } from './components/service/service-alert';
// import exec from 'exec-sh';
var Url = Global_url

function Deploy(theme) {
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {

    }, []);

    
    async function deployment () {
      setIsRunning(true);
        try {
          // console.log("---------------------------wait")
          const response = await axios.get(Url+"/getDeploy")
          console.log("finish :" + response.data)
          if(response){
            Confirmation(theme,"Build termier avec succes","Ok",false) ;
          }else{
            Confirmation(theme,"Erreur lors du build","Ok",false);
          }
          setIsRunning(false)
        } catch (error) {
          // console.log("---------------------------deconnex")
          setIsRunning(false)  
          Confirmation(theme,"Erreur lors du build","Ok",false);
        } finally {
          // console.log("---------------------------finally")
          setIsRunning(false)
        }
          
    }

    async function EnCours () {     
        Confirmation(theme,"Build en cours","cancel",false);  
    }

  return (
    <div className="log">
              
                  {
                    isRunning ? (
                      <button className="btn  btn-sm form-control text-white" onClick={EnCours}>
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Build en cours</span>
                      </button>
                    ):(
                      <button className="btn  btn-sm form-control text-white" onClick={deployment}>
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Build project</span>
                      </button>
                    )
                  }
                  
              
            {
              isRunning ?
              <WaitingModal showWaitings={isRunning} label = "Build" />
              :
              <></>
            }
            
        
    </div>
  );
}

export default Deploy;