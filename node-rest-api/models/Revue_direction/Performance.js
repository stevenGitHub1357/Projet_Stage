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
      type_demande: {
        type: Sequelize.STRING(1000)
      },
      libelle: {
        type: Sequelize.STRING(1000)
      },
      type_unite:{
        type: Sequelize.STRING(200)
      },
      abbrv:{
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

  
    const PerformanceCommentaire = defautl_db.defaultSequelize.define('performance_commentaire', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_revue_processus: {
        type: Sequelize.INTEGER,
      },
      id_performance: {
        type: Sequelize.INTEGER,
      },
      commentaire: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      createdat: {
        type: Sequelize.DATE,
      },
    },{
      tableName: "performance_commentaire",
      schema: "revue_direction",
      createdAt : "createdat",
      timestamps: false,
      noPrimaryKey: true, 
    });

    const PerformanceObjectifProcessus = defautl_db.defaultSequelize.define('performance_objectif_processus', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_revue_processus: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_processus: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date_cloture_revue_processus: {
        type: Sequelize.DATE,
      },
      date_create_revue_processus: {
        type: Sequelize.DATE,
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
      abbrv:{
        type: Sequelize.STRING(200)
      },
      activate: {
        type: Sequelize.INTEGER,
        defaultValue : 1
      },
      type_demande: {
        type: Sequelize.STRING(1000)
      },
      libelle: {
        type: Sequelize.STRING(1000)
      },
      realise:{
        type: Sequelize.DECIMAL
      },
      taux : {
        type: Sequelize.DECIMAL
      },
      commentaire:{
        type: Sequelize.STRING(2000)
      }
    },{
      tableName: "performance_objectif_processus",
      schema: "revue_direction",
      freezeTableName: true,
      timestamps: false,
    });


    const PerformanceObjectifCommentaire = defautl_db.defaultSequelize.define('performance_objectif_commentaire', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_revue_processus: {
        type: Sequelize.INTEGER,
      },
      id_objectif: {
        type: Sequelize.INTEGER,
      },
      commentaire: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      createdat: {
        type: Sequelize.DATE,
      },
    },{
      tableName: "performance_objectif_commentaire",
      schema: "revue_direction",
      createdAt : "createdat",
      timestamps: false,
      noPrimaryKey: true, 
    });

  
module.exports = { PerformanceObjectifDetail, PerformanceCommentaire, PerformanceObjectifProcessus, PerformanceObjectifCommentaire}  
  
