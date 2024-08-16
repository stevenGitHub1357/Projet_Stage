const { Sequelize } = require("sequelize");
const defautl_db = require("../config/default.config")

const Processus = defautl_db.defaultSequelize.define('processus', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        libelle_processus: Sequelize.STRING(200),
        num_processus: Sequelize.STRING(300),
        abbrv: Sequelize.STRING(300),
        date_create: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        
    },{
        tableName: "processus",
        createdAt: false,
        updatedAt: false,
    });

module.exports = {Processus};