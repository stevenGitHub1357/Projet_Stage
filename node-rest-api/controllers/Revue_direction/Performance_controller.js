const bd_pool = require("../../config/default.config")
const pool = bd_pool.pool
const {kanboard} = require("../../config/dbRevueDirection.config")
const { Sequelize, Op } = require("sequelize");
const { PerformanceObjectifDetail,PerformanceObjectifProcessus,PerformanceCommentaire, PerformanceObjectifCommentaire, PerfSynthese, Performance, PerformanceObjectifRevue, PerformanceObjectifRevueFichier } = require("../../models/Revue_direction/Performance");



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
    const {id_revue_processus} = req.body.item
    PerformanceObjectifProcessus.findAll({
      where : 
      {
        id_revue_processus : id_revue_processus
      },
      order: [['id', 'DESC']],
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


  const getPerformanceByDemande = (req,res,next) =>{
    const type_demande = req.body.item
    Performance.findAll({
      where : 
      {
        type_demande : type_demande,
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

  const getPerformanceByDemandeRevue = (req,res,next) =>{
    const {type_demande,date_create,date_cloture} = req.body.item
    console.log(req.body.item)
    const startDate = new Date(date_create);
    let endDate;

    if (date_cloture === null || date_cloture === '') {
      endDate = new Date();
    } else {
      endDate = new Date(date_cloture);
    }
    Performance.findAll({
      where: {
        type_demande: type_demande,
        date_demande: {
          [Op.between]: [startDate, endDate]
        }
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


  const getPerformanceSyntheseByDemande = (req,res,next) =>{
    const type_demande = req.body.item
    PerfSynthese.findAll({
      where : 
      {
        type_demande : type_demande,
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

  const getPerformanceCommentaire = (req,res,next) =>{
    const {id_revue_processus, type_demande} = req.body.item
    PerformanceCommentaire.findAll({
      where : 
      {
        id_revue_processus : id_revue_processus,
        type_demande : type_demande,
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


  const insertPerformanceCommentaire = (req,res,next) =>{
    const {id_revue_processus,type_demande,commentaire} = req.body.item
    // console.log()
    PerformanceCommentaire.create(
      { 
        id_revue_processus : id_revue_processus,
        type_demande : type_demande,
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

  const updatePerformanceCommentaire = (req,res,next) =>{
    const {id_revue_processus,type_demande,commentaire} = req.body.item
    // console.log()
    PerformanceCommentaire.update(
      { 
        commentaire: commentaire
      },
      {
      where : {
          id_revue_processus : id_revue_processus,
          type_demande : type_demande,
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


  const insertPerformanceObjectifRevue = (req,res,next) =>{
    const {id_revue_processus,id_parametrage, realise, taux, commentaire} = req.body.item
    // console.log()
    PerformanceObjectifRevue.create(
      { 
        id_revue_processus : id_revue_processus,
        id_parametrage : id_parametrage,
        realise : realise,
        taux : taux,
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


  const updatePerformanceObjectifRevue = (req,res,next) =>{
    const {id_revue_processus,id_parametrage, realise, taux, commentaire} = req.body.item
    // console.log()
    PerformanceObjectifRevue.update(
      { 
        realise : realise,
        taux : taux,
        commentaire: commentaire
      },
      {
        where : 
        {
            id_revue_processus : id_revue_processus,
            id_parametrage : id_parametrage
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


  const insertPerformanceObjectifRevueFichier = (req,res,next) =>{
    const {id_revue_processus,id_parametrage, file_name, file_save, folder_path} = req.body.item
    // console.log()
    PerformanceObjectifRevueFichier.create(
      { 
        id_revue_processus : id_revue_processus,
        id_parametrage : id_parametrage,
        file_name : file_name,
        file_save : file_save, 
        folder_path: folder_path
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

  const getPerformanceObjectifRevueFichierByObjectif = (req,res,next) =>{
    const {id_revue_processus, id_parametrage} = req.body.item
    PerformanceObjectifRevueFichier.findAll({
      where : 
      {
        id_revue_processus : id_revue_processus,
        id_parametrage : id_parametrage,
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
                  insertPerformanceObjectifCommentaire, getPerformanceByDemande, getPerformanceSyntheseByDemande,
                  insertPerformanceCommentaire, updatePerformanceCommentaire, getPerformanceCommentaire, getPerformanceByDemandeRevue,
                  updatePerformanceObjectifRevue, insertPerformanceObjectifRevue, insertPerformanceObjectifRevueFichier, getPerformanceObjectifRevueFichierByObjectif}