const cron = require('node-cron')

const db_kpi = require('./db_kpi')
const db_lean = require('./db_dashboardlean');

// 7h30 (30 7 * * *)
async function start() {

    await db_lean.connect()
    await db_kpi.connect()
    cron.schedule('* * * * *',async()=>{	
        try{
            console.log("connection")
            const getSuivieFNC = await db_lean.query("SELECT id_demande, titre, impact, statut FROM suivis.suivi_fnc_fac WHERE type_demande='FNC'");
           
            if(getSuivieFNC.length > 0){
                for(const item of getSuivieFNC){
                    var id = item.id_demande;
                    var titre = item.titre.replace(/'/g,"''");
                    var objectif = item.impact.replace(/'/g,"''");
                    var statut = item.statut;
                    var cible = ""

                    var fnc = await db_lean.query("SELECT date_create, date_cloture, list_objectif FROM suivis.fiche_non_conformite WHERE id="+id);

                    let date_demande_init = fnc[0].date_create;
                    let date_demande = fnc[0].date_create;
                    date_demande = date_demande.getFullYear()+"-"+String(date_demande.getMonth() + 1)+"-"+date_demande.getDate();

                    let date_cloture_init = fnc[0].date_cloture;
                    let date_cloture = fnc[0].date_cloture;
                    if(date_cloture !== null){
                        date_cloture = "'"+date_cloture.getFullYear()+"-"+String(date_cloture.getMonth() + 1)+"-"+date_cloture.getDate()+"'";
                    }

                    var allObjectif = JSON.parse(fnc[0].list_objectif);
                    var sumObjectif = 1;
                    var sumTauxObjectif = 0;
                    if(allObjectif !== null && allObjectif[0].taux_objectif !== undefined){
                        sumObjectif = allObjectif.length;
                        sumTauxObjectif = allObjectif.reduce((acc, current) => {
                            return acc + current.taux_objectif;
                        }, 0);
                    }

                    var realise = sumTauxObjectif/sumObjectif

                    let query = "";    
                    let current = await db_kpi.query("SELECT * FROM data_kpi.fnc WHERE id="+id);
                    current = current[0];
                    const check = current.length
                    if(check === 0){
                        query = "INSERT INTO data_kpi.fnc(id, titre, objectif, realise, date_demande, date_cloture, statut) VALUES ("+id+",'"+titre+"','"+objectif+"',"+realise+",'"+date_demande+"',"+date_cloture+",'"+statut+"')";
                        await db_kpi.query(query)    
                    }else{
                        query = "UPDATE data_kpi.fnc SET titre='"+titre+"', objectif='"+objectif+"', realise="+realise+", date_demande='"+date_demande+"', date_cloture="+date_cloture+", statut='"+statut+"' WHERE id="+id; 
                        let compare = true
                        if(current.date_cloture !== null){
                            compare = date_cloture_init.toString().localeCompare(current.date_cloture.toString()) 
                        }
                        
                        if(compare===1){
                            await db_kpi.query(query)
                        }
                    }
                    // console.log(query)
                    
                    
                }
            }else{
                console.log("PAS D' ID")
            }
        }catch (error) {
          console.error('Erreur lors de l\'ex�cution de la t�che :', error);
        }
    })
}

start();




