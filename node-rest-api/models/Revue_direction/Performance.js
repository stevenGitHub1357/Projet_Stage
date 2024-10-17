const { Sequelize } = require("sequelize");
const defautl_db = require("../../config/default.config");
const { Unite, Recuperation } = require("../../models/Objectif")



const PerformanceObjectifDetail = defautl_db.defaultSequelize.define('performance_objectif_detail', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_processus: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      objectifs: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      poids: {
        type: Sequelize.DECIMAL(10,5),
        allowNull: false,
      },
      cible: {
        type: Sequelize.STRING(1000),
      },
      id_unite: {
        type: Sequelize.INTEGER,
      },
      id_recuperation: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      activate: {
        type: Sequelize.INTEGER,
        defaultValue : 1
      },
      support: {
        type: Sequelize.STRING(1000),
      },
      performance: {
        type: Sequelize.STRING(1000)
      },
      libelle: {
        type: Sequelize.STRING(1000)
      },
      type_unite:{
        type: Sequelize.STRING(200)
      },
      type_recuperation : {
        type: Sequelize.STRING(200)
      }
    

    },{
      tableName: "performance_objectif_detail",
      schema: "revue_direction",
      freezeTableName: true,
      timestamps: false,
    });
  
module.exports = { PerformanceObjectifDetail}  
  
