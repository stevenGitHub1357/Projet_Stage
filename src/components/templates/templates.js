import React from "react"
import logo from '../../images/logo-jouveTitle.png'
import { useSelector, useDispatch } from "react-redux"
import { useCookies } from "react-cookie"
import { useState,useEffect } from 'react'
import axios from "axios"
import Global_url from "../../global_url"

export const TitlePage = ({title,theme,process,listProcess, revueDirection}) => {
    var Url = Global_url
    const listProcessusSlice = useSelector((state) => state.processus.processusUser)
    const [cookies,setCookie,removeCookie] = useCookies(['id_user','id_processus','id_revue_processus', 'id_processus_efficacite'])
    const [processActuel,setProcessusActuel] = useState([]);
    const [revue,setRevue] = useState([]);
    const [revueActuel,setRevueActuel] = useState({});

     
    useEffect(()=>{
        initialisation();
    },[])

    useEffect(()=>{
        
        // console.log(cookies.id_processus, listProcessusSlice[cookies.id_processus])
        // if(cookies.id_processus!==undefined){
        //     changeProcessus(cookies.id_processus)
        // }
    })
    
    async function initialisation(){
        // console.log("initialisation template data")
        const processus = await axios.post(Url+"/getProcessusByUser",{id_user:cookies.id_user})
        
        console.log(processus)
        if(cookies.id_processus === undefined){
            setProcessusActuel(processus.data[processus.data.length-1])
            setRevueActuel({})
        }else{
            setProcessusActuel(processus.data[cookies.id_processus])
            let revueInit = await axios.post(Url+"/getRevueProcessusById",{item : cookies.id_processus})
            revueInit = revueInit.data
            revueInit = revueInit.filter(revue=> revue.id === Number(cookies.id_revue_processus))
            revueInit = revueInit[0]
            const obj = revue;
            const originalDate = new Date(revueInit.createdat);
            const formattedDate = originalDate.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            // console.log(formattedDate)
            revueInit.dates = formattedDate;
            console.log(revueInit)
            setRevueActuel(revueInit)
        }       
    }

    async function changeProcessus(id, id_efficace){
        console.log("change "+id)
        setCookie('id_processus',id)
        let process = listProcessusSlice.filter(process=>process.id===Number(id))
        process = process[0]
        // console.log(process)
        setCookie('id_processus_efficacite',process.num_processus)
        // console.log(cookies.id_processus+"  "+id)
        setProcessusActuel(process)
        const item = id
        // setRevue([])
        // if(cookies.id_processus !== id){
            // console.log("change")
            let revueInit = await axios.post(Url+"/getRevueProcessusById",{item});
            revueInit = revueInit.data
            let revueFinal = []
            if(revueInit.length>0){
                revueInit.map(revue=>{
                    const obj = revue;
                    const originalDate = new Date(revue.createdat);
                    const formattedDate = originalDate.toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    // console.log(formattedDate)
                    revue.dates = formattedDate;
                    revueFinal.push(revue)
                })
                setRevue(revueFinal)
                // console.log(revueFinal[revueFinal.length-1].id)
                setCookie('id_revue_processus',revueFinal[revueFinal.length-1].id)
                setRevueActuel(revueFinal[revueFinal.length-1])
            }else{
                console.log("else")
                setRevue([])
                setCookie('id_revue_processus',0)
                setRevueActuel({})
            }
        // }
        
    }

    async function changeRevue(id){
        console.log("change"+id)
        setCookie('id_revue_processus',id)
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
                <div className="row mx-2">{title}</div>
                <div className="row mx-5">{process && processActuel!==undefined ? ` ${processActuel.libelle_processus} (${processActuel.abbrv}) - ${revueActuel.dates}` : null}</div>
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
                            onClick={() => changeProcessus(process.id, process.num_processus)} 
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
        {
            revueDirection ?
            <div className="row">
                <div className="col-2"></div>
                <div className="col-4 mx-2 mb-3">
                <select className="form-control" name="processus" onClick={(e) => changeProcessus(e.target.value)} >
                    {
                        listProcessusSlice.length>0 &&
                        listProcessusSlice.filter(process=>process.id>0).map((process, index) => (
                            <option 
                                key={index}
                                value={process.id}
                            >
                                {process.libelle_processus} 
                            </option> 
                        ))
                    }
                </select>
                </div>
                <div className="col-4">
                <select className="form-control" name="revue" onClick={(e) => changeRevue(e.target.value)} >
                    {
                        revue.length>0 &&
                        revue.map((revue, index) => (
                            <option 
                                key={index}
                                value={revue.id}
                            >
                                {revue.dates} 
                            </option> 
                        ))
                    }
                </select>
                </div>
            </div>
            :
            <></>
        }
        </div>
    )
}