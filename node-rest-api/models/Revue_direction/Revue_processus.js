const { Sequelize } = require("sequelize");
const defautl_db = require("../../config/default.config");
const { Plan_action } = require("./Plan_action");


const Revue_processus = defautl_db.defaultSequelize.define('revue_processus', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  id_processus: {
    type: Sequelize.INTEGER
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


module.exports = {Revue_processus}