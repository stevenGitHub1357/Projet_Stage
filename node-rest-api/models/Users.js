const { Sequelize } = require("sequelize");
const defautl_db = require("../config/default.config")

const User = defautl_db.defaultSequelize.define('users', {
        id_user: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        matricule: {
            type: Sequelize.STRING(200),
            allowNull: false,
            unique: true,
        },
        nom: Sequelize.STRING(300),
        prenom: Sequelize.STRING(300),
        mot_de_passe: {
            type: Sequelize.STRING(200),
            defaultValue: '0000',
        },
        default_mdp: {
            type: Sequelize.STRING(200),
            defaultValue: 'lum123',
        },
        date_create: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    },{
        createdAt: false,
        updatedAt: false,
    });

module.exports = {User};
  