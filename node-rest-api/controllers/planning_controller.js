const pool = require("../config/default.config");
const menuModel = require("../models/Menus");
const {Op} = require("sequelize");
const { Planning, PlanningCategorie, PlanningDomaine } = require("../models/Planning");
const { Revue_processus } = require("../models/Revue_direction/Revue_processus");
const { Processus } = require("../models/Processus");
const Menu = menuModel.Menu;
const Menu_role_processus = menuModel.Menu_role_processus;

const getPlanning = (req,res,next) =>{
  Planning.findAll(
      {
      include : 
        [
          
          {
            model: Revue_processus,
            include: [
              {
                model: Processus,
                as: "processus" 
              }
            ]
          },
          PlanningCategorie
        ],
        order :
        [
          ['id','DESC']
        ]
      }
  )
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


const insertPlanning = (req,res,next) =>{
  const {id_categorie,titre,date_debut,date_cloture,date_recolte_debut,date_recolte_fin} = req.body.item
  Planning.create(
    { 
      id_categorie : id_categorie,
      titre : titre,  
      date_debut : date_debut,
      date_cloture : date_cloture,
      date_recolte_debut : date_recolte_debut,
      date_recolte_fin : date_recolte_fin,
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

const updatePlanning = (req,res,next) =>{
  const {id,id_categorie,titre,date_debut,date_cloture,date_recolte_debut,date_recolte_fin,statut} = req.body.item
  Planning.update(
    { 
      id_categorie : id_categorie,
      titre : titre,  
      date_debut : date_debut,
      date_cloture : date_cloture,
      date_recolte_debut : date_recolte_debut,
      date_recolte_fin : date_recolte_fin,
      statut : statut,
    },
    {
      where : 
      {
        id : id
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

const insertPlanningCategorie = (req,res,next) =>{
  const {libelle,abbrv} = req.body.item
  PlanningCategorie.create(
    { 
      libelle : libelle,
      abbrv : abbrv,  
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


const getPlanningCategorie = (req,res,next) =>{
  PlanningCategorie.findAll({
        order :
        [
          ['id','DESC']
        ]
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

const insertDomaine = (req,res,next) =>{
  const {id_planning, processus,createdat} = req.body.item
  const item = []
  for(let process of processus){
    const object = {};
    object.id_processus = process.id;
    object.id_planning = id_planning;
    object.createdat = createdat;
    item.push(object)
  }
  console.log(item)
  Revue_processus.bulkCreate(item,
    {
      ignoreDuplicates:true,
      validate:true,
      returning:true
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

const getPlanningNotCloturer = (req,res,next) =>{
  Planning.findAll(
    {where : 
      {statut : "D"}
    }
  )
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


module.exports = 
                {
                  getPlanning, getPlanningNotCloturer,
                  insertPlanning, updatePlanning,
                  insertPlanningCategorie, getPlanningCategorie,
                  insertDomaine
                };
