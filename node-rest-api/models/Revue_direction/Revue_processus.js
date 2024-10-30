const { Sequelize } = require("sequelize");
const defautl_db = require("../../config/default.config");
const { Plan_action } = require("./Plan_action");
const { Processus } = require("../Processus");
const { Planning } = require("../Planning");


const Revue_processus = defautl_db.defaultSequelize.define('revue_processus', {
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
  id_planning: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Planning,
      key: 'id'
      }
  },
  date_cloture: {
    type: Sequelize.DATE,
    allowNull : true
  },
  statut: {
    type: Sequelize.STRING(200),
    defaultValue: 'D',
  },
  
},{
  tableName:"revue_processus",
  schema: "revue_direction",
  createdAt: "createdat",
  updatedAt: false,
});

Revue_processus.hasMany(Plan_action,{foreignKey:"id_revue_processus"})
Planning.hasMany(Revue_processus,{foreignKey:"id_planning"})
Revue_processus.belongsTo(Processus, {as: 'processus', foreignKey:"id_processus"})

module.exports = {Revue_processus}