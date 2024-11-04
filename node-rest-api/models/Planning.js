const { Sequelize } = require("sequelize");
const defautl_db = require("../config/default.config");
const { Processus } = require("./Processus");
const { Revue_processus } = require("./Revue_direction/Revue_processus");

const PlanningCategorie = defautl_db.defaultSequelize.define('planning_categorie', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    libelle: Sequelize.STRING(200),
    abbrv: Sequelize.STRING(300),
    
},{
    tableName: "planning_categorie",
    schema:"planning",
    createdAt: false,
    updatedAt: false,
});

const Planning = defautl_db.defaultSequelize.define('planning', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        id_categorie: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: PlanningCategorie,
              key: 'id'
            }
        },
        titre: Sequelize.STRING(200),
        date_debut: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        date_cloture: {
            type: Sequelize.DATE,
        },
        date_recolte_debut: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        date_recolte_fin: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        statut:{
            type : Sequelize.STRING(200),
            defaultValue: "D"
        },
        updateat: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        
    },{
        tableName: "planning",
        schema:"planning",
        updatedAt: "updateat",
        createdAt: false,
    });

    Planning.belongsTo(PlanningCategorie, { foreignKey:"id_categorie"})
module.exports = {Planning, PlanningCategorie};