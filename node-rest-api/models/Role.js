const { Sequelize } = require("sequelize");
const defautl_db = require("../config/default.config")

const Role = defautl_db.defaultSequelize.define('role', {
        id_role: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        type_role: Sequelize.STRING(200),
        date_create: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        
    },{
        tableName: "role",
        createdAt: false,
        updatedAt: false,
    });

module.exports = {Role};