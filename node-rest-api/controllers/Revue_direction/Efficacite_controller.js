const bd_pool = require("../../config/default.config")
const pool = bd_pool.pool
const {dashboardlean} = require("../../config/dbRevueDirection.config")
const { Sequelize, where } = require("sequelize");
const { Efficacite } = require("../../models/Revue_direction/Efficacite");

const getRisqueByProcessus = (req,res,next) =>{
  const id_processus = req.body.item
  // console.log(id_processus)
  dashboardlean.query(
    `
      SELECT id as id, description_des_risques as risque, actions_recommandees as action, pilote as pilote, avancement as pdca, num_ticket as num_ticket
      FROM risque_enjeux_op.identification_risque ri 
        LEFT JOIN risque_enjeux_op.analyse_des_risques ra ON ri.id = ra.id_identification::integer 
        LEFT JOIN risque_enjeux_op.evaluation_des_risques re ON ri.id = re.id_identification::integer 
        LEFT JOIN  risque_enjeux_op.traitement_des_risques rt ON ri.id = rt.id_identification::integer 
        LEFT JOIN risque_enjeux_op.suivi_des_risques rs ON ri.id = rs.id_identification::integer 
      WHERE ri.id_processus = $1 
        ORDER BY ri.numero ASC
    `,[id_processus]
    ,function(err,result){
      if (err) {
        res.status(400).send(err);
      }
      if (Object.keys(result).length > 0) {
        res.status(200).send(result.rows);
    } else {
        res.status(200).send();
    }
      
    })
  
};


const getEnjeuxByProcessus = (req,res,next) =>{
  const id_processus = req.body.item
  console.log("id_processus",id_processus)
  dashboardlean.query(
      'SELECT * FROM risque_enjeux_op.enjeux WHERE id_processus = $1',[id_processus]
      ,function(err,result){
        if (err) {
          res.status(400).send(err);
        }
        if (Object.keys(result).length > 0) {
          res.status(200).send(result.rows);
      } else {
          res.status(200).send();
      }
        
      })
    
};
  

const getOpportuniterByProcessus = (req,res,next) =>{
  const id_processus = req.body.item
  dashboardlean.query(
      'SELECT * FROM risque_enjeux_op.opportunite WHERE id_processus = $1',[id_processus]
      ,function(err,result){
        if (err) {
          res.status(400).send(err);
        }
        if (Object.keys(result).length > 0) {
          res.status(200).send(result.rows);
      } else {
          res.status(200).send();
      }
        
      })
};


const getEfficaciteByRevue = (req,res,next) =>{
  const id_revue_processus = req.body.item;
  Efficacite.findAll({
    where : {
      id_revue_processus : id_revue_processus
    }
  })
  .then(function(results) {
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(200).json();
    }
  })
  .catch(function(error) {
    console.error(error);
    res.status(400).json({ error });
  })
};


const insertEfficacite = (req,res,next) =>{
  const {id_revue_processus,id_ticket,num_ticket, types, commentaire} = req.body.item
  // console.log()
  Efficacite.create(
    { 
      id_revue_processus : id_revue_processus,
      num_ticket : num_ticket,
      id_ticket : id_ticket,
      types : types,
      commentaire: commentaire
    }
  )
  .then(function(results) {
    res.status(200).send(results);
  })
  .catch(function(error) {
    console.error(error);
    res.status(400).json({ error });
  })
};

const updateEfficacite = (req,res,next) =>{
  const {id_revue_processus,num_ticket,id_ticket, types, commentaire} = req.body.item
  // console.log()
  Efficacite.update(
    { 
      commentaire: commentaire
    },
    {
      where : 
      {
        id_revue_processus : id_revue_processus,
        num_ticket : num_ticket,
        id_ticket : id_ticket,
        types : types
      }
    }
  )
  .then(function(results) {
    res.status(200).send(results);
  })
  .catch(function(error) {
    console.error(error);
    res.status(400).json({ error });
  })
};


module.exports = {getRisqueByProcessus, getEnjeuxByProcessus, getOpportuniterByProcessus, getEfficaciteByRevue, insertEfficacite, updateEfficacite}