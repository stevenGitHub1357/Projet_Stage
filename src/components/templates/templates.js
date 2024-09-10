import React from "react"
import logo from '../../images/logo-jouveTitle.png'
import { useSelector, useDispatch } from "react-redux"
import { useCookies } from "react-cookie"
import { useState,useEffect } from 'react'
import axios from "axios"
import Global_url from "../../global_url"

export const TitlePage = ({title,theme,process}) => {
    var Url = Global_url
    const listProcessusSlice = useSelector((state) => state.processus.processus)
    const [cookies,setCookie,removeCookie] = useCookies(['id_user','id_processus'])
    const [processActuel,setProcessusActuel] = useState(0);
     
    useEffect(()=>{
        initialisation();
    },[])
    
    async function initialisation(){
        const processus = await axios.post(Url+"/getProcessusByUser",{id_user:cookies.id_user})
        setProcessusActuel(processus.data[processus.data.length-1]) 
    }

    function changeProcessus(id){
        setCookie('id_processus',id)
        console.log(cookies.id_processus+"  "+id)
        const process = listProcessusSlice.filter(process=>process.id===id)
        setProcessusActuel(process[0])
    }

    const cardIcon = {
        width:"75px",
        height:"65px",
        buttom:"200px",
        color:"black",

    }
    
    const classCard = !theme ? "px-2 shadow-sm relative rounded-2 bg-white " : "px-2 shadow-sm relative rounded-2 bg-dark bg-gradient text-white "
    
    return(
        <div className="mt-3 row">
        <div className={!theme ? " titlePage shadow-sm d-flex justify-content-between bg-white " : "bg-dark titlePage shadow-sm text-white d-flex justify-content-between"}>
            <span className="text-center">
                {title}
                {process ? ` - ${processActuel.libelle_processus} (${processActuel.abbrv})` : null}
            </span>
            {/* <img src={logo} alt="" width="40" className=""></img> */}
            
        </div>
        <div className="CountBoard mt-4 ">
        <div className="row text-white" >
            {
            process === true &&
            listProcessusSlice.filter(process=>process.id>0).map((process,index) =>(
                <div className="col-md-3 lg-4  mb-4 " style={{border: "none"} } 
                        onClick={() => changeProcessus(process.id)} 
                        key={index}>
                            
                    <div  className={classCard} style={{height : "8vh"}}>
                        
                        <div className={"row"+ !theme ? "bg-dark bg-gradient rounded-4 absolute shadow  text-center " : "bg-info bg-gradient rounded-4 absolute shadow  text-center"} style={cardIcon}>
                            <div className="color-white col-2" style={!theme ? {color: "white"}  : {color: "black"}} >{process.abbrv}</div>
                            {/* <div className="col-8">{process.libelle_processus}</div> */}
                        </div>
                        
                    </div>   
                </div>
            ))}
        </div>
        </div>
        </div>
    )
}