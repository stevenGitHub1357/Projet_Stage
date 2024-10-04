import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Global_url from "./global_url"
import WaitingModal from './components/service/waiting';
import { Success,Warning } from './components/service/service-alert';
// import exec from 'exec-sh';
var Url = Global_url

function Deploy() {
    const [isRunning, setIsRunning] = useState(false);
    const [isBuild, setIsBuild] = useState(false);

    useEffect(() => {

    }, []);

    
    async function deployment () {
      setIsRunning(true);
        try {
          // console.log("---------------------------wait")
          const response = await axios.get(Url+"/getDeploy")
          console.log("finish :" + response.data)
          if(response){
              Success("", "Build terminer avec succes");
          }else{
              Warning("", "Build non terminer");
          }
        } catch (error) {
          // console.log("---------------------------deconnex")
          setIsRunning(false)  
          Warning("", "Build non terminer");
        } finally {
          // console.log("---------------------------finally")
          setIsRunning(false)
        }
          
    }

  return (
    <div className="log">
              <button className="btn  btn-sm form-control text-white" onClick={deployment}>
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Build project</span>
              </button>
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