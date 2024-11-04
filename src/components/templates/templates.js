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
    const [cookies,setCookie,removeCookie] = useCookies(['id_user','id_processus','id_revue_processus', 'id_processus_efficacite', 'id_planning', "statut_revue"])
    const [processActuel,setProcessusActuel] = useState([]);
    const [revue,setRevue] = useState([]);
    const [revueActuel,setRevueActuel] = useState({});
    const [listPlanning, setListPlanning] = useState([]);
    const [currentPlanning, setCurrentPlanning] = useState({})
    const [listeRevue, setListeRevue] = useState([])
    const [statut, setStatut] = useState("I")

    useEffect(()=>{
        initialisation();
    },[cookies.id_revue_processus, cookies.id_planning, cookies.statut_revue])

    async function getRevueProcessusByUser(revue){
        // let processus = await axios.post(Url+"/getProcessusByUser",{id_user:cookies.id_user})
        // processus = processus.data;
        // console.log(listProcessusSlice)
        let listIdProcessus = listProcessusSlice.map(processus=>processus.id)
        let allList = []
        revue.map(revue=>{
            const objList = listProcessusSlice.filter(process=>process.id === revue.processus.id);
            if(objList.length>0){
                allList.push(revue)
            }
        })
        // console.log(listIdProcessus)
        console.log(allList)
        return allList
    }
    
    async function initialisation(){
        // console.log("initialisation template data")
        
        const planning = await axios.get(Url+"/getPlanning")
        console.log(planning)
        setListPlanning(planning.data)
        
        if(cookies.id_planning === undefined){
            console.log("template indefined")
            let plan = planning.data
            plan = plan[plan.length-1]
            console.log(plan)
            setCookie('id_planning', plan.id)
            setCookie('id_revue_processus', plan.revue_processus[0].id)
            setCookie('id_processus',plan.revue_processus[0].processus[0])
            setCookie('id_processus_efficacite',plan.revue_processus[0].processus[0].num_processus)
            setCookie('statut_revue', plan.revue_processus[0].statut)
            setStatut(plan.revue_processus[0].statut)
            setCurrentPlanning(plan)
            setRevueActuel(plan.revue_processus[0])
            setProcessusActuel(plan.revue_processus[0].processus[0])
            setListeRevue(plan.revue_processus)
        }else{
            console.log("template defined")
            let plan = planning.data
            plan = plan.filter(plan=>plan.id === Number(cookies.id_planning))
            plan = plan[0]
            console.log(plan)
            console.log(plan.revue_processus)
            // console.log(plan.revue_processus[0].processus)
            console.log(cookies.id_revue_processus)
            let revue = plan.revue_processus
            console.log(revue)
            revue = revue.filter(revue=> revue.id === Number(cookies.id_revue_processus))
            console.log(revue)
            revue = revue[0]
            
            let process = revue.processus
            console.log(process)
            setCookie('id_planning', plan.id)
            setCookie('id_revue_processus', revue.id)
            setCookie('statut_revue', revue.statut)
            setCookie('id_processus',process.id)
            setCookie('id_processus_efficacite',process.num_processus)
            setStatut(revue.statut)
            setCurrentPlanning(plan)
            setRevueActuel(revue)
            setProcessusActuel(process)
            setListeRevue(plan.revue_processus)
        }
    }

    const initialisationProcess = async  () => {
        // console.log("initialisation template data")
        const processus = await axios.post(Url+"/getProcessusByUser",{id_user:cookies.id_user})
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
            // console.log(revueInit)
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
                setCookie('statut_revue', revueFinal[revueFinal.length-1].statut)
                setStatut(revueFinal[revueFinal.length-1].statut)
                setRevueActuel(revueFinal[revueFinal.length-1])
            }else{
                console.log("else")
                setRevue([])
                setCookie('id_revue_processus',0)
                setCookie('statut_revue', "D")
                setStatut("D")
                setRevueActuel({})
            }
        // }
        
    }

    async function changePlanning(id){
        console.log(id)
        const planning = listPlanning.filter(planning=>planning.id === Number(id));
        console.log(planning[0].revue_processus)
        setCurrentPlanning(planning[0])
        console.log(planning[0])
        if(planning[0].revue_processus.length>0){
            console.log("not")
            setProcessusActuel(planning[0].revue_processus[0].processus)    
            setCookie('id_planning',planning[0].id)
            setCookie('id_revue_processus',planning[0].revue_processus[0].id)
            setCookie('id_processus',planning[0].revue_processus[0].processus.id)
            setCookie('id_processus_efficacite',planning[0].revue_processus[0].processus.num_processus)
            setCookie('statut_revue', planning[0].revue_processus[0].statut)
            setListeRevue(planning[0].revue_processus)
            setStatut( planning[0].revue_processus[0].statut)
        }else{
            console.log("here",planning[0])
            let processus = {}
            processus.id = 0
            processus.libelle_processus = "Aucun"
            let revue = {}
            revue.id = 0;
            revue.titre = "Aucun"
            revue.processus = processus
            revue.statut = "A"
            setProcessusActuel(processus)
            setCookie('id_planning',planning[0].id)
            setCookie('id_revue_processus',revue.id)
            setCookie('id_processus',0)
            setCookie('id_processus_efficacite',revue.processus.num_processus)
            setCookie('statut_revue', "D")
            setStatut("D")
            const list = []
            list.push(revue)
            console.log(list)
            setListeRevue(list)
        }
        
    }

    async function changeRevue(id){
        // console.log(id)
        
        // let process = listProcessusSlice.filter(process=>process.id===Number(id))
        // // console.log(process)
        // setProcessusActuel(process[0])
        // // setCookie('id_revue_processus',rep[0])
        // setCookie('id_processus',id)

        let revue = listeRevue;
        revue = revue.filter(revue=> revue.id === Number(id));
        revue = revue[0]
        setRevueActuel(revue)
        setProcessusActuel(revue.processus)
        setStatut(revue.statut)
        setCookie('id_revue_processus',revue.id)
        console.log(revue.processus.id)
        setCookie('id_processus',revue.processus.id)
        setCookie('id_processus_efficacite',revue.processus.num_processus)
        setCookie('statut_revue', revue.statut)
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
                <div className="row mx-5">{process && currentPlanning.titre!==undefined ? `${currentPlanning.titre} - ${processActuel.libelle_processus} (${processActuel.abbrv}) - ${statut}` : null}</div>
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
                <select className="form-control" name="planning" onClick={(e) => changePlanning(e.target.value)} >
                    {
                        listPlanning.length>0 &&
                        listPlanning.filter(planning=>planning.id>0).map((planning, index) => (
                            <option 
                                key={index}
                                value={planning.id}
                                selected={planning.id === currentPlanning.id}
                            >
                                {planning.titre} 
                            </option> 
                        ))
                    }
                </select>
                </div>
                <div className="col-4">
                <select className="form-control" name="revue" onClick={(e) => changeRevue(e.target.value)} >
                    {
                        listeRevue.length>0 &&
                        listeRevue.map((revue, index) => (
                            <option 
                                key={index}
                                value={revue.id}
                                selected={revue.id === revueActuel.id}
                            >
                                {revue.processus.libelle_processus} 
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