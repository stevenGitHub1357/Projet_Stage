const { Sequelize } = require("sequelize");
const defautl_db = require("../../config/default.config");
const { Unite, Recuperation } = require("../Objectif");
const { Revue_processus } = require("./Revue_processus");

const Efficacite = defautl_db.defaultSequelize.define('efficacite', {
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
    id_ticket: {
      type: Sequelize.STRING(200),
    },
    num_ticket: {
        type: Sequelize.STRING(200),
    },
    types: {
        type: Sequelize.INTEGER,
    },
    commentaire: {
        type: Sequelize.STRING(2000)
    },
    createdat: {
      type: Sequelize.DATE,
    },
    activate: {
      type: Sequelize.INTEGER,
    },
  },{
    tableName:"efficacite",
    schema:"revue_direction",
    createdAt: "createdat",
    updatedAt: false,
  });

  module.exports = {Efficacite}