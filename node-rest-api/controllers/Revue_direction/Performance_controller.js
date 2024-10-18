const bd_pool = require("../../config/default.config")
const pool = bd_pool.pool
const {kanboard} = require("../../config/dbRevueDirection.config")
const { Sequelize } = require("sequelize");
const { PerformanceObjectifDetail,PerformanceObjectifProcessus,PerformanceCommentaire, PerformanceObjectifCommentaire } = require("../../models/Revue_direction/Performance");



  const getPerformanceObjectifDetail = (req,res,next) =>{
    PerformanceObjectifDetail.findAll({})
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

  const getPerformanceObjectifDetailByProcessus = (req,res,next) =>{
    const id_processus = req.body.item
    PerformanceObjectifDetail.findAll({
      where : 
      {
        id_processus : id_processus
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

  const getPerformanceObjectifByRevueProcessus = (req,res,next) =>{
    const {id_revue_processus,id_processus} = req.body.item
    PerformanceObjectifProcessus.findAll({
      where : 
      {
        id_processus : id_processus,
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


  const getPerformanceCommentaireByRevuePerformance = (req,res,next) =>{
    const {id_revue_processus,id_performance} = req.body.item
    PerformanceCommentaire.findAll({
      where : 
      {
        id_performance : id_performance,
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


  const insertPerformanceObjectifCommentaire = (req,res,next) =>{
    const {id_revue_processus,id_objectif,commentaire} = req.body.item
    // console.log()
    PerformanceObjectifCommentaire.create(
      { 
        id_revue_processus : id_revue_processus,
        id_objectif : id_objectif,
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


  const getPerformanceObjectifCommentaireByRevue = (req,res,next) =>{
    const {id_revue_processus,id_objectif} = req.body.item
    PerformanceObjectifCommentaire.findAll({
      where : 
      {
        id_objectif : id_objectif,
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





module.exports = {getPerformanceObjectifDetail, getPerformanceObjectifDetailByProcessus, getPerformanceObjectifByRevueProcessus, 
                  getPerformanceCommentaireByRevuePerformance, getPerformanceObjectifCommentaireByRevue, 
                  insertPerformanceObjectifCommentaire}