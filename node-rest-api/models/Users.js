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
        activate : Sequelize.INTEGER,
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

    const UserRole = defautl_db.defaultSequelize.define('user_role', {
        id_u_role: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        id_user: {
            type: Sequelize.INTEGER,
        },
        id_role: {
            type: Sequelize.INTEGER,
        },
    },{
        tableName: "user_role",
        createdAt: false,
        updatedAt: false,
    });

    const UserProcessus = defautl_db.defaultSequelize.define('user_processus', {
        id_u_processus: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        id_user: {
            type: Sequelize.INTEGER,
        },
        id_processus: {
            type: Sequelize.INTEGER,
        },
    },{
        tableName: "user_processus",
        createdAt: false,
        updatedAt: false,
    });

module.exports = {User, UserRole, UserProcessus};
  