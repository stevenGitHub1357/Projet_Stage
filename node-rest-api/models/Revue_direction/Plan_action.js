const { Sequelize } = require("sequelize");
const defautl_db = require("../../config/default.config");
const { Revue_processus } = require("./Revue_processus");


const Plan_action = defautl_db.defaultSequelize.define('plan_action', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  id_revue_processus: {
    type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: Revue_processus,
            key: 'id'
          },
  },
  sujet: {
    type: Sequelize.STRING(2000),
  },
  nb_ticket: {
    type: Sequelize.STRING(200),
  },
  createdat: {
    type: Sequelize.DATE,
  },
  activate: {
    type: Sequelize.INTEGER,
  },
},{
  tableName:"plan_action",
  schema:"revue_direction",
  createdAt: "createdat",
  updatedAt: false,
});


const Plan_action_commentaire = defautl_db.defaultSequelize.define('plan_action_commentaire', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  id_plan_action: {
    type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: Plan_action,
            key: 'id'
          },
  },
  commentaire: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  createdat: {
    type: Sequelize.DATE,
  },
},{
  tableName: "plan_action_commentaire",
  schema: "revue_direction",
  createdAt : "createdat",
  timestamps: false,
  noPrimaryKey: true, 
});

Plan_action.hasMany(Plan_action_commentaire, { foreignKey:"id_plan_action"})

module.exports = {Plan_action, Plan_action_commentaire}