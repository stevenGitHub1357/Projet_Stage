import React from "react"
import logo from '../../images/logo-jouveTitle.png'
import { useSelector, useDispatch } from "react-redux"
import { useCookies } from "react-cookie"
import { useState,useEffect } from 'react'
import axios from "axios"
import Global_url from "../../global_url"

export const TitlePage = ({title,theme,process,listProcess}) => {
    var Url = Global_url
    const listProcessusSlice = useSelector((state) => state.processus.processus)
    const [cookies,setCookie,removeCookie] = useCookies(['id_user','id_processus'])
    const [processActuel,setProcessusActuel] = useState(listProcessusSlice[0]);
     
    useEffect(()=>{
        initialisation();
    },[])

    useEffect(()=>{
        
        // console.log(cookies.id_processus, listProcessusSlice[cookies.id_processus])
        if(cookies.id_processus!==undefined){
            changeProcessus(cookies.id_processus)
        }
    })
    
    async function initialisation(){
        // console.log("initialisation template data")
        const processus = await axios.post(Url+"/getProcessusByUser",{id_user:cookies.id_user})
        // console.log(cookies.id_processus)
        if(cookies.id_processus === undefined){
            setProcessusActuel(processus.data[processus.data.length-1])
        }else{
            setProcessusActuel(processus.data[cookies.id_processus])
        }       
    }

    function changeProcessus(id){
        setCookie('id_processus',id)
        // console.log(cookies.id_processus+"  "+id)
        setProcessusActuel(listProcessusSlice[id])
    }

    const cardIcon = {
        width:"75px",
        height:"65px",
        buttom:"200px",
        color:"black",

    }
    
    const classCard = !theme ? "px-2 shadow-sm relative rounded-2 bg-white " : "px-2 shadow-sm relative rounded-2 bg-dark bg-gradient text-white "
    
    return(
        <div className="row">
        <div className={!theme ? " titlePage shadow-sm d-flex justify-content-between bg-white " : "bg-dark titlePage shadow-sm text-white d-flex justify-content-between"}>
            <span className="text-center">
                {title}
                {process && processActuel!==undefined ? ` - ${processActuel.libelle_processus} (${processActuel.abbrv})` : null}
            </span>
            {/* <img src={logo} alt="" width="40" className=""></img> */}
            
        </div>
        {
            listProcess &&
            <div className="CountBoard mb-4" style={{ overflowY: 'auto', height: '100px'}}>
            <div className="row text-white mt-5">
                {
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
        }
        </div>
    )
}