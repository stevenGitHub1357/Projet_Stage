const { Sequelize } = require("sequelize");
const defautl_db = require("../config/default.config");
const { Processus } = require("./Processus");

const Unite = defautl_db.defaultSequelize.define('unite', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        type_unite: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
        abbrv: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
      },{
        tableName: "unite",
        schema: "objectif",
        freezeTableName: true,
        timestamps: false,
        noPrimaryKey: true, 
      });
  
const Recuperation = defautl_db.defaultSequelize.define('recuperation', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        type_recuperation: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
      },{
        tableName: "recuperation",
        schema: "objectif",
        freezeTableName: true,
        timestamps: false,
        noPrimaryKey: true, 
      });


const ParametrageObjectif = defautl_db.defaultSequelize.define('parametrage', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_processus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Processus,
          key: 'id'
        }
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
        allowNull: false,
        references: {
          model: Unite,
          key: 'id'
        },
      },
      recuperation: {
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
    

    },{
      tableName: "parametrage",
      schema: "objectif",
      freezeTableName: true,
      createdAt: "createat",
      updatedAt: "updateat",
    });

const Synthese = defautl_db.defaultSequelize.define('synthese', {
      id_processus: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      libelle_processus: {type: Sequelize.STRING(1000)},
      nb_objectif: {type: Sequelize.INTEGER},
      poids: {type: Sequelize.DECIMAL(10,5),},
    },{
      tableName: "parametrage_objectif_synthese",
      schema: "objectif",
      freezeTableName: true,
      timestamps: false,
      noPrimaryKey: true, 
    });
  
const RevueDirection = defautl_db.defaultSequelize.define('revue_direction', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_parametrage : {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: ParametrageObjectif,
            key: 'id'
          },
        },
      revue_direction: {type: Sequelize.STRING(1000)},
      libelle: {type: Sequelize.STRING(1000)},
    },{
      tableName: "revue_direction",
      schema: "objectif",
      freezeTableName: true,
      timestamps: false,
      noPrimaryKey: true, 
    });

  
RevueDirection.belongsTo(ParametrageObjectif, {foreignKey:"id_parametrage"})
ParametrageObjectif.belongsTo(Unite, { foreignKey:"id_unite"})
ParametrageObjectif.belongsTo(Processus, {as: 'processus',foreignKey:"id_processus"})
  
module.exports = { ParametrageObjectif, Unite, Synthese, Recuperation, RevueDirection}  
  
