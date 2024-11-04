const bd_pool = require("../../config/default.config")
const pool = bd_pool.pool
const {kanboard} = require("../../config/dbRevueDirection.config")
const { Sequelize, Op } = require("sequelize");
const { Revue_processus } = require("../../models/Revue_direction/Revue_processus");
const { Plan_action, Plan_action_commentaire } = require("../../models/Revue_direction/Plan_action");


  const getRevueProcessus = (req,res,next) =>{
    Revue_processus.findAll(
      {
        include : 
        [
          {
            model: Plan_action,
            include: [{
              model: Plan_action_commentaire,
            }]
          }
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


  const getRevueProcessusById = (req,res,next) =>{
    const id_processus = req.body.item
    Revue_processus.findAll(
      {
        where : 
        {
          id_processus : id_processus
        },
        order: [['id', 'DESC']],
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


  const createRevueProcessus = (req,res,next) =>{
    const {id_processus, id_planning} = req.body.item
    console.log(id_processus)
    Revue_processus.create(
      { 
        id_planning : id_planning,
        id_processus : id_processus,
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


  const getLastRevueProcessusById = (req,res,next) =>{
    const id_processus = req.body.item
    Revue_processus.findAll(
      {
        where : 
        {
          id_processus : id_processus
        },
        include : 
        [
          {
            model: Plan_action,
            // include: [{
            //   model: Plan_action_commentaire,
            // }]
          }
        ],
        order: [['createdat', 'DESC']],
        limit: 1
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


  const clotureRevueProcessus = (req,res,next) =>{
    const body = req.body
    console.log(body)
    const id = body.item
    Revue_processus.update(
      { 
          date_cloture : Sequelize.fn('NOW'),
          statut : "A"    
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
  }

  const updateRevueProcessus = (req,res,next) =>{
    const body = req.body
    console.log(body)
    const {id, statut} = body.item
    Revue_processus.update(
      { 
          statut : statut    
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
  }


  const updateRevueProcessusByPlanning = (req,res,next) =>{
    const body = req.body
    console.log(body)
    const {id_planning, date_cloture, date_debut, statut} = body.item
    Revue_processus.update(
      { 
          date_cloture : date_cloture,
          createdat : date_debut,
          statut : statut 
      },
      {
        where : 
        {
          id_planning : id_planning,
          statut : {[Op.ne] : "R"}
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
  }

  

  



module.exports = {getRevueProcessus, getRevueProcessusById, createRevueProcessus, getLastRevueProcessusById, clotureRevueProcessus, updateRevueProcessusByPlanning, updateRevueProcessus}