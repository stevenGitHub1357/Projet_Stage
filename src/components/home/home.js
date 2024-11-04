import React, { useEffect, useRef, useState } from "react";
import { TitlePage } from "../templates/templates";
import "./homeStyle.scss"
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Global_url from "../../global_url";
import { useCookies } from "react-cookie";
import axios from "axios";
var Url = Global_url

ChartJS.register(ArcElement, Tooltip, Legend);

const Home =({MenuCollapse,theme,logo})=>{
    
    const [tauxRevuePlan, setTauxRevuePlan] = useState(0)
    const [tauxEfficaciteRisque, setTauxEfficaciteRisque] = useState(0)
    const [tauxEfficaciteOpp, setTauxEfficaciteOpp] = useState(0)
    const [tauxEfficaciteEnjeux, setTauxEfficaciteEnjeux] = useState(0)
    const [tauxPerformance, setTauxPerformance] = useState(0)

    const [dataRevuePlan, setDataRevuePlan] = useState([])
    const [dataEfficaciteRisque, setDataEfficaciteRisque] = useState([])
    const [dataEfficaciteOpp, setDataEfficaciteOpp] = useState([])
    const [dataEfficaciteEnjeux, setDataEfficaciteEnjeux] = useState([])
    const [dataPerformance, setDataPerformance] = useState([])

    const data = {
        labels: ['A', 'D'],
        datasets: [
          {
            label: 'Distribution',
            data: [0, 1], // Données pour chaque catégorie
            backgroundColor: ['#58d68d','#cb4335'], // Couleurs aléatoires
            hoverBackgroundColor: ['#11c6bd','#f39c12 '] // Couleurs au survol aléatoires
          }
        ]
    };

    const optionsBar = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top' ,
            },
            title: {
            display: false,
            text: 'Performance',
            },
        },
        scales: {
            x: {
              display: false, // Masque les labels de l'axe x
            },
            y: {
              beginAtZero: true, // Cette option commence l'axe y à zéro pour un meilleur affichage
            },
          },
    }

    const [dataChartRevuePlan, setDataChartRevuePlan] = useState(data)
    const [dataChartEfficaciteRisque, setDataChartEfficaciteRisque] = useState(data)
    const [dataChartEfficaciteOpp, setDataChartEfficaciteOpp] = useState(data)
    const [dataChartEfficaciteEnjeux, setDataChartEfficaciteEnjeux] = useState(data)
    const [dataChartPerformance, setDataChartPerformance] = useState(data)

    const [cookies,setCookie,removeCookie] = useCookies(['id_user','id_processus','id_revue_processus','id_processus_efficacite','id_processus','statut_revue','id_planning'])


    useEffect(() => {
        getData()
    },[cookies.id_planning, cookies.id_revue_processus]);

    async function getData(){
        getDataRevuePlan()
        getDataPerformance()
        getDataEfficacite()
    }

    async function getDataRevuePlan(){
        const item = {}
        item.id_processus = cookies.id_processus;
        item.id_revue_processus = cookies.id_revue_processus;
        let revueProcessus = await axios.post(Url+"/getPlanActionByRevueProcessus",{item});
        let planAction = []
        let newData = []
        // console.log(revueProcessus)
        if(revueProcessus.data.length>0){
            revueProcessus = revueProcessus.data[0]
            planAction = revueProcessus.plan_actions;
            // console.log(planAction)
            if(planAction.length>0){
                const allTicketId = planAction.filter(planAction=>planAction.nb_ticket !== "").map(planAction=>planAction.nb_ticket)
                // console.log(allTicketId)
                let allTicket = []
                if(allTicketId.length>0){
                    allTicket = await axios.post(Url+"/getTicketByManyId",{item:allTicketId});
                    allTicket = allTicket.data
                }
                    
                    planAction.filter(planAction=>planAction.activate!==0).map(planAction => {
                        let ticket = allTicket.filter(ticket=>ticket.id === Number(planAction.nb_ticket));
                        ticket = ticket[0]
                        // console.log(planAction)
                        // console.log(ticket)
                        let theData = {};
                        theData.nb_ticket = planAction.nb_ticket
                        theData.id = planAction.id
                        theData.sujet = planAction.sujet
                        theData.allCommentaire = planAction.plan_action_commentaires
                        theData.commentaire = planAction.commentaire
                        theData.activate = planAction.activate
                        // console.log(theData.allCommentaire)
                        // if(theData.allCommentaire.length>0) theData.commentaire = theData.allCommentaire[theData.allCommentaire.length-1].commentaire
                        // console.log(ticket)
                        if(ticket !== undefined){
                            theData.action = ticket.action
                            theData.pdca = ticket.pdca
                            theData.pilote = ticket.pilote
                        }else   {
                            theData.action = ""
                            theData.pdca = ""
                            theData.pilote = ""
                        }
                        // console.log(theData)
                        newData.push(theData)
                    })
            }else{

            }
            setDataRevuePlan(newData)
            let atteint = newData.filter(data=>data.pdca === "A")
            atteint = atteint.length;
            let total = newData.length;
            const taux = (atteint*100)/total
            setTauxRevuePlan(taux.toFixed(2))
            if(isNaN(taux)){
                setTauxRevuePlan(0.00)
                atteint = 0;
            }
            let nonAtteint = total-atteint; 

            const data = {
                labels: ['A', 'D'],
                datasets: [
                  {
                    label: 'Revue du plan',
                    data: [atteint, nonAtteint], // Données pour chaque catégorie
                    backgroundColor: ['#58d68d','#cb4335'], // Couleurs aléatoires
                    hoverBackgroundColor: ['#11c6bd','#f39c12 '] // Couleurs au survol aléatoires
                  }
                ]
            };
            console.log(data)
            setDataChartRevuePlan(data)
        }
    }

    async function getDataPerformance(){
        const item = {}
        item.id_processus = cookies.id_processus
        item.id_revue_processus = cookies.id_revue_processus
        let all = []
        let total = 0;
        await axios.post(Url+"/getPerformanceObjectifByRevueProcessus",{item}).then(res=>{
            if(res.data.length){
                setDataPerformance(res.data)
                console.log(res.data)
                // setCurrent(res.data[0])
                all = res.data
                all.map(obj=>{
                    total = total+obj.taux
                })
            }else{
                setDataPerformance([])
            }
        })  
        let count = all.length;
        let taux = total/count
        setTauxPerformance(taux.toFixed(2))
        
          const labels = all.map(data=>data.objectifs)
        
          const dataBar = {
            labels,
            datasets: [
              {
                label: 'Atteint %',
                data: all.map(data=>data.realise),
                backgroundColor: 'rgb(126, 226, 166)',
              },
              {
                label: "Taux d'atteinte %",
                data: all.map(data=>data.taux),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          
          }
          setDataChartPerformance(dataBar)
        
    }

    async function getDataEfficacite(){
        let item = cookies.id_revue_processus
        console.log(item)
        let effi = []
        await axios.post(Url+"/getEfficaciteByRevue",{item}).then(res=>{
            if(res.data.length){
                effi = res.data
            }
        })
        item = cookies.id_processus_efficacite+""
            let listOppo = await axios.post(Url+"/getOpportuniterByProcessus",{item});
            listOppo = listOppo.data
            const allOppo = []
            
            console.log(listOppo)
            listOppo.map(item => {
                const newItem = {}
                newItem.sujet = item.lib_oppo;
                newItem.action = item.action;
                newItem.pdca = item.avancement;
                newItem.pilote = item.pilote;
                newItem.num_ticket = item.num_ticket;
                newItem.id_ticket = item.id+"";
                newItem.id = 0
                newItem.commentaire = ""
                let eff = effi.filter(effi => effi.id_ticket===newItem.id_ticket && effi.id_revue_processus===Number(cookies.id_revue_processus) && effi.types===3)
                if(eff.length>0){
                    // console.log(eff)
                    eff = eff[0]
                    newItem.id = eff.id;
                    newItem.commentaire = eff.commentaire
                    newItem.ticket = eff.ticket
                    
                }
                allOppo.push(newItem)
            })

            let listEnjeux = await axios.post(Url+"/getEnjeuxByProcessus",{item});
            listEnjeux = listEnjeux.data
            const allEnjeux = []
            
            console.log(listEnjeux)
            listEnjeux.map(item => {
                const newItem = {}
                newItem.sujet = item.lib_enjeux;
                newItem.action = item.action;
                newItem.pdca = item.avancement;
                newItem.pilote = item.pilote;
                newItem.num_ticket = item.num_ticket;
                newItem.id_ticket = item.id+"";
                newItem.id = 0
                newItem.commentaire = ""
                let eff = effi.filter(effi => effi.id_ticket===newItem.id_ticket && effi.id_revue_processus===Number(cookies.id_revue_processus) && effi.types===2)
                if(eff.length>0){
                    // console.log(eff)
                    eff = eff[0]
                    newItem.id = eff.id;
                    newItem.commentaire = eff.commentaire
                    newItem.ticket = eff.ticket
                    
                }
                allEnjeux.push(newItem)
            })

            let listRisque = await axios.post(Url+"/getRisqueByProcessus",{item});
            listRisque = listRisque.data
            const allRisque = []
            
            console.log(listRisque)
            listRisque.map(item => {
                const newItem = {}
                newItem.sujet = item.risque;
                newItem.action = item.action;
                newItem.pdca = item.pdca;
                newItem.pilote = item.pilote;
                newItem.num_ticket = item.num_ticket;
                newItem.id_ticket = item.id+"";
                newItem.id = 0
                let eff = effi.filter(effi => effi.id_ticket===newItem.id_ticket && effi.id_revue_processus===Number(cookies.id_revue_processus) && effi.types===1)
                newItem.commentaire = ""
                if(eff.length>0){
                    // console.log(eff)
                    eff = eff[0]
                    newItem.id = eff.id;
                    newItem.commentaire = eff.commentaire
                    newItem.ticket = eff.ticket
                    
                }
                allRisque.push(newItem)
            })
            
            console.log(allRisque)
            setDataEfficaciteOpp(allOppo)
            setDataEfficaciteEnjeux(allEnjeux)
            setDataEfficaciteRisque(allRisque)
            
            let total = allRisque.length;
            let atteint = allRisque.filter(allRisque=>allRisque.pdca==="A");
            atteint = atteint.length
            let taux = (atteint*100)/total
            setTauxEfficaciteRisque(taux.toFixed(2))

            let nonAtteint = total-atteint; 

            let data = {
                labels: ['A', 'D'],
                datasets: [
                  {
                    label: 'Risque',
                    data: [atteint, nonAtteint], // Données pour chaque catégorie
                    backgroundColor: ['#58d68d','#cb4335'], // Couleurs aléatoires
                    hoverBackgroundColor: ['#11c6bd','#f39c12 '] // Couleurs au survol aléatoires
                  }
                ]
            };
            console.log(data)
            setDataChartEfficaciteRisque(data)

            
            total = allOppo.length;
            atteint = allOppo.filter(allOppo=>allOppo.pdca==="A");
            atteint = atteint.length
            taux = (atteint*100)/total
            setTauxEfficaciteOpp(taux.toFixed(2))

            nonAtteint = total-atteint; 

            data = {
                labels: ['A', 'D'],
                datasets: [
                  {
                    label: 'Opportunite',
                    data: [atteint, nonAtteint], // Données pour chaque catégorie
                    backgroundColor: ['#58d68d','#cb4335'], // Couleurs aléatoires
                    hoverBackgroundColor: ['#11c6bd','#f39c12 '] // Couleurs au survol aléatoires
                  }
                ]
            };
            console.log(data)
            setDataChartEfficaciteOpp(data)

            total = allEnjeux.length;
            atteint = allEnjeux.filter(allEnjeux=>allEnjeux.pdca==="A");
            atteint = atteint.length
            taux = (atteint*100)/total
            setTauxEfficaciteEnjeux(taux.toFixed(2))

            nonAtteint = total-atteint; 

            data = {
                labels: ['A', 'D'],
                datasets: [
                  {
                    label: 'Enjeux',
                    data: [atteint, nonAtteint], // Données pour chaque catégorie
                    backgroundColor: ['#58d68d','#cb4335'], // Couleurs aléatoires
                    hoverBackgroundColor: ['#11c6bd','#f39c12 '] // Couleurs au survol aléatoires
                  }
                ]
            };
            console.log(data)
            setDataChartEfficaciteEnjeux(data)
            
    }
    
    const cardIcon = {
        width:"75px",
        height:"65px",
        buttom:"200px",
        color:"black",
    }
    
    const classCard = !theme ? "px-2 shadow-sm relative rounded-2 bg-white " : "px-2 shadow-sm relative rounded-2 bg-dark bg-gradient text-white "

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
    
      
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      };

      

    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Acceuil - Tableau de bord" process={true} listProcess={false} revueDirection={true}  theme={theme}/>
            <div className="CountBoard mt-5">
                <div className="row mb-3">
                    <div className="col-3"></div>
                    <div className="col-3 lg-4  mb-4 mx-3" style={{border: "none"} } 
                            key={0}>
                                
                        <div  className={classCard} style={{height : "8vh"}}>
                            
                            <div className={"row"+ !theme ? "bg-dark bg-gradient rounded-4 absolute shadow  text-center " : "bg-info bg-gradient rounded-4 absolute shadow  text-center"}>
                                <div className="color-white col-12" style={!theme ? {color: "white"}  : {color: "black"}} >Revue plan</div>
                                <div className="color-white col-12" style={!theme ? {color: "white"}  : {color: "black"}}>{tauxRevuePlan}%</div>
                            </div>
                            
                        </div>   
                    </div>
                    <div className="col-3 lg-4  mb-4 mx-3" style={{border: "none"} } 
                            key={1}>
                                
                        <div  className={classCard} style={{height : "8vh"}}>
                            
                            <div className={"row"+ !theme ? "bg-dark bg-gradient rounded-4 absolute shadow  text-center " : "bg-info bg-gradient rounded-4 absolute shadow  text-center"}>
                                <div className="color-white col-12" style={!theme ? {color: "white"}  : {color: "black"}} >Performance</div>
                                <div className="color-white col-12" style={!theme ? {color: "white"}  : {color: "black"}}>{tauxPerformance}%</div>
                            </div>
                            
                        </div>   
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4 lg-4  mb-4 mx-3" style={{border: "none"} } 
                                key={2}>
                                    
                            <div  className={classCard} style={{height : "8vh"}}>
                                
                                <div className={"row"+ !theme ? "bg-dark bg-gradient rounded-4 shadow  text-center " : "bg-info bg-gradient rounded-4 absolute shadow  text-center"}>
                                    <div className="color-white col-12" style={!theme ? {color: "white"}  : {color: "black"}} >Efficacitée</div>
                                    <div className="row">
                                        <div className="color-white col-4" style={!theme ? {color: "red"}  : {color: "black"}}>{tauxEfficaciteRisque}%</div>
                                        <div className="color-white col-4" style={!theme ? {color: "green"}  : {color: "black"}}>{tauxEfficaciteEnjeux}%</div>
                                        <div className="color-white col-4" style={!theme ? {color: "grey"}  : {color: "black"}}>{tauxEfficaciteOpp}%</div>
                                    </div>
                                </div>
                                
                            </div>   
                        </div>
                    </div>
                
            </div>
            <div className="row mt-4">
                <div className="col-4 mx-2">
                    <h1>
                        Revue du plan d'action
                    </h1>
                    <Pie data={dataChartRevuePlan} options={options} />
                </div>
                <div className="col-6 mx-5">
                    <h1>
                        Performance
                    </h1>
                    <Bar options={optionsBar} data={dataChartPerformance}/>
                </div>
            </div>

            <div className="row mt-4">
                <h1 className="text-center">Efficacitée</h1>
                <div className="col-4">
                    <h1 style={{color: "red"}}>
                        Risques
                    </h1>
                    <Pie data={dataChartEfficaciteRisque} options={options} />
                </div>
                <div className="col-4">
                    <h1 style={{color: "green"}}>
                        Enjeux
                    </h1>
                    <Pie data={dataChartEfficaciteEnjeux} options={options} />
                </div>
                <div className="col-4">
                    <h1 style={{color: "gray"}}>
                        Opportunités
                    </h1>
                    <Pie data={dataChartEfficaciteOpp} options={options} />
                </div>
            </div>
        </div>
        
    );
}
export default Home;