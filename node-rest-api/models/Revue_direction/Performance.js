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
      type_recuperation : {
        type: Sequelize.STRING(2000)
      },
      fichier : {
        type: Sequelize.STRING(2000)
      },
      existe : {
        type: Sequelize.INTEGER
      },
      id_recuperation : {
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


    const PerformanceObjectifRevue = defautl_db.defaultSequelize.define('performance_objectif_revue', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_revue_processus: {
        type: Sequelize.INTEGER,
      },
      id_parametrage: {
        type: Sequelize.INTEGER,
      },
      realise: {
        type: Sequelize.INTEGER,
      },
      taux: {
        type: Sequelize.INTEGER,
      },
      fichier: {
        type: Sequelize.STRING(2000),
      },
      commentaire: {
        type: Sequelize.STRING(2000),
      },
    },{
      tableName: "performance_objectif_revue",
      schema: "revue_direction",
      timestamps: false,
      noPrimaryKey: true, 
    });



    
const Performance = defautl_db.defaultSequelize.define('performance', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    titre: {
        type: Sequelize.STRING(1000)
    },
    objectif: {
        type: Sequelize.STRING(1000)
    },
    realise: {
        type: Sequelize.DECIMAL(10,5)
    },
    date_demande: {
        type: Sequelize.DATE,
    },
    date_cloture: {
        type: Sequelize.DATE,
    },
    statut: {
        type: Sequelize.STRING(300),
    }
},{
  tableName: "performance",
  schema: "revue_direction",
  freezeTableName: true,
  createdAt: "createat",
  updatedAt: "updateat",
});


const PerfSynthese = defautl_db.defaultSequelize.define('perf_synthese', {
  annee: {
    type: Sequelize.INTEGER
  },
  mois: {
    type: Sequelize.STRING(200)
  },
  id_revue_processus: {
    type: Sequelize.INTEGER
  },
  type_demande: {
    type: Sequelize.STRING(1000)
  },
  declarer: {
    type: Sequelize.INTEGER
  },
  cloture: {
    type: Sequelize.INTEGER,
  },
  taux: {
    type: Sequelize.DECIMAL(10,5),
  },
  efficace: {
    type: Sequelize.INTEGER,
  },
  abbrv: {
    type: Sequelize.STRING(200),
  },
  cible: {
    type: Sequelize.INTEGER,
  },
  commentaire: {
    type: Sequelize.STRING(1000)
  },
},{
tableName: "perf_synthese",
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
    type: Sequelize.INTEGER
  },
  type_demande: {
    type: Sequelize.STRING(1000)
  },
  commentaire: {
    type: Sequelize.STRING(1000)
  },
  },{
  tableName: "performance_commentaire",
  schema: "revue_direction",
  freezeTableName: true,
  createdAt: "createdat",
  updatedAt: false,
});

PerfSynthese.removeAttribute('id');

module.exports = {}  

  
module.exports = { PerformanceObjectifDetail, PerformanceObjectifProcessus, Performance, PerfSynthese, PerformanceCommentaire, PerformanceObjectifRevue}  
  
