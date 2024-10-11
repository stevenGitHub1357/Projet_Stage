const cron = require('node-cron')
const _ = require('lodash')

const db_kpi = require('./db_kpi')
const db_lean = require('./db_dashboardlean');

// 7h30 (30 7 * * *)
async function start() {

    await db_lean.connect()
    await db_kpi.connect()
    cron.schedule('* * * * *',async()=>{	
        try{
            console.log("connection")
            const getSuivieFNC_FAC = await db_lean.query("SELECT id_demande, titre, impact, statut, type_demande FROM suivis.suivi_fnc_fac WHERE type_demande='FNC'");
           
            if(getSuivieFNC_FAC.length > 0){
                for(const item of getSuivieFNC_FAC){
                    var obj = {}
                    obj.id = item.id_demande;
                    obj.titre = item.titre;
                    obj.objectif = item.impact;
                    obj.statut = item.statut;
                    if(obj.statut === "En cours"){
                        obj.id_statut = 10
                    }else(
                        obj.id_statut = 0
                    )

                    obj.type_demande = item.type_demande;

                    let fiche = null;
                    obj.date_demande = "";

                    if(obj.type_demande.localeCompare("FNC")===0){
                        fiche = await db_lean.query("SELECT date_create, date_cloture, list_objectif FROM suivis.fiche_non_conformite WHERE id="+obj.id);
                        obj.date_demande = fiche[0].date_create;
                    }
                     
                    if(obj.type_demande.localeCompare("FAC")===0){
                        fiche = await db_lean.query("SELECT date_detection, date_cloture, list_objectif FROM suivis.fiche_amelioration_continue WHERE id="+obj.id);
                        obj.date_demande = fiche[0].date_detection;
                    }
                    
                    if(fiche !== null){
                        obj.date_cloture = fiche[0].date_cloture;

                        var allObjectif = JSON.parse(fiche[0].list_objectif);
                        var sumObjectif = 1;
                        var sumTauxObjectif = 0;
                        obj.realise = 0;
                        if(allObjectif !== null && allObjectif[0].taux_objectif !== undefined){
                            sumObjectif = allObjectif.length;
                            sumTauxObjectif = allObjectif.reduce((acc, current) => {
                                return acc + current.taux_objectif;
                            }, 0);
                            obj.realise = sumTauxObjectif/sumObjectif
                        }

                        let query = "";    
                        let current = await db_kpi.query("SELECT id, type_demande, titre, objectif, statut, realise, date_demande, date_cloture, id_statut FROM data_kpi.fnc_fac WHERE id="+obj.id);
                        const check = current.length
                        current = current[0];
                        let insertDate_demande = obj.date_demande.getFullYear()+"-"+String(obj.date_demande.getMonth() + 1)+"-"+obj.date_demande.getDate();
                        let insertDate_cloture = null;
                        if(obj.date_cloture !== null){
                            insertDate_cloture = "'"+obj.date_cloture.getFullYear()+"-"+String(obj.date_cloture.getMonth() + 1)+"-"+obj.date_cloture.getDate()+"'";
                        }

                        if(check === 0){
                            query = "INSERT INTO data_kpi.fnc_fac(id, type_demande, titre, objectif, realise, date_demande, date_cloture, statut, id_statut) VALUES ("+obj.id+",'"+obj.type_demande+"','"+obj.titre.replace(/'/g,"''")+"','"+obj.objectif.replace(/'/g,"''")+"',"+obj.realise+",'"+insertDate_demande+"',"+insertDate_cloture+",'"+obj.statut+"', "+obj.id_statut+")";
                            await db_kpi.query(query)    
                        }else{
                            query = "UPDATE data_kpi.fnc_fac SET titre='"+obj.titre.replace(/'/g,"''")+"',type_demande='"+obj.type_demande+"', objectif='"+obj.objectif.replace(/'/g,"''")+"', realise="+obj.realise+", date_demande='"+insertDate_demande+"', date_cloture="+insertDate_cloture+", statut='"+obj.statut+"', id_statut = "+obj.id_statut+" WHERE id="+obj.id; 
                            // console.log(current)
                            // console.log(obj)
                            // console.log(_.isEqual(obj,current))
                            if(!_.isEqual(obj,current)){
                                await db_kpi.query(query)  
                            }else{
                                query = "aucun action"
                            }
                        }
                        console.log(query)
                    }
                }
            }else{
                console.log("Tableau suivi_fnc_fac vide")
            }
        }catch (error) {
          console.error('Erreur lors de l\'ex�cution de la t�che :', error);
        }
    })
}

start();




