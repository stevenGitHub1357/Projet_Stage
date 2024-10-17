const bd_pool = require("../../config/default.config")
const pool = bd_pool.pool
const {kanboard} = require("../../config/dbRevueDirection.config")
const { Sequelize } = require("sequelize");
const { PerformanceObjectifDetail } = require("../../models/Revue_direction/Performance");



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





module.exports = {getPerformanceObjectifDetail, getPerformanceObjectifDetailByProcessus}