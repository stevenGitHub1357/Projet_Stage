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
        schema: "param_obj",
        freezeTableName: true,
        timestamps: false,
        noPrimaryKey: true, 
      });


const ParametrageObjectif = defautl_db.defaultSequelize.define('paremetrage_objectif', {
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
        type: Sequelize.DECIMAL(10,5),
        allowNull: false,
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
    },{
      tableName: "parametrage_objectif",
      schema: "param_obj",
      freezeTableName: true,
      timestamps: false,
    });


  
ParametrageObjectif.belongsTo(Unite, { foreignKey:"id_unite"})
ParametrageObjectif.belongsTo(Processus, {as: 'processus',foreignKey:"id_processus"})
  
module.exports = { ParametrageObjectif, Unite }  
  
